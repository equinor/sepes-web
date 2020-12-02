import React, { useState, useEffect, useContext } from 'react';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import styled from 'styled-components';
import { Button, Typography, TextField, DotProgress, Tooltip } from '@equinor/eds-core-react';
import { DatasetObj, DropdownObj } from '../common/interfaces';
import {
    addStudySpecificDataset,
    editStudySpecificDataset,
    createStandardDataset,
    updateStandardDataset,
    getAzureRegions
} from '../../services/Api';
import { checkIfRequiredFieldsAreNull } from '../common/helpers';
import { useHistory } from 'react-router-dom';
import * as notify from '../common/notify';
import Promt from '../common/Promt';
import { UpdateCache } from '../../App';
import useFetch from '../common/hooks/useFetch';
import { EquinorIcon } from '../common/StyledComponents';
import { Permissions } from '../../index';
import NoAccess from '../common/NoAccess';
import { useLocation } from 'react-router-dom';

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

const dataClassificationsList = [
    { displayValue: 'Open', key: 'Open' },
    { displayValue: 'Internal', key: 'Internal' },
    { displayValue: 'Restricted', key: 'Restricted' }
];
const width = '512px';

interface passedProps {
    pathname: string;
    canCreateStudySpecificDataset: boolean;
}

type CreateEditDatasetProps = {
    datasetFromDetails: DatasetObj;
    setDatasetFromDetails: (value: any) => void;
    setShowEditDataset: (value: any) => void;
    editingDataset: boolean;
    cache: any;
};

const CreateEditDataset: React.FC<CreateEditDatasetProps> = ({
    datasetFromDetails,
    setDatasetFromDetails,
    setShowEditDataset,
    editingDataset,
    cache
}) => {
    const studyId = window.location.pathname.split('/')[2];
    const datasetId = window.location.pathname.split('/')[4];
    const history = useHistory();
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const [dataset, setDataset] = useState<DatasetObj>(datasetFromDetails);
    const [loading, setLoading] = useState<boolean>();
    const [editDataset, setEditDataset] = useState<boolean>(editingDataset || false);
    const [regions, setRegions] = useState<DropdownObj>();
    useFetch(getAzureRegions, setRegions, 'regions');
    const [userPressedCreate, setUserPressedCreate] = useState<boolean>(false);
    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const [fallBackAddress, setFallBackAddress] = useState<string>('/');
    const permissions = useContext(Permissions);
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
        setUpdateCache({ ...updateCache, ['study' + studyId]: true });
        const isDatasetspecificDataset = !checkUrlIfGeneralDataset();
        if (!editDataset && isDatasetspecificDataset) {
            addStudySpecificDataset(studyId, dataset).then((result: any) => {
                if (result && !result.Message) {
                    setHasChanged(false);
                    setUpdateCache({ ...updateCache, ['study' + studyId]: true });
                    history.push('/studies/' + studyId + '/datasets/' + result.id);
                } else {
                    console.log('Err');
                    notify.show('danger', '500', result.Message, result.RequestId);
                }
                setLoading(false);
            });
        } else if (isDatasetspecificDataset) {
            editStudySpecificDataset(studyId, dataset).then((result: any) => {
                if (result && !result.Message) {
                    setHasChanged(false);
                    const datasetCache = 'dataset' + studyId + result.id;
                    setUpdateCache({ ...updateCache, ['study' + studyId]: true, [datasetCache]: true });
                    setDatasetFromDetails(result);
                    setShowEditDataset(false);
                } else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
                setLoading(false);
            });
        } else if (!editDataset) {
            createStandardDataset(dataset).then((result: any) => {
                if (result && !result.Message) {
                    setHasChanged(false);
                    setUpdateCache({ ...updateCache, datasets: true, ['dataset' + studyId]: true });
                    history.push('/datasets/' + result.id);
                } else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
                setLoading(false);
            });
        } else {
            updateStandardDataset(studyId, dataset).then((result: any) => {
                if (result && !result.Message) {
                    setHasChanged(false);
                    setUpdateCache({ ...updateCache, datasets: true });
                    cache['dataset' + studyId] = result;
                    history.push('/datasets/' + result.id);
                    setDatasetFromDetails(result);
                    setShowEditDataset(false);
                } else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
                setLoading(false);
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
        if (!dataset?.name?.length || !dataset?.classification?.length || !dataset?.storageAccountName) {
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

    return permissions.canEdit_PreApproved_Datasets ||
        (location.state && location.state.canCreateStudySpecificDataset) ? (
        <>
            <Promt hasChanged={hasChanged} fallBackAddress={fallBackAddress} />
            <OuterWrapper>
                <Wrapper>
                    <div>
                        <Typography variant="h2">{!editDataset ? 'Create dataset' : 'Edit dataset'}</Typography>
                        {!checkUrlIfGeneralDataset() && <span>This data is only available for this study</span>}
                    </div>
                    <HelperTextWrapper>
                        {!checkUrlIfGeneralDataset()
                            ? 'This data set will only available for this study. We need some meta data before we create the storage. When storage is created you can start uploading files.'
                            : 'This data set will be available for all studies in Sepes. We need some meta data before we create the storage. When storage is created you can start uploading files.'}
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
                    />
                    {!editDataset ? (
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
                    ) : (
                        returnField('Storage account name', dataset?.storageAccountName)
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
                    />
                    <StyledLink
                        href="https://docmap.equinor.com/Docmap/page/doc/dmDocIndex.html?DOCID=1000006094"
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
                        href="https://statoilsrm.sharepoint.com/:x:/r/sites/datafundamentals/_layouts/15/Doc.aspx?sourcedoc=%7B74CCD0A3-1C7E-4645-9D16-C9BFEDC5C07E%7D&file=Data%20description%20and%20classification%20inventory.xlsx&action=default&mobileredirect=true"
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
