import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Checkbox } from '@equinor/eds-core-react';
import { returnLimitMeta } from '../../common/helpers';
import { Label } from '../../common/StyledComponents';
import CoreDevDropdown from '../../common/customComponents/Dropdown';
import { VmObj } from '../../common/interfaces';
import { createVirtualMachine, getVmName } from '../../../services/Api';
import { SandboxObj } from '../../common/interfaces';
import * as notify from '../../common/notify';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: auto;
    padding: 16px;
    width: 400px;
    display:grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 16px;
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
};

const AddNewVm: React.FC<AddNewVmProps> = ({ sandbox, setVms, vms }) => {

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

    const width = '400px';


    useEffect(() => {
        const timeoutId = setTimeout(() => calculateVmName(vm.name), 1000);
        return () => clearTimeout(timeoutId);
      }, [vm.name]);


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
        setVm({
          ...vm,
          [field]: value
        });
    };

    const createVm = () => {
        createVirtualMachine(sandboxId, vm).then((result: any) => {
            if (result && !result.Message) {
                let vmsList:any = [...vms];
                vmsList.push(result);
                setVms(vmsList);
                console.log("resultStudy: ", result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
            }
        });
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
            />
            <TextField
                placeholder="Password"
                type="password"
                onChange={(e: any) => handleChange('password', e.target.value)}
                value={vm.password}
                label="Password"
                meta="Required"
                data-cy="vm_password"
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
                options={options}
                width={width}
                onChange={handleDropdownChange}
                name="size"
            />
            <CoreDevDropdown
                label="Storage"
                options={options}
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
            >
                Create
            </Button>
        </Wrapper>
    )
}

export default AddNewVm;
