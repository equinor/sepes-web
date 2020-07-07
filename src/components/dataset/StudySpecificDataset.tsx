import React, { useState } from 'react';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import styled from 'styled-components';
import { Button, Typography, TextField  } from '@equinor/eds-core-react';
import { DatasetObj } from '../common/interfaces';
import { addStudySpecificDataset } from '../../services/Api';

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

const StudySpecificDataset = (props: any) => {
    const [dataset, setDataset] = useState<DatasetObj>();
    const [loading, setLoading] = useState<boolean>();
    const [inputerError, setInputerError] = useState<boolean>();

    const addDataset = () => {
        if (checkForInputErrors()) {
            return;
        }
        addStudySpecificDataset(studyId, dataset).then((result: any) => {
            if (result) {
                console.log("resultStudy: ", result);
                window.location.pathname = '/studies/' + studyId + '/datasets/studyspecific/' + result.id;
            }
            else {
                console.log("Err");
                //notify.show('Error getting study');
            }
            setLoading(false);
        });
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
        window.location.pathname = '/studies/' + studyId;
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

    return (
        <div style={{ backgroundColor: '#ffffff' }}>
        <Wrapper>
            <div>
                <Typography variant="h2">Create study specific dataset</Typography>
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
            />
            <TextField
                placeholder="Please add storage account name..."
                name="name"
                label="Dataset name"
                meta="Required"
                variant={changeVariantBasedOnInputError()}
                style={{ width }}
                onChange={handleChange}
            />
            <CoreDevDropdown
                width={width}
                label="Location"
                options={options}
                onChange={handleDropdownChange}
                name="location"
            />
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
