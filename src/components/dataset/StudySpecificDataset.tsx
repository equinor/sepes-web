import React, { useState, useEffect } from 'react';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import styled from 'styled-components';
import { Button, Typography, TextField  } from '@equinor/eds-core-react';
import { DatasetObj, DropdownObj } from '../common/interfaces';
import { addStudySpecificDataset,
    getDataset,
    editStudySpecificDataset,
    createStandardDataset,
    getStandardDataset,
    updateStandardDataset,
    getAzureRegions
} from '../../services/Api';
import { getRegions } from '../common/commonApiCalls';
import { checkIfRequiredFieldsAreNull } from '../common/helpers';
import { useHistory } from 'react-router-dom';
import * as notify from '../common/notify';

const OuterWrapper = styled.div`
    position: absolute;
    top: 64px;
    bottom: 0px;
    background-color:#ffffff;
    width: 100%;
`;

const Wrapper = styled.div`
    display: grid;
    grid-gap:16px;
    padding:32px;
    width:400px;
  `;

const SaveCancelWrapper = styled.div`
    display: grid;
    grid-gap:16px;
    grid-template-columns: 100px 100px;
  `;
const options = [
    { displayValue: "1", key:'1' },
    { displayValue: "2", key:'2' },
    { displayValue: "3", key:'3' },
    { displayValue: "4", key:'4' }
  ];
const width = '400px';
let studyId = '';
let datasetId = '';

const StudySpecificDataset = (props: any) => {
    const history = useHistory();
    const [dataset, setDataset] = useState<DatasetObj>();
    const [loading, setLoading] = useState<boolean>();
    const [editDataset, setEditDataset] = useState<boolean>(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean>();
    const [regions, setRegions] = useState<DropdownObj>();
    const [userPressedCreate, setUserPressedCreate] = useState<boolean>(false);
    useEffect(() => {
        checkIfEditMode();
        setIsSubscribed(true);
        getDatasetFromApi();
        getRegions(setRegions);
        return () => setIsSubscribed(false);
    }, [editDataset]);

    const getDatasetFromApi = () => {
        studyId = window.location.pathname.split('/')[2];
        datasetId = window.location.pathname.split('/')[4];
        if (!checkUrlIfGeneralDataset() && datasetId) {
            setLoading(true);
            getDataset(datasetId, studyId).then((result: any) => {
                if (result && !result.Message) {
                    setDataset(result);
                    //setEditDataset(true);
                    console.log("result: ", result);
                }
                else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
                setLoading(false);
            });
        }
        else if (checkUrlIfGeneralDataset() && !checkUrlNewDataset()) {
            getStandardDataset(studyId).then((result: any) => {
                if (result && !result.Message) {
                    setDataset(result);
                    //setEditDataset(true);
                    console.log("result: ", result);
                }
                else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
                setLoading(false);
            });
        }
    };

    const checkIfEditMode = () => {
        datasetId = window.location.pathname.split('/')[4];
        if (!checkUrlIfGeneralDataset() && datasetId) {
            setEditDataset(true);
        }
        if (checkUrlIfGeneralDataset() && !checkUrlNewDataset()) {
            setEditDataset(true);
        }
    }

    const checkUrlIfGeneralDataset = ():boolean => {
        if (window.location.pathname.split('/')[1] === 'datasets') {
            return true;
        }
        return false;
    }

    const checkUrlNewDataset = () => {
        if (window.location.pathname.split('/')[2] === 'new') {
            return true;
        }
        return false;
    }

    const addDataset = () => {
        setUserPressedCreate(true);
        if (checkForInputErrors()) {
            return;
        }
        const isDatasetspecificDataset = !checkUrlIfGeneralDataset();
        if (!editDataset && isDatasetspecificDataset) {
            addStudySpecificDataset(studyId, dataset).then((result: any) => {
                if (result.datasets.length) {
                    console.log("resultStudy: ", result);
                    history.push('/studies/' + studyId + '/datasets/' + result.datasets[result.datasets.length - 1].id);
                }
                else {
                    console.log("Err");
                    notify.show('danger', '500');
                }
                setLoading(false);
            });
        }
        else if (isDatasetspecificDataset) {
            editStudySpecificDataset(studyId, dataset).then((result: any) => {
                if (result && !result.Message) {
                    console.log("resultStudy: ", result);
                    history.push('/studies/' + studyId + '/datasets/' + result.id);
                }
                else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
                setLoading(false);
            });
        }
        else if(!editDataset) {
            createStandardDataset(dataset).then((result: any) => {
                if (result && !result.Message) {
                    console.log("resultStudy: ", result);
                    history.push('/datasets/' + result.id);
                }
                else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
                setLoading(false);
            });
        }
        else {
            updateStandardDataset(studyId, dataset).then((result: any) => {
                if (result && !result.Message) {
                    console.log("resultStudy: ", result);
                    history.push('/datasets/' + result.id);
                }
                else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
                setLoading(false);
            });
        }
    }

    const handleChange = evt => {
        setDataset({
          ...dataset,
          [evt.target.name]: evt.target.value
        });
    };

    const handleDropdownChange = (value, name:string): void => {
        setDataset({
          ...dataset,
          [name]: value
        });
    };

    const handleCancel = evt => {
        studyId = window.location.pathname.split('/')[2];
        datasetId = window.location.pathname.split('/')[4];
        let studySpecificDataset = false;
        if (window.location.pathname.split('/')[1] === 'studies') {
            studySpecificDataset = true;
        }
        if (!editDataset && studySpecificDataset) {
            history.push('/studies/' + studyId);
        }
        else if (studySpecificDataset) {
            history.push('/studies/' + studyId + '/datasets/' + datasetId);
        }
        else if (!checkUrlNewDataset()) {
            history.push('/datasets/' + studyId);
        }
        else {
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
    

    return (
        <OuterWrapper>
            <Wrapper>
                <div>
                    <Typography variant="h2">{!editDataset ? 'Create dataset' : 'Edit dataset'}</Typography>
                    {!checkUrlIfGeneralDataset() && <span>This data is only available for this study</span>}
                </div>
                <TextField
                    placeholder="Please add data set name..."
                    name="name"
                    label="Dataset name"
                    meta="Required"
                    variant={checkIfRequiredFieldsAreNull(dataset?.name, userPressedCreate)}
                    style={{ width }}
                    onChange={handleChange}
                    value={dataset?.name}
                />
                {!editDataset ? <TextField
                    placeholder="Please add storage account name..."
                    name="storageAccountName"
                    label="Storage account name"
                    meta="Required"
                    variant={checkIfRequiredFieldsAreNull(dataset?.storageAccountName, userPressedCreate)}
                    style={{ width }}
                    onChange={handleChange}
                /> : returnField('Storage account name', dataset?.storageAccountName) }
                {!editDataset ? <CoreDevDropdown
                    width={width}
                    label="Location"
                    options={regions}
                    onChange={handleDropdownChange}
                    name="location"
                /> : returnField('Location', dataset?.location)}
                <CoreDevDropdown
                    width={width}
                    label="Data classification"
                    options={options}
                    onChange={handleDropdownChange}
                    name="classification"
                />
                <TextField
                    placeholder="Please add Data ID..."
                    name="dataId"
                    label="DataId"
                    meta=""
                    type="number"
                    style={{ width }}
                    onChange={handleChange}
                    value={dataset?.dataId}
                />
                <SaveCancelWrapper>
                    <Button disabled={userPressedCreate} onClick={addDataset}>Save</Button>
                    <Button disabled={userPressedCreate} onClick={handleCancel} variant="outlined">Cancel</Button>
                </SaveCancelWrapper>
            </Wrapper>
        </OuterWrapper>
    )
}

export default StudySpecificDataset;
