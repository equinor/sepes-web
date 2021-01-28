import React, { useState, useEffect, useContext } from 'react';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import styled from 'styled-components';
import { Button, Typography, TextField, DotProgress, Tooltip } from '@equinor/eds-core-react';
import { DatasetObj, DropdownObj, DatasetPermissionObj } from '../common/interfaces';
import {
    addStudySpecificDataset,
    editStudySpecificDataset,
    createStandardDataset,
    updateStandardDataset
} from '../../services/Api';
import { checkIfRequiredFieldsAreNull } from '../common/helpers';
import { useHistory } from 'react-router-dom';
import * as notify from '../common/notify';
import Promt from '../common/Promt';
import { UpdateCache } from '../../App';
import { EquinorIcon } from '../common/StyledComponents';
import { Permissions } from '../../index';
import NoAccess from '../common/NoAccess';
import { useLocation } from 'react-router-dom';
import useFetchUrl from '../common/hooks/useFetchUrl';
import { dataInventoryLink, ClassificationGuidlinesLink } from '../common/commonLinks';
import {
    getDatasetsInStudyUrl,
    getDatasetsUrl,
    getRegionsUrl,
    getStandardDatasetUrl,
    getStudyByIdUrl,
    getStudySpecificDatasetUrl
} from '../../services/ApiCallStrings';

const OuterWrapper = styled.div`
    position: absolute;
    top: 64px;
    bottom: 0px;
    background-color: #ffffff;
    width: 100%;
`;

const Wrapper = styled.div`
    display: grid;
    grid-gap: 16px;
    padding: 32px;
    width: 400px;
`;

const HelperTextWrapper = styled.div`
    border-radius: 4px;
    background-color: #d5eaf4;
    padding: 16px;
`;

const SaveCancelWrapper = styled.div`
    margin-top: 16px;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 100px 100px;
`;

const StyledLink = styled.a`
    font-size: 14px;
    color: #007079;
    text-decoration-line: underline;
`;

const studySpecificHelpText =
    'This data set will only available for this study. We need some meta data before we create the storage. When storage is created you can start uploading files.';
const standardHelpText =
    'This data set will be available for all studies in Sepes. We need some meta data before we create the storage. When storage is created you can start uploading files.';

const dataClassificationsList = [
    { displayValue: 'Open', key: 'Open' },
    { displayValue: 'Internal', key: 'Internal' },
    { displayValue: 'Restricted', key: 'Restricted' }
];
const width = '512px';

interface passedProps {
    pathname: string;
    canCreateStudySpecificDataset: boolean;
    canEditStudySpecificDataset: boolean;
}

type CreateEditDatasetProps = {
    datasetFromDetails: DatasetObj;
    setDatasetFromDetails: (value: any) => void;
    setShowEditDataset: (value: any) => void;
    editingDataset: boolean;
    permissions: DatasetPermissionObj;
};

const CreateEditDataset: React.FC<CreateEditDatasetProps> = ({
    datasetFromDetails,
    setDatasetFromDetails,
    setShowEditDataset,
    editingDataset,
    permissions
}) => {
    const studyId = window.location.pathname.split('/')[2];
    const datasetId = window.location.pathname.split('/')[4];
    const history = useHistory();
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const [dataset, setDataset] = useState<DatasetObj>(datasetFromDetails);
    const [loading, setLoading] = useState<boolean>();
    const [editDataset, setEditDataset] = useState<boolean>(editingDataset || false);
    const [regions, setRegions] = useState<DropdownObj>();
    useFetchUrl(getRegionsUrl(), setRegions);
    const [userPressedCreate, setUserPressedCreate] = useState<boolean>(false);
    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const [fallBackAddress, setFallBackAddress] = useState<string>('/');
    const generalDatasetpermissions = useContext(Permissions);
    const location = useLocation<passedProps>();

    useEffect(() => {
        checkIfEditMode();
        document.addEventListener('keydown', listener, false);
        return () => {
            document.removeEventListener('keydown', listener, false);
        };
    }, [editDataset]);

    const listener = (e: any) => {
        if (e.key === 'Escape') {
            handleCancel(e);
        }
    };

    const checkIfEditMode = () => {
        if (!checkUrlIfGeneralDataset() && datasetId) {
            setEditDataset(true);
        }
        if (checkUrlIfGeneralDataset() && !checkUrlNewDataset()) {
            setEditDataset(true);
        }
    };

    const checkUrlIfGeneralDataset = (): boolean => {
        if (window.location.pathname.split('/')[1] === 'datasets') {
            return true;
        }
        return false;
    };

    const checkUrlNewDataset = () => {
        if (window.location.pathname.split('/')[2] === 'new') {
            return true;
        }
        return false;
    };

    const addDataset = () => {
        setUserPressedCreate(true);
        if (checkForInputErrors()) {
            return;
        }
        setLoading(true);
        const isDatasetspecificDataset = !checkUrlIfGeneralDataset();
        if (!editDataset && isDatasetspecificDataset) {
            addStudySpecificDataset(studyId, dataset).then((result: any) => {
                setLoading(false);
                if (result && !result.Message) {
                    setHasChanged(false);
                    setUpdateCache({
                        ...updateCache,
                        [getStudyByIdUrl(studyId)]: true,
                        [getDatasetsInStudyUrl(studyId)]: true
                    });
                    history.push('/studies/' + studyId + '/datasets/' + result.id);
                } else {
                    console.log('Err');
                    notify.show('danger', '500', result.Message, result.RequestId);
                }
            });
        } else if (isDatasetspecificDataset) {
            editStudySpecificDataset(studyId, dataset).then((result: any) => {
                setLoading(false);
                if (result && !result.Message) {
                    setHasChanged(false);
                    setUpdateCache({
                        ...updateCache,
                        [getStudyByIdUrl(studyId)]: true,
                        [getStudySpecificDatasetUrl(result.Id, studyId)]: true
                    });
                    setDatasetFromDetails(result);
                    setShowEditDataset(false);
                } else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
            });
        } else if (!editDataset) {
            createStandardDataset(dataset).then((result: any) => {
                setLoading(false);
                if (result && !result.Message) {
                    setHasChanged(false);
                    setUpdateCache({
                        ...updateCache,
                        [getDatasetsUrl()]: true,
                        [getStandardDatasetUrl(result.id)]: true
                    });
                    history.push('/datasets/' + result.id);
                } else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
            });
        } else {
            updateStandardDataset(studyId, dataset).then((result: any) => {
                setLoading(false);
                if (result && !result.Message) {
                    setHasChanged(false);
                    setUpdateCache({ ...updateCache, 'datasets/': true, [getStandardDatasetUrl(studyId)]: true });
                    //cache[getStandardDatasetUrl(studyId)] = result;
                    setDatasetFromDetails(result);
                    setShowEditDataset(false);
                } else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
            });
        }
    };

    const handleChange = (columName: string, value: string) => {
        setHasChanged(true);
        setDataset({
            ...dataset,
            [columName]: value
        });
    };

    const handleDropdownChange = (value, name: string): void => {
        setHasChanged(true);
        setDataset({
            ...dataset,
            [name]: value
        });
    };

    const handleCancel = (evt) => {
        let studySpecificDataset = false;
        if (window.location.pathname.split('/')[1] === 'studies') {
            studySpecificDataset = true;
        }
        if (setShowEditDataset) {
            setShowEditDataset(false);
        } else if (!editDataset && studySpecificDataset) {
            setFallBackAddress('/studies/' + studyId);
            history.push('/studies/' + studyId);
        } else {
            setFallBackAddress('/datasets');
            history.push('/datasets');
        }
    };

    const checkForInputErrors = () => {
        if (!dataset?.name?.length || !dataset?.classification?.length || !dataset?.location?.length) {
            return true;
        }
        return false;
    };

    const returnField = (fieldName, value) => {
        return (
            <div>
                <div>{fieldName}</div>
                <Typography variant="h6">{value || '-'}</Typography>
            </div>
        );
    };

    return (checkUrlIfGeneralDataset && generalDatasetpermissions.canEdit_PreApproved_Datasets) ||
        (permissions && permissions.editDataset) ||
        (location && location.state.canCreateStudySpecificDataset) ? (
        <>
            <Promt hasChanged={hasChanged} fallBackAddress={fallBackAddress} />
            <OuterWrapper>
                <Wrapper>
                    <div>
                        <Typography variant="h2">{!editDataset ? 'Create dataset' : 'Edit dataset'}</Typography>
                        {!checkUrlIfGeneralDataset() && <span>This data is only available for this study</span>}
                    </div>
                    <HelperTextWrapper>
                        {!checkUrlIfGeneralDataset() ? studySpecificHelpText : standardHelpText}
                    </HelperTextWrapper>
                    <TextField
                        id="textfield1"
                        placeholder="Please add data set name..."
                        label="Dataset name"
                        meta="(required)"
                        variant={checkIfRequiredFieldsAreNull(dataset?.name, userPressedCreate)}
                        style={{ width, backgroundColor: '#FFFFFF' }}
                        onChange={(e: any) => handleChange('name', e.target.value)}
                        value={dataset?.name}
                        data-cy="dataset_name"
                        autoComplete="off"
                        autoFocus
                    />
                    {editDataset && returnField('Storage account name', dataset?.storageAccountName)}
                    {!editDataset && checkUrlIfGeneralDataset() && (
                        <TextField
                            id="textfield2"
                            autoComplete="off"
                            placeholder="Please add storage account name..."
                            label="Storage account name"
                            meta="(required)"
                            variant={checkIfRequiredFieldsAreNull(dataset?.storageAccountName, userPressedCreate)}
                            style={{ width, backgroundColor: '#FFFFFF' }}
                            onChange={(e: any) => handleChange('storageAccountName', e.target.value)}
                            data-cy="dataset_storage_name"
                            inputIcon={
                                <div style={{ position: 'relative', right: '4px', bottom: '4px' }}>
                                    <Tooltip title="This cannot be changed later" placement={'right'}>
                                        {EquinorIcon('error_outlined', '#6F6F6F', 24)}
                                    </Tooltip>
                                </div>
                            }
                        />
                    )}
                    {!editDataset ? (
                        <CoreDevDropdown
                            width={width}
                            label="Location"
                            meta="(required)"
                            options={regions}
                            onChange={handleDropdownChange}
                            name="location"
                            data-cy="dataset_location"
                            color="#FFFFFF"
                            tabIndex={0}
                        />
                    ) : (
                        returnField('Location', dataset?.location)
                    )}
                    <CoreDevDropdown
                        width={width}
                        label="Data classification"
                        meta="(required)"
                        options={dataClassificationsList}
                        onChange={handleDropdownChange}
                        name="classification"
                        preSlectedValue={dataset?.classification}
                        data-cy="dataset_classification"
                        color="#FFFFFF"
                        tabIndex={0}
                    />
                    <StyledLink
                        href={ClassificationGuidlinesLink}
                        style={{ marginTop: '-8px' }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {EquinorIcon('external_link', '#007079', 24)}
                        <span style={{ marginLeft: '8px' }}>Classification guidelines</span>
                    </StyledLink>
                    <TextField
                        id="textfield13"
                        placeholder="Please add Data ID"
                        label="DataId"
                        meta=""
                        type="number"
                        style={{ width: '312px', backgroundColor: '#FFFFFF' }}
                        onChange={(e: any) => handleChange('dataId', e.target.value)}
                        value={dataset?.dataId?.toString()}
                        data-cy="dataset_dataId"
                        autoComplete="off"
                    />
                    <StyledLink
                        href={dataInventoryLink}
                        style={{ marginTop: '-8px' }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {EquinorIcon('external_link', '#007079', 24)}
                        <span style={{ marginLeft: '8px' }}>Data inventory</span>
                    </StyledLink>
                    <SaveCancelWrapper>
                        <Button disabled={checkForInputErrors() || loading} onClick={addDataset} data-cy="dataset_save">
                            {loading ? <DotProgress variant="green" /> : 'Save'}
                        </Button>
                        <Button disabled={userPressedCreate || loading} onClick={handleCancel} variant="outlined">
                            Cancel
                        </Button>
                    </SaveCancelWrapper>
                </Wrapper>
            </OuterWrapper>
        </>
    ) : (
        <NoAccess />
    );
};

export default CreateEditDataset;
