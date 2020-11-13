import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Divider } from '@equinor/eds-core-react';
import { EquinorIcon, StyledTitle, Label } from '../common/StyledComponents';
import { SandboxCreateObj, DropdownObj } from '../common/interfaces';
import { checkIfRequiredFieldsAreNull } from '../common/helpers';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { createSandbox } from '../../services/Api';
import { getRegions } from '../common/commonApiCalls';
import LoadingFull from '../common/LoadingComponentFullscreen';
import * as notify from '../common/notify';
import useClickOutside from '../common/customComponents/useClickOutside';

const Wrapper = styled.div`
    position: absolute;
    display: grid;
    grid-template-rows: 1fr 1fr 24px 1fr 1fr;
    grid-gap: 8px;
    background-color: #ffffff;
    width: 300px;
    padding: 16px;
    right: 48px;
    margin-top: -16px;
    box-shadow: 0 0 4px 4px #e7e7e7;
    border-radius: 4px;
`;

type CreateSandboxComponentProps = {
    setToggle: (value: any) => void;
    setStudy: (value: any) => void;
    setHasChanged: any;
    setUpdateCache: any;
    updateCache: any;
};
const width = '268px';
const CreateSandboxComponent: React.FC<CreateSandboxComponentProps> = ({
    setToggle,
    setStudy,
    setHasChanged,
    setUpdateCache,
    updateCache,
}) => {
    const history = useHistory();
    const [regions, setRegions] = useState<DropdownObj>();
    const [loading, setLoading] = useState<Boolean>(false);
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, setToggle);

    useEffect(() => {
        getRegions(setRegions);
        return () => setHasChanged(false);
    }, []);
    const [userPressedCreate, setUserPressedCreate] = useState<boolean>(false);
    const [sandbox, setSandbox] = useState<SandboxCreateObj>({
        name: '',
        region: '',
        template: '',
        id: '',
    });
    const handleChange = (columnName: string, value: string) => {
        setHasChanged(true);
        setSandbox({
            ...sandbox,
            [columnName]: value,
        });
    };
    const handleDropdownChange = (value, name: string): void => {
        setHasChanged(true);
        setSandbox({
            ...sandbox,
            [name]: value,
        });
    };

    const checkRequiredFieldsAreNotEmpty = () => {
        if (!sandbox.name || !sandbox.region) {
            return false;
        }
        return true;
    };

    const handleCancel = (): void => {
        setToggle(false);
    };

    const CreateSandbox = () => {
        setHasChanged(false);
        setUserPressedCreate(true);
        if (!checkRequiredFieldsAreNotEmpty()) {
            return;
        }
        const studyId = window.location.pathname.split('/')[2];
        setUpdateCache({ ...updateCache, ['study' + studyId]: true });
        setLoading(true);
        createSandbox(studyId, sandbox).then((result: any) => {
            if (result && !result.Message) {
                setStudy(result);
                history.push(studyId + '/sandboxes/' + result.id);
                console.log('result: ', result);
                setLoading(false);
            } else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log('Err');
                setLoading(false);
            }
        });
    };
    return !loading ? (
        <Wrapper ref={wrapperRef}>
            <StyledTitle style={{ color: '#000000' }}>
                Title
                <div style={{ float: 'right' }}>{EquinorIcon('clear', '#007079', 24, handleCancel, true)}</div>
                <Divider />
            </StyledTitle>
            <TextField
                placeholder="Please add Sandbox name..."
                label="Sandbox name"
                meta="(required)"
                variant={checkIfRequiredFieldsAreNull(sandbox.name, userPressedCreate)}
                onChange={(e: any) => handleChange('name', e.target.value)}
                value={sandbox.name}
                data-cy="sandbox_name"
            />
            <Label>
                <span style={{ marginRight: '8px' }}>{EquinorIcon('warning_outlined', '#6F6F6F', 24)}</span>Name cannot
                be changed later
            </Label>
            <CoreDevDropdown
                label="Location"
                options={regions}
                width={width}
                onChange={handleDropdownChange}
                name="region"
                data-cy="sandbox_region"
                tabIndex={0}
                meta="(required)"
            />
            {/*
            <CoreDevDropdown
                label="Template"
                options={options}
                width={width}
                onChange={handleDropdownChange}
                name="template"
                data-cy="sandbox_template"
            />
            */}
            <Button
                style={{ width: '96px', marginLeft: 'auto', marginTop: 'auto' }}
                onClick={() => CreateSandbox()}
                data-cy="create_actual_sandbox"
                disabled={!checkRequiredFieldsAreNotEmpty()}
            >
                Create
            </Button>
        </Wrapper>
    ) : (
        <LoadingFull />
    );
};

export default CreateSandboxComponent;
