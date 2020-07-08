import React, { useState, useEffect } from 'react';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import styled from 'styled-components';
import { Button, Typography, TextField  } from '@equinor/eds-core-react';
import { DatasetObj } from '../common/interfaces';
import { addStudySpecificDataset, getDataset, editStudySpecificDataset } from '../../services/Api';

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
        if (datasetId) {
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
        
    };

    const addDataset = () => {
        if (checkForInputErrors()) {
            return;
        }
        if (!editDataset) {
            addStudySpecificDataset(studyId, dataset).then((result: any) => {
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
        else {
            /* Need backend endpoint
            editStudySpecificDataset(studyId, dataset).then((result: any) => {
                if (result) {
                    console.log("resultStudy: ", result);
                    //window.location.pathname = '/studies/' + studyId + '/datasets/' + result.id;
                }
                else {
                    console.log("Err");
                    //notify.show('Error getting study');
                }
                setLoading(false);
            });*/
        }
        
    }

    const handleChange = evt => {
        setDataset({
          ...dataset,
          [evt.target.name]: evt.target.value
        });
    }

    const handleDropdownChange = (value, name:string) => {
        console.log(value);
        setDataset({
          ...dataset,
          [name]: value
        });
      }

    const handleCancel = evt => {
        if (!editDataset) {
            window.location.pathname = '/studies/' + studyId;
        }
        else {
            window.location.pathname = '/studies/' + studyId + '/datasets/' + datasetId;
        }
    }

    const changeVariantBasedOnInputError = () => {
        if (inputerError) {
          return 'error';
        }
        return 'default';
      }

    const checkForInputErrors = () => {
        console.log(dataset?.name);
        if (!dataset?.name?.length) {
            setInputerError(true);
            return true;
        }
        return false;
    }

    const returnField = (fieldName, value) => {
        return (
        <div>
            <div>{fieldName}</div>
            <Typography variant="h6">{value || '-'}</Typography>
        </div>
        );
    }

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
                name="name"
                label="Storage account name"
                meta="Required"
                variant={changeVariantBasedOnInputError()}
                style={{ width }}
                onChange={handleChange}
            /> : returnField('Storage account name', dataset?.name) }
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
