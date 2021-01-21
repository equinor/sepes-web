import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField } from '@equinor/eds-core-react';
import { EquinorIcon, Label } from '../common/StyledComponents';
import { SandboxCreateObj, DropdownObj } from '../common/interfaces';
import { checkIfRequiredFieldsAreNull } from '../common/helpers';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { createSandbox } from '../../services/Api';
import LoadingFull from '../common/LoadingComponentFullscreen';
import * as notify from '../common/notify';
import useClickOutside from '../common/customComponents/useClickOutside';
import useFetchUrl from '../common/hooks/useFetchUrl';
import { getRegionsUrl, getStudyByIdUrl } from '../../services/ApiCallStrings';

const Wrapper = styled.div`
    position: absolute;
    display: grid;
    grid-template-rows: 1fr 24px 1fr auto;
    grid-gap: 8px;
    background-color: #ffffff;
    width: 300px;
    padding: 24px;
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
const width = '252px';
const CreateSandboxComponent: React.FC<CreateSandboxComponentProps> = ({
    setToggle,
    setStudy,
    setHasChanged,
    setUpdateCache,
    updateCache
}) => {
    const history = useHistory();
    const [regions, setRegions] = useState<DropdownObj>();
    useFetchUrl(getRegionsUrl(), setRegions);
    const [loading, setLoading] = useState<Boolean>(false);
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, setToggle);

    useEffect(() => {
        return () => setHasChanged(false);
    }, []);
    const [userPressedCreate, setUserPressedCreate] = useState<boolean>(false);
    const [sandbox, setSandbox] = useState<SandboxCreateObj>({
        name: '',
        region: '',
        template: '',
        id: ''
    });
    const handleChange = (columnName: string, value: string) => {
        setHasChanged(true);
        setSandbox({
            ...sandbox,
            [columnName]: value
        });
    };
    const handleDropdownChange = (value, name: string): void => {
        setHasChanged(true);
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
    };

    const CreateSandbox = () => {
        setHasChanged(false);
        setUserPressedCreate(true);
        if (!checkRequiredFieldsAreNotEmpty()) {
            return;
        }
        const studyId = window.location.pathname.split('/')[2];
        setUpdateCache({ ...updateCache, [getStudyByIdUrl(studyId)]: true });
        setLoading(true);
        createSandbox(studyId, sandbox).then((result: any) => {
            if (result && !result.Message) {
                setStudy(result);
                setLoading(false);
                history.push(studyId + '/sandboxes/' + result.id);
            } else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log('Err');
                setLoading(false);
            }
        });
    };
    return !loading ? (
        <Wrapper ref={wrapperRef}>
            <TextField
                id="textfield1"
                placeholder="Please add Sandbox name..."
                label="Sandbox name"
                meta="(required)"
                variant={checkIfRequiredFieldsAreNull(sandbox.name, userPressedCreate)}
                onChange={(e: any) => handleChange('name', e.target.value)}
                value={sandbox.name}
                data-cy="sandbox_name"
                autoComplete="off"
                autoFocus
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
                style={{ width: '76px', margin: '8px 0 8px auto' }}
                onClick={() => CreateSandbox()}
                data-cy="create_actual_sandbox"
                disabled={!checkRequiredFieldsAreNotEmpty()}
            >
                Create
            </Button>
        </Wrapper>
    ) : (
        <LoadingFull noTimeout />
    );
};

export default CreateSandboxComponent;
