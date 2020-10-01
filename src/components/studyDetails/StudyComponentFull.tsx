import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, TextField, Icon } from '@equinor/eds-core-react';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { dollar, lock, lock_open } from '@equinor/eds-icons';
import { StudyObj } from '../common/interfaces';
import { createStudy, putStudy } from '../../services/Api';
import AddImageAndCompressionContainer from '../common/upload/ImageDropzone';
import CustomLogoComponent from '../common/CustomLogoComponent';
import { checkIfRequiredFieldsAreNull } from '../common/helpers';
import { useHistory } from 'react-router-dom';
import { Label } from '../common/StyledComponents';
import Loading from '../common/LoadingComponent';
import * as notify from '../common/notify';

const icons = {
  dollar,
  lock,
  lock_open
};
Icon.add(icons);

const Title = styled.span`
   font-size: 28px;
  `;

const DescriptionWrapper = styled.div`
    margin: auto;
    margin-left: 0;
    min-width:200px;
    @media (max-width: 768px) {
      padding: 8px 0 8px 0;
  }
  `;

const SmallText = styled.span`
    font-size:10px;
  `;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(196px,368px) minmax(300px,4fr) 150px;
    width: 100%;
    grid-gap: 8px;
    @media (max-width: 768px) {
      display:block;
  }
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
  const history = useHistory();
  const { id, logoUrl, name, description, wbsCode, vendor, restricted } = props.study;
  const [studyOnChange, setStudyOnChange] = useState<StudyObj>(props.study);
  const [editMode, setEditMode] = useState<boolean>(props.newStudy);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [showImagePicker, setShowImagePicker] = useState<boolean>(false);
  const [userPressedCreate, setUserPressedCreate] = useState<boolean>(false);

  const handleSave = () => {
    setUserPressedCreate(true);
    if (checkRequiredFieldsArNotNull()) {
      return;
    }
    else {
      if (imageUrl) {
        setStudyOnChange({...studyOnChange, logoUrl: imageUrl});
      }
      setEditMode(false);
      sendStudyToApi(studyOnChange);
      props.setNewStudy(false);
    }
  };

  const sendStudyToApi = (study: StudyObj) => {
    props.setLoading(true);
    if (props.newStudy) {
      createStudy(study).then((result: any) => {
        if (result && !result.Message) {
            history.push('/studies/' + result.id);
            console.log("result: ", result);
            let newStudy = result;
            props.setStudy(newStudy);
            if (imageUrl && newStudy.id) {
              putStudy(newStudy, imageUrl).then((result: any) => {
                if (result && ! result.Message) {
                    console.log("result: ", result);
                }
                else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
                props.setLoading(false);
            });
            }
        }
        else {
            notify.show('danger', '500', result.Message, result.RequestId);
            console.log("Err");
        }
        props.setLoading(false);
    });
    }
    else {
      study.id = id;
      putStudy(study, imageUrl).then((result: any) => {
        if (result && !result.Message) {
            console.log("result: ", result);
            props.setStudy(result);
        }
        else {
            notify.show('danger', '500', result.Message, result.RequestId);
            console.log("Err");
        }
        props.setLoading(false);
    });
    }
  }

  const checkRequiredFieldsArNotNull = ():boolean => {
    if (studyOnChange.name === '' || studyOnChange === undefined || studyOnChange.vendor === '' || studyOnChange.vendor === undefined) {
      return true;
    }
    return false;
  }

  const handleCancel = () => {
    if (props.newStudy) {
      history.push('/')
      return;
    }
    setEditMode(false);
    setImageUrl('');
    //Remove line under if we want to keep changes when clicking cancel, but don't send to api
    setStudyOnChange(props.study);
    setShowImagePicker(false);
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setStudyOnChange({
      ...studyOnChange,
      [evt.target.name]: value
    });
  }

  return (
    <div style={{ backgroundColor: "white", margin: "24px 32px 0px 32px", display: "flex", borderRadius: "4px", padding: "16px", minWidth: "120px" }}>
      {!props.loading ?
      <Wrapper>
        <TitleWrapper>
            {!editMode ? <Title>{name}</Title> :
            <TextField
              name='name'
              placeholder="What is the study name?"
              variant={checkIfRequiredFieldsAreNull(studyOnChange.name, userPressedCreate)}
              onChange={handleChange}
              label="Study name" meta="Required"
              style={{margin: "auto", marginLeft: "0"}}
              value={studyOnChange.name} 
              data-cy="study_name"/> }
            {!editMode ? <SmallText>{vendor}</SmallText> :
            <TextField
              name='vendor'
              placeholder="Who is the vendor?"
              variant={checkIfRequiredFieldsAreNull(studyOnChange.vendor, userPressedCreate)}
              onChange={handleChange}
              value={studyOnChange.vendor}
              label="Vendor"
              meta="Required"
              data-cy="study_vendor"
            />
              }
            {!editMode ? 
            <SmallIconWrapper>
              <Icon color="#007079" name="dollar" size={24} />
              <span>{wbsCode}</span>
            </SmallIconWrapper>:
            <TextField
              name='wbsCode'
              helperIcon={icons.dollar}
              placeholder="Wbs for the study"
              onChange={handleChange}
              label="wbs"
              value={studyOnChange.wbsCode}
              data-cy="study_wbs"
            />
            }
            <div>
                {!editMode ?
                <SmallIconWrapper>
                  <Icon
                    color="#007079"
                    name={restricted ? 'lock': 'lock_open'}
                    size={24}
                  /> <span>{restricted ? 'Hidden' : 'Not hidden'}</span>
                </SmallIconWrapper> :
                <FormControlLabel
                  control={
                  <CheckBox
                    style={{ color: '#007079' }}
                    checked={studyOnChange.restricted}
                    onChange={() => setStudyOnChange({...studyOnChange, restricted: !studyOnChange.restricted})}
                  />}
                  label="Hidden study"
                />
                }
            </div>
            {editMode && <div><Label style={{ color: '#000000', margin: '-16px 0 16px 32px', letterSpacing: '0.2px' }}>Hidden studies are invisible in the Sepes portal except for invited participants.</Label></div>}
            {!editMode ?
            <Button
              variant="outlined"
              data-cy="edit_study"
              onClick={() => setEditMode(true)}
              style={{width: "100px"}}>
                Edit
            </Button>: null}
        </TitleWrapper>
        {!editMode ?
          <DescriptionWrapper>{description}</DescriptionWrapper>:
          <TextField
            name='description'
            placeholder="Describe the study"
            multiline={true}
            onChange={handleChange}
            label="Description"
            style={{ margin: 'auto', marginLeft: '0', height: '152px' }}
            value={studyOnChange.description} 
            data-cy="study_description"/> }
        <div style={{ margin: 'auto' }}>
          {!showImagePicker ? <CustomLogoComponent logoUrl={logoUrl} />
          : null}
          {editMode ?
          <>
          {showImagePicker ? <AddImageAndCompressionContainer setImageUrl={setImageUrl} imageUrl={imageUrl} />
          : null}
          <Button
            onClick={() => setShowImagePicker(!showImagePicker)}
            variant="outlined"
            style={{ margin: '5px 0 20px 0' }}>
              {showImagePicker ? 'Hide image picker' : 'Change logo'}
          </Button>
          <SaveCancelWrapper>
            <Button data-cy="create_study" onClick={() => handleSave()}>{props.newStudy ? 'Create Study': 'Save'}</Button>
            <Button variant="outlined" onClick={() => handleCancel()}>Cancel</Button>
          </SaveCancelWrapper>
          </>
          : null}
        </div>
          </Wrapper> : <Loading /> }
    </div>
  )
}

export default StudyComponentFull;
