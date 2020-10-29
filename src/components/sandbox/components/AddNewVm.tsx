import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Checkbox, Icon, Tooltip, DotProgress } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { passwordValidate, returnLimitMeta } from '../../common/helpers';
import { Label } from '../../common/StyledComponents';
import CoreDevDropdown from '../../common/customComponents/Dropdown';
import { VmObj } from '../../common/interfaces';
import { createVirtualMachine, getVmName, getVirtualMachineCost } from '../../../services/Api';
import { SandboxObj, DropdownObj, SizeObj, OperatingSystemObj } from '../../common/interfaces';
import * as notify from '../../common/notify';
import styled from 'styled-components';

const icons = {
    info_circle
  };
  Icon.add(icons);

const Wrapper = styled.div`
    height: auto;
    padding: 16px;
    width: 400px;
    display:grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 24px;
    padding-bottom:196px;
  `;

  const UnstyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

  type AddNewVmProps = {
    sandbox: SandboxObj;
    setVms:any;
    vms:any;
    setActiveTab: any;
    sizes?:SizeObj;
    disks?:DropdownObj;
    os?: OperatingSystemObj;
};

const limits = {
    name: 20,
    username: 20,
    password: 123
}

const sizeType = {
    memory: 'memory',
    gpu: 'gpu',
    compute: 'compute'
}

const AddNewVm: React.FC<AddNewVmProps> = ({ sandbox, setVms, vms, sizes, disks, setActiveTab, os }) => {
    const sandboxId = window.location.pathname.split('/')[4];
    const [vm, setVm] = useState<VmObj>({
        id: '',
        name: '',
        region: 'norwayeast',
        size: '',
        operatingSystem: '',
        distro: 'win2019datacenter',
        username: '',
        password: '',
        linkToExternalSystem: '',
        dataDisks: []
    });
    const [actualVmName, setActualVmName] = useState<string>('');
    const [vmEstimatedCost, setVmEstimatedCost] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<any>([sizeType.memory, sizeType.gpu, sizeType.compute]);
    const width = '400px';

    useEffect(() => {
        const timeoutId = setTimeout(() => {calculateVmName(vm.name); calculateVmPrice(); }, 1000);
        return () => { clearTimeout(timeoutId); };
      }, [vm.name, loading, sizes]);
      
    useEffect(() => {
        calculateVmPrice();
        //const timeoutId = setTimeout(() => { calculateVmPrice(); }, 200);
        //return () => { clearTimeout(timeoutId); };
      }, [vm.dataDisks, vm.operatingSystem, vm.size]);

    const handleDropdownChange = (value, name:string): void => {
        if (name === 'dataDisks') {
            value = [value];
        }
        setVm({
          ...vm,
          [name]: value
        });
    };

    const handleChange = (field:string, value:string) => {
        if (field === 'name' && value.length > limits.name) {
            return;
        }
        if (field === 'username' && value.length > limits.username) {
            return;
        }
        if (field === 'password' && value.length > limits.password) {
            return;
        }
        setVm({
          ...vm,
          [field]: value
        });
    };

    const createVm = () => {
        setLoading(true);
        createVirtualMachine(sandboxId, vm).then((result: any) => {
            if (result && !result.Message) {
                let vmsList:any = [...vms];
                vmsList.push(result);
                setVms(vmsList);
                setActiveTab(vmsList.length);
                console.log("resultStudy: ", result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
            }
            setLoading(false);
        });
    };

    const calculateVmPrice = () => {
        if(vm.operatingSystem !== "" && vm.size !== "" && vm.dataDisks.length > 0) {
            const vmPrice = {
                size: vm.size,
                dataDisks: vm.dataDisks,
                operatingSystem: vm.operatingSystem
            }
            getVirtualMachineCost(sandbox?.id, vmPrice).then((result: any) => {
                if (result && !result.Message) {
                    setVmEstimatedCost(result);
                    console.log("resultStudy: ", result);
                }
                else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                }
            });
        }
    };

    const calculateVmName = (value:string) => {
        if (value === '') {
            setActualVmName('');
            return;
        }
        getVmName(sandbox?.studyName, sandbox?.name, value).then((result: any) => {
            if (result && !result.errors) {
                setActualVmName(result);
                console.log("resultStudy: ", result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
            }
        });
    };

    const checkIfButtonDisabled = () => {
        if (loading) {
            return true;
        }
        if (passwordValidate(vm.password)) {
            return false;
        }
        return true;
    }

    const filterSizes = (sizes:any) => { 
        if (!sizes) {
            return;
        }
        return sizes.filter(size => filter.includes(size.category));
    }

    const handleCheck = (column: string, checked:any) => {
        let currentFilter:any = [...filter];
        if (checked) {

            currentFilter.push(column);
        }
        else {
            currentFilter.splice(filter.indexOf(column), 1);
        }
        setFilter(currentFilter);
    }

    return (
        <Wrapper>
            <TextField
                placeholder="Name"
                onChange={(e: any) => {
                    handleChange('name', e.target.value);
                    }}
                value={vm.name}
                label="Name"
                meta={returnLimitMeta(20, vm.name)}
                data-cy="vm_name"
                id="vm_name"
                inputIcon={
                    <div style={{ position: 'relative', right: '4px', bottom: '4px' }}>
                        <Tooltip title="The value must be between 1 and 20 characters long" placement={'right'}>
                            <Icon name="info_circle" size={24} />
                        </Tooltip>
                    </div>
                    }
            />
            <div>
                    <Label>Actual VM name</Label>
                    <Typography variant="h6">{actualVmName}</Typography>
            </div>
            <TextField
                placeholder="Username"
                onChange={(e: any) => handleChange('username', e.target.value)}
                value={vm.username}
                label="Username"
                meta="Required"
                data-cy="vm_username"
                id="vm_username"
                inputIcon={
                    <div style={{ position: 'relative', right: '4px', bottom: '4px' }}>
                        <Tooltip title="The value must be between 1 and 20 characters long" placement={'right'}>
                            <Icon name="info_circle" size={24} />
                        </Tooltip>
                    </div>
                    }
            />
            <TextField
                placeholder="Password"
                type="password"
                onChange={(e: any) => handleChange('password', e.target.value)}
                value={vm.password}
                label="Password"
                meta="Required"
                data-cy="vm_password"
                id="vm_password"
                inputIcon={
                    <div style={{ position: 'relative', right: '4px', bottom: '4px' }}>
                        <Tooltip title="The value must be between 12 and 123 characters long. Must contain one special character, one number and one uppercase letter" placement={'right'}>
                            <Icon name="info_circle" size={24} />
                        </Tooltip>
                    </div>
                    }
            />
            <UnstyledList>
                <li>
                    <Checkbox label="High memory" defaultChecked onChange={(e:any) => handleCheck(sizeType.memory, e.target.checked)} />
                </li>
                <li>
                    <Checkbox label="High GPU" defaultChecked onChange={(e:any) => handleCheck(sizeType.gpu, e.target.checked)} />
                </li>
                <li>
                    <Checkbox label="High CPU" defaultChecked onChange={(e:any) => handleCheck(sizeType.compute, e.target.checked)} />
                </li>
            </UnstyledList>
            <CoreDevDropdown
                label="VM size"
                options={filterSizes(sizes)}
                width={width}
                onChange={handleDropdownChange}
                name="size"
            />
            <CoreDevDropdown
                label="Operating system"
                options={os}
                width={width}
                onChange={handleDropdownChange}
                name="operatingSystem"
            />
            <CoreDevDropdown
                label="Data disk"
                options={disks}
                width={width}
                onChange={handleDropdownChange}
                name="dataDisks"
            />
            <div>
                <Label>Estimated total</Label>
                <Typography variant="h6"> {vmEstimatedCost}</Typography>
            </div>
            <Button
                style={{width: '100px', marginLeft: 'auto' }}
                data-cy="create_vm"
                onClick={createVm}
                disabled={checkIfButtonDisabled()}
            >
                {loading ? <DotProgress variant="green" /> : 'Create'}
            </Button>
        </Wrapper>
    )
}

export default AddNewVm;
