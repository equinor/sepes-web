import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Button, TextField, Icon } from '@equinor/eds-core-react';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { dollar, lock, lock_open } from '@equinor/eds-icons';
import { StudyObj } from '../common/interfaces';
import { createStudy, putStudy } from '../../services/Api';
import AddImageAndCompressionContainer from '../common/ImageDropzone';

const icons = {
  dollar,
  lock,
  lock_open
};
Icon.add(icons);

const Dot = styled.span`
    height: 100px;
    width: 100px;
    background-color: #EAEAEA;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    color: #FFFFFF;
    line-height: 100px;
    font-size:3em;
  `;

const Title = styled.span`
   font-size: 28px;
  `;

const DescriptionWrapper = styled.div`
    margin: auto;
    margin-left: 0;
  `;

const SmallText = styled.span`
    font-size:10px;
  `;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr 150px;
    width: 100%;
    grid-gap: 10px;
`;

const TitleWrapper = styled.div`
    display: grid;
    font-size: 10px;
    grid-gap: 5px;
`;

const SmallIconWrapper = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
`;

const SaveCancelWrapper = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 5px;
`;


const StudyComponentFull = (props: any) => {
  const { id, logoUrl } = props.study;
  const [studyL, setStudyL] = useState<StudyObj>(props.study);
  const [studyOnChange, setStudyOnChange] = useState<StudyObj>(props.study);
  const [editMode, setEditMode] = useState<boolean>(props.newStudy);
  const [imageUrl, setImageUrl] = useState<string>(logoUrl);
  const [inputError, setInputError] = useState<boolean>(false);
  const [showImagePicker, setShowImagePicker] = useState<boolean>(false);

  const handleSave = () => {
    if (studyOnChange.name === '' || studyOnChange.vendor === '') {
      setInputError(true);
    }
    else {
      if (imageUrl) {
        setStudyOnChange({...studyL, logoUrl: imageUrl});
      }
      setStudyL(studyOnChange);
      setEditMode(false);
      sendStudyToApi(studyOnChange);
      props.setNewStudy(false);
    }
  };

  const sendStudyToApi = (study: StudyObj) => {
    props.setLoading(true);
    if (props.newStudy) {
      createStudy(study).then((result: any) => {
        if (result) {
            window.location.pathname = '/studies/' + result.id;
            console.log("result: ", result);
            let newStudy = result;
            if(imageUrl && newStudy.id){
              putStudy(newStudy, imageUrl).then((result: any) => {
                if (result) {
                    console.log("result: ", result);
                }
                else {
                    console.log("Err");
                }
                props.setLoading(false);
            });
            }
        }
        else {
            console.log("Err");
        }
        props.setLoading(false);
    });
    }
    else {
      study.id = id;
      putStudy(study, imageUrl).then((result: any) => {
        if (result) {
            console.log("result: ", result);
        }
        else {
            console.log("Err");
        }
        props.setLoading(false);
    });
    }
  }

  const handleCancel = () => {
    setInputError(false);
    setEditMode(false);
  }

  const changeVariantBasedOnInputError = () => {
    if (inputError) {
      return 'error';
    }
    return 'default';
  }

  return (
    <div style={{ backgroundColor: "white", margin: "20px 20px 0px 20px", display: "flex", borderRadius: "4px", padding: "16px", minWidth: "120px" }}>
      <Wrapper>
        <TitleWrapper>
            {!editMode ? <Title>{studyL.name}</Title> : <TextField placeholder="What is the study name?" variant={changeVariantBasedOnInputError()} onChange={e => setStudyOnChange({...studyOnChange, name: e.target.value})} label="Study name" meta="Required" style={{margin: "auto", marginLeft: "0"}} value={studyOnChange.name} /> }
            {!editMode ? <SmallText>{studyL.vendor}</SmallText> : <TextField placeholder="Who is the vendor?" variant={changeVariantBasedOnInputError()} onChange={e => setStudyOnChange({...studyOnChange, vendor: e.target.value})} value={studyOnChange.vendor} label="Vendor" meta="Required"/>}
            {!editMode ? <SmallIconWrapper><Icon color="#007079" name="dollar" size={24} /> <span>{studyL.wbsCode}</span></SmallIconWrapper>: <TextField helperIcon={icons.dollar} placeholder="Wbs for the study" onChange={e => setStudyOnChange({...studyOnChange, wbsCode: e.target.value})} value={studyOnChange.wbsCode} label="wbs" />}
            <SmallIconWrapper>
                {!editMode ? <>
                <Icon color="#007079" name={studyL.restricted ? "lock": "lock_open"} size={24} /> <span>{studyL.restricted ? 'Locked' : 'Unlocked'}</span></>: 
                <FormControlLabel control={<CheckBox style={{ color: '#007079' }} checked={studyOnChange.restricted} onChange={() => setStudyOnChange({...studyOnChange, restricted: !studyOnChange.restricted})} />} label="Restricted" />}
            </SmallIconWrapper>
            {!editMode ? <Button variant="outlined" onClick={() => setEditMode(true)} style={{width: "50%"}}>Edit</Button>: null}
        </TitleWrapper>
        {!editMode ?
          <DescriptionWrapper>{studyL.description}</DescriptionWrapper>:
          <TextField placeholder="Describe the study" multiline={true} onChange={e => setStudyOnChange({...studyOnChange, description: e.target.value})} label="Description" style={{ margin: 'auto', marginLeft: '0' }} value={studyOnChange.description} /> }
        <div style={{ margin: 'auto' }}>
          {!showImagePicker ? <Dot>SP</Dot>
          : null}
          {editMode ?
          <>
          {showImagePicker ? <AddImageAndCompressionContainer setImageUrl={setImageUrl} />
          : null}
          <Button onClick={() => setShowImagePicker(!showImagePicker)} variant="outlined" style={{ margin: '5px 0 20px 0' }}>{showImagePicker ? 'Hide image picker' : 'Change logo'}</Button>
          <SaveCancelWrapper>
            <Button onClick={() => handleSave()}>{props.newStudy? 'Create Study': "Save"}</Button>
            <Button variant="outlined" onClick={() => handleCancel()}>Cancel</Button>
          </SaveCancelWrapper>
          </>
          : null}
        </div>
      </Wrapper>
    </div>
  )
}

export default StudyComponentFull;
