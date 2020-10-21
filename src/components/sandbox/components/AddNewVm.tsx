import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Checkbox, Icon, Tooltip, DotProgress } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { returnLimitMeta } from '../../common/helpers';
import { Label } from '../../common/StyledComponents';
import CoreDevDropdown from '../../common/customComponents/Dropdown';
import { VmObj } from '../../common/interfaces';
import { createVirtualMachine, getVmName } from '../../../services/Api';
import { SandboxObj, DropdownObj, SizeObj } from '../../common/interfaces';
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
  `;

  const UnstyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const options = [
    { displayValue: "1", key:'1' },
    { displayValue: "2", key:'2' },
    { displayValue: "3", key:'3' },
    { displayValue: "4", key:'4' }
  ];

  type AddNewVmProps = {
    sandbox: SandboxObj;
    setVms:any;
    vms:any;
    setActiveTab: any;
    sizes?:SizeObj;
    disks?:DropdownObj;
};

const limits = {
    name: 20,
    username: 20,
    password: 123
}

const AddNewVm: React.FC<AddNewVmProps> = ({ sandbox, setVms, vms, sizes, disks, setActiveTab }) => {

    const sandboxId = window.location.pathname.split('/')[4];
    const [checked, updateChecked] = useState('one');
    const [vm, setVm] = useState<VmObj>({
        name: '',
        region: 'norwayeast',
        performanceProfile: 'cheap',
        operatingSystem: 'windows',
        distro: 'win2019datacenter',
        username: '',
        password: ''
    });
    const [actualVmName, setActualVmName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const width = '400px';

    useEffect(() => {
        const timeoutId = setTimeout(() => calculateVmName(vm.name), 1000);
        return () => clearTimeout(timeoutId);
      }, [vm.name, loading]);


    const handleDropdownChange = (value, name:string): void => {
        setVm({
          ...vm,
          [name]: value
        });
    };
    const onChange = (event) => {
        updateChecked(event.target.value)
    }

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
    }

    const password_validate = (password) => {
        //Upper case charachter
        //Between 8-123 long
        //Atleast one number
        //Atleast one special character
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,123}$/;
        return regex.test(password);

    }

    const calculateVmName = (value:string) => {
        if (value === '') {
            setActualVmName('');
            return;
        }
        getVmName(sandbox?.studyName, sandbox?.name, value).then((result: any) => {
            if (result && !result.Message) {
                setActualVmName(result);
                console.log("resultStudy: ", result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
            }
        });
    }

    const checkIfButtonDisabled = () => {
        if (loading) {
            return true;
        }
        if (password_validate(vm.password)) {
            return false;
        }
        return true;
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
                    <Checkbox label="High memory" />
                </li>
                <li>
                    <Checkbox label="High GPU" />
                </li>
                <li>
                    <Checkbox label="High CPU" />
                </li>
            </UnstyledList>
            <CoreDevDropdown
                label="Size"
                options={sizes}
                width={width}
                onChange={handleDropdownChange}
                name="size"
            />
            <CoreDevDropdown
                label="Storage"
                options={disks}
                width={width}
                onChange={handleDropdownChange}
                name="storage"
            />
            <div>
                <Label>Estimated total</Label>
                <Typography variant="h6">kr 23456,42/month</Typography>
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
