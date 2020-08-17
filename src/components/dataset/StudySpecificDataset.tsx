import React, { useState, useEffect } from 'react';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import styled from 'styled-components';
import { Button, Typography, TextField  } from '@equinor/eds-core-react';
import { DatasetObj } from '../common/interfaces';
import { addStudySpecificDataset, getDataset, editStudySpecificDataset, createStandardDataset, getStandardDataset, updateStandardDataset } from '../../services/Api';

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
    { name: "1", id:'1' },
    { name: "2", id:'2' },
    { name: "3", id:'3' },
    { name: "4", id:'4' }
  ];
const width = '400px';
const studyId = window.location.pathname.split('/')[2];
const datasetId = window.location.pathname.split('/')[4];

const StudySpecificDataset = (props: any) => {
    const [dataset, setDataset] = useState<DatasetObj>();
    const [loading, setLoading] = useState<boolean>();
    const [inputerError, setInputerError] = useState<boolean>();
    const [editDataset, setEditDataset] = useState<boolean>(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean>();
    useEffect(() => {
        setIsSubscribed(true);
        getDatasetFromApi();
        return () => setIsSubscribed(false);
    }, []);

    const getDatasetFromApi = () => {
        if (!checkUrlIfGeneralDataset() && datasetId) {
            setLoading(true);
            getDataset(datasetId, studyId).then((result: any) => {
                if (result) {
                    setDataset(result);
                    setEditDataset(true);
                    console.log("result: ", result);
                }
                else {
                    console.log("Err");
                }
                setLoading(false);
            });
        }
        else if (checkUrlIfGeneralDataset() && !checkUrlNewDataset()) {
            getStandardDataset(studyId).then((result: any) => {
                if (result) {
                    setDataset(result);
                    setEditDataset(true);
                    console.log("result: ", result);
                }
                else {
                    console.log("Err");
                }
                setLoading(false);
            });
        }
    };

    const checkUrlIfGenerealDataset2 = () => {
        if (!isNaN(studyId as any)) {
            return true;
        }
        return false;
    }

    const checkUrlIfGeneralDataset = () => {
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
        if (checkForInputErrors()) {
            return;
        }
        const isDatasetspecificDataset = !checkUrlIfGeneralDataset();
        if (!editDataset && isDatasetspecificDataset) {
            addStudySpecificDataset(studyId, dataset).then((result: any) => {
                if (result.datasets.length) {
                    console.log("resultStudy: ", result);
                    window.location.pathname = '/studies/' + studyId + '/datasets/' + result.datasets[result.datasets.length - 1].id;
                }
                else {
                    console.log("Err");
                    //notify.show('Error getting study');
                }
                setLoading(false);
            });
        }
        else if (isDatasetspecificDataset) {
            editStudySpecificDataset(studyId, dataset).then((result: any) => {
                if (result) {
                    console.log("resultStudy: ", result);
                    window.location.pathname = '/studies/' + studyId + '/datasets/' + result.id;
                }
                else {
                    console.log("Err");
                    //notify.show('Error getting study');
                }
                setLoading(false);
            });
        }
        else if(!editDataset) {
            createStandardDataset(dataset).then((result: any) => {
                if (result) {
                    console.log("resultStudy: ", result);
                    window.location.pathname = '/datasets/' + result.id;
                }
                else {
                    console.log("Err");
                    //notify.show('Error getting study');
                }
                setLoading(false);
            });
        }
        else {
            updateStandardDataset(studyId, dataset).then((result: any) => {
                if (result) {
                    console.log("resultStudy: ", result);
                    window.location.pathname = '/datasets/' + result.id;
                }
                else {
                    console.log("Err");
                    //notify.show('Error getting study');
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
        window.history.back();
    };

    const changeVariantBasedOnInputError = () => {
        if (inputerError) {
          return 'error';
        }
        return 'default';
    };

    const checkForInputErrors = () => {
        if (!dataset?.name?.length || !dataset?.classification?.length) {
            setInputerError(true);
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
        <div style={{ backgroundColor: '#ffffff' }}>
        <Wrapper>
            <div>
                <Typography variant="h2">{!editDataset ? 'Create study specific dataset' : 'Edit study specific dataset'}</Typography>
                <span>This data is only available for this study</span>
            </div>
            <TextField
                placeholder="Please add data set name..."
                name="name"
                label="Dataset name"
                meta="Required"
                variant={changeVariantBasedOnInputError()}
                style={{ width }}
                onChange={handleChange}
                value={dataset?.name}
            />
            {!editDataset ? <TextField
                placeholder="Please add storage account name..."
                name="storageAccountName"
                label="Storage account name"
                meta="Required"
                variant={changeVariantBasedOnInputError()}
                style={{ width }}
                onChange={handleChange}
            /> : returnField('Storage account name', dataset?.storageAccountName) }
            {!editDataset ? <CoreDevDropdown
                width={width}
                label="Location"
                options={options}
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
                <Button onClick={addDataset}>Save</Button>
                <Button onClick={handleCancel} variant="outlined">Cancel</Button>
            </SaveCancelWrapper>
        </Wrapper>
        </div>
    )
}

export default StudySpecificDataset;
