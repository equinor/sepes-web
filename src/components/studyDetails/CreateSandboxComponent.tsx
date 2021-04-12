import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Tooltip, Icon } from '@equinor/eds-core-react';
import { EquinorIcon, Label } from '../common/StyledComponents';
import { SandboxCreateObj, DropdownObj, StudyObj } from '../common/interfaces';
import { checkIfRequiredFieldsAreNull, validateResourceName } from '../common/helpers';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { createSandbox } from '../../services/Api';
import useClickOutside from '../common/customComponents/useClickOutside';
import useFetchUrl from '../common/hooks/useFetchUrl';
import { getRegionsUrl, getStudyByIdUrl } from '../../services/ApiCallStrings';
import { getStudyId } from 'utils/CommonUtil';

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
    study: StudyObj;
    setLoading: any;
};

const CreateSandboxComponent: React.FC<CreateSandboxComponentProps> = ({
    setToggle,
    setStudy,
    setHasChanged,
    setUpdateCache,
    updateCache,
    study,
    setLoading
}) => {
    const history = useHistory();
    const [regions, setRegions] = useState<DropdownObj>();
    useFetchUrl(getRegionsUrl(), setRegions);
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

    const validateUserInput = () => {
        if (!sandbox.name || !sandbox.region || !validateResourceName(sandbox.name) || !study.wbsCode) {
            return false;
        }
        return true;
    };

    const CreateSandbox = () => {
        setHasChanged(false);
        setUserPressedCreate(true);
        if (!validateUserInput()) {
            return;
        }
        const studyId = getStudyId();

        setUpdateCache({ ...updateCache, [getStudyByIdUrl(studyId)]: true });
        setLoading(true);
        createSandbox(studyId, sandbox).then((result: any) => {
            if (result && !result.Message) {
                setStudy(result);
                setLoading(false);
                history.push(studyId + '/sandboxes/' + result.id);
            } else {
                console.log('Err');
                setLoading(false);
            }
        });
    };
    return (
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
                inputIcon={
                    <div>
                        <Tooltip title="The value must be between 3 and 20 characters long (A-Z)" placement="topRight">
                            <Icon name="info_circle" size={24} color="#6F6F6F" />
                        </Tooltip>
                    </div>
                }
            />
            <Label>
                <span style={{ marginRight: '8px' }}>{EquinorIcon('warning_outlined', '#6F6F6F', 24)}</span>Name cannot
                be changed later
            </Label>
            <CoreDevDropdown
                label="Location"
                options={regions}
                width="296px"
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
            <div style={{ marginLeft: 'auto' }}>
                <Tooltip
                    title={study.wbsCode ? '' : 'Need WBS code for this study code to create sandbox'}
                    placement="left"
                    open={!study.wbsCode}
                >
                    <Button
                        style={{ width: '76px', margin: '8px 0 8px auto' }}
                        onClick={() => CreateSandbox()}
                        data-cy="create_actual_sandbox"
                        disabled={!validateUserInput()}
                    >
                        Create
                    </Button>
                </Tooltip>
            </div>
        </Wrapper>
    );
};

export default CreateSandboxComponent;
