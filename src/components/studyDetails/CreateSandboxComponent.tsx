import React, { useState, useEffect } from 'react';
import { Button, TextField, Divider } from '@equinor/eds-core-react';
import { EquinorIcon } from '../common/StyledComponents';
import { SandboxCreateObj, DropdownObj } from '../common/interfaces';
import { checkIfRequiredFieldsAreNull } from '../common/helpers';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { createSandbox } from '../../services/Api';
import { getRegions } from '../common/commonApiCalls';
import LoadingFull from '../common/LoadingComponentFullscreen';
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
    { displayValue: "1", key:'1' },
    { displayValue: "2", key:'2' },
    { displayValue: "3", key:'3' },
    { displayValue: "4", key:'4' }
  ];

type CreateSandboxComponentProps = {
    setToggle: (value:any) => void;
    setStudy: (value:any) => void;
};
const width = '268px';
const CreateSandboxComponent:React.FC<CreateSandboxComponentProps> = ({ setToggle, setStudy }) => {
    const history = useHistory();
    const [regions, setRegions] = useState<DropdownObj>();
    const [loading, setLoading] = useState<Boolean>(false);

    useEffect(() => {
        getRegions(setRegions);
    }, []);
    const [userPressedCreate, setUserPressedCreate] = useState<boolean>(false);
    const [sandbox, setSandbox] = useState<SandboxCreateObj>({
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

    const checkRequiredFieldsAreNotEmpty = () => {
        if (!sandbox.name || !sandbox.region) {
            return false;
        }
        return true;
    }

    const handleCancel = ():void => {
        setToggle(false);
    }

    const CreateSandbox = () => {
        setUserPressedCreate(true);
        if (!checkRequiredFieldsAreNotEmpty()) {
            return;
        }
        setLoading(true);
        //setToggle(false);
        const studyId = window.location.pathname.split('/')[2];
        createSandbox(studyId, sandbox).then((result: any) => {
            if (result && !result.Message) {
                setStudy(result);
                history.push(studyId + '/sandboxes/' + result.id);
                //setEditDataset(true);
                console.log("result: ", result);
                setLoading(false);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
                setLoading(false);
             }
        });
    }
    return (
        !loading ? 
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
                options={regions}
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
        </Wrapper>: <LoadingFull />
    )
}

export default CreateSandboxComponent;