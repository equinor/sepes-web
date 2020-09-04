import React, { useState } from 'react';
import { TextField, Typography, Button, Checkbox } from '@equinor/eds-core-react';
import { Label } from '../../common/StyledComponents';
import CoreDevDropdown from '../../common/customComponents/Dropdown';
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
};

const AddNewVm: React.FC<AddNewVmProps> = ({  }) => {
    const [checked, updateChecked] = useState('one')
    const [vm, setVm] = useState<any>();
    const width = '400px';
    const handleDropdownChange = (value, name:string): void => {
        setVm({
          ...vm,
          [name]: value
        });
    };
    const onChange = (event) => {
        updateChecked(event.target.value)
    }

    const returnTextField = () => {

    }
    return (
        <Wrapper>
            <TextField
                name='name'
                placeholder="Name"
                onChange={() => {}}
                value={() => {}}
                label="Name"
                meta=""
            />
            <div>
                    <Label>Actual VM name</Label>
                    <Typography variant="h6">VM-ST-SP-1234567891412345</Typography>
            </div>
            <TextField
                name='username'
                placeholder="Username"
                onChange={() => {}}
                value={() => {}}
                label="Username"
                meta="Required"
            />
            <TextField
                name='password'
                placeholder="Password"
                onChange={() => {}}
                value={() => {}}
                label="Password"
                meta="Required"
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
            <TextField
                name='storage'
                placeholder="Storage"
                onChange={() => {}}
                value={() => {}}
                label="Storage"
                meta=""
            />
            <CoreDevDropdown
                label="Template"
                options={options}
                width={width}
                onChange={handleDropdownChange}
                name="template"
            />
            <CoreDevDropdown
                label="Template"
                options={options}
                width={width}
                onChange={handleDropdownChange}
                name="template"
            />
            <div>
                <Label>Estimated total</Label>
                <Typography variant="h6">kr 23456,42/month</Typography>
            </div>
            <Button style={{width: '100px', marginLeft: 'auto'}}>Create</Button>
        </Wrapper>
    )
}

export default AddNewVm;
