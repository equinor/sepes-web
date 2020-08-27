import React, { useState } from 'react';
import { Button, TextField, Divider } from '@equinor/eds-core-react';
import { EquinorIcon } from '../common/StyledComponents';
import { SandboxObj } from '../common/interfaces';
import { checkIfRequiredFieldsAreNull } from '../common/helpers';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import styled from 'styled-components';
import { createSandbox } from '../../services/Api';
import * as notify from '../common/notify';

const Wrapper = styled.div`
  position: absolute;
  display:grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
  background-color: #FFFFFF;
  width: 300px;
  padding: 16px;
  right: 48px;
  margin-top: 8px;
  box-shadow: 0 0 4px 4px #E7E7E7;
  border-radius: 4px;
`;

const options = [
    { name: "1", id:'1' },
    { name: "2", id:'2' },
    { name: "3", id:'3' },
    { name: "4", id:'4' }
  ];

type CreateSandboxComponentProps = {
    setToggle: (value:any) => void;
    setStudy: (value:any) => void;
};
const width = '268px';
const CreateSandboxComponent:React.FC<CreateSandboxComponentProps> = ({ setToggle, setStudy }) => {
    const [userPressedCreate, setUserPressedCreate] = useState<boolean>(false);
    const [sandbox, setSandbox] = useState<SandboxObj>({
        name: '',
        region: '',
        template: '',
        id: ''
    });
    const handleChange = evt => {
        setSandbox({
          ...sandbox,
          [evt.target.name]: evt.target.value
        });
    };
    const handleDropdownChange = (value, name:string): void => {
        setSandbox({
          ...sandbox,
          [name]: value
        });
    };

    const handleCancel = ():void => {
        setToggle(false);
    }

    const CreateSandbox = () => {
        setUserPressedCreate(true);
        setToggle(false);
        const studyId = window.location.pathname.split('/')[2];
        createSandbox(studyId, sandbox).then((result: any) => {
            if (result && !result.Message) {
                setStudy(result);
                //setEditDataset(true);
                console.log("result: ", result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
             }
        });
    }
    return (
        <Wrapper>
            <div>Title<div style={{ float: 'right' }}>{EquinorIcon('clear', '#007079', 24, handleCancel, true)}</div> <Divider /></div>
            <TextField
                placeholder="Please add Sandbox name..."
                name="name"
                label="Sandbox name"
                meta="Required"
                variant={checkIfRequiredFieldsAreNull(sandbox.name, userPressedCreate)}
                onChange={handleChange}
                value={sandbox.name}
            />
            <CoreDevDropdown
                label="Location"
                options={options}
                width={width}
                onChange={handleDropdownChange}
                name="region"
            />
            <CoreDevDropdown
                label="Template"
                options={options}
                width={width}
                onChange={handleDropdownChange}
                name="template"
            />
            <Button style={{ width: '96px', marginLeft: 'auto' }} onClick={() => CreateSandbox()}>Create</Button>
        </Wrapper>
    )
}

export default CreateSandboxComponent;