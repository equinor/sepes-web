import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, TextField, Icon } from '@equinor/eds-core-react';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { dollar, visibility, visibility_off, business } from '@equinor/eds-icons';
import { StudyObj } from '../common/interfaces';
import { createStudy, putStudy } from '../../services/Api';
import AddImageAndCompressionContainer from '../common/upload/ImageDropzone';
import CustomLogoComponent from '../common/CustomLogoComponent';
import { returnTextField } from '../common/helpers';
import { useHistory } from 'react-router-dom';
import { Label } from '../common/StyledComponents';
import Loading from '../common/LoadingComponent';
import * as notify from '../common/notify';

const icons = {
  dollar,
  visibility,
  visibility_off,
  business
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
    margin-Top:4px;
  `;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(196px,296px) minmax(300px,4fr) 150px;
    width: 100%;
    grid-gap: 32px;
    @media (max-width: 768px) {
      display:block;
  }
`;

const TitleWrapper = styled.div<{ editMode: any }>`
    display: grid;
    font-size: 10px;
    grid-gap: ${(props: any) => (props.editMode ? "16px" : "8px")};
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
    if (imageUrl) {
      props.setLoading(true);
    }
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
      props.setStudy(studyOnChange);
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
    if ( evt.target.name === 'description' && value.length > 500) {
      return;
    } 
    setStudyOnChange({
      ...studyOnChange,
      [evt.target.name]: value
    });
  }

  return (
    <div style={{ backgroundColor: "white", margin: "24px 32px 0px 32px", display: "flex", borderRadius: "4px", padding: "16px", minWidth: "120px" }}>
      {!props.loading ?
      <Wrapper>
        <TitleWrapper editMode={editMode}>
            {!editMode ? 
            <>
            <Title>{name}</Title>
            <SmallIconWrapper>
              <Icon color="#007079" name="business" size={24} />
              <SmallText>{vendor}</SmallText>
            </SmallIconWrapper>
            <SmallIconWrapper>
              <Icon color="#007079" name="dollar" size={24} />
              <SmallText>{wbsCode}</SmallText>
            </SmallIconWrapper>
            </> :
            <>
            {returnTextField('name', 'What is the study name?', studyOnChange.name, 'Study name', 'Required', 'study_name', handleChange, userPressedCreate, { margin: 'auto', marginLeft: '0' })}
            {returnTextField('vendor', 'Who is the vendor?', studyOnChange.vendor, 'Vendor', 'Required', 'study_vendor', handleChange, userPressedCreate)}
            {returnTextField('wbsCode', 'Wbs for the study', studyOnChange.wbsCode, 'wbs', '', 'study_wbs', handleChange, userPressedCreate)}
            </>}
            <div>
                {!editMode ?
                <SmallIconWrapper>
                  <Icon
                    color="#007079"
                    name={restricted ? 'visibility_off' : 'visibility'}
                    size={24}
                  /> <SmallText>{restricted ? 'Hidden' : 'Not hidden'}</SmallText>
                </SmallIconWrapper> :
                <FormControlLabel
                  control={
                  <CheckBox
                    style={{ color: '#007079' }}
                    checked={studyOnChange.restricted}
                    onChange={() => setStudyOnChange({ ...studyOnChange, restricted: !studyOnChange.restricted })}
                  />}
                  label="Hidden study"
                />
                }
            </div>
            {!editMode ?
            <Button
              variant="outlined"
              onClick={() => setEditMode(true)}
              style={{ width: '80px' }}>
                Edit
            </Button>: <div>
              <Label style={{ color: '#000000', margin: '-16px 0 16px 32px', letterSpacing: '0.2px' }}>
                Hidden studies are invisible in the Sepes portal except for invited participants.
              </Label>
              </div>}
        </TitleWrapper>
        {!editMode ?
          <DescriptionWrapper>{description}</DescriptionWrapper>:
          <div style={{margin: 'auto 0 auto 0'}}>
          {returnTextField('description', 'Describe the study', studyOnChange.description, 'Description', 'limit', 'study_description', handleChange, userPressedCreate, { margin: 'auto', marginLeft: '0', height: '152px'}, true)}
          </div>}
        <div style={{margin: 'auto 0 auto 0'}}>
          {!showImagePicker && <div style={{ margin: 'auto 0 auto 16px' }}><CustomLogoComponent logoUrl={logoUrl} /></div>}
          {editMode &&
          <>
          {showImagePicker && <AddImageAndCompressionContainer setImageUrl={setImageUrl} imageUrl={imageUrl} />}
          <Button
            onClick={() => setShowImagePicker(!showImagePicker)}
            variant="outlined"
            style={{ margin: '16px 0 20px 34px' }}
          >
              {showImagePicker ? 'Hide image picker' : 'Change logo'}
          </Button>
          <SaveCancelWrapper>
            <Button
              data-cy="create_study"
              onClick={() => handleSave()}
            >
                {props.newStudy ? 'Create Study': 'Save'}
            </Button>
            <Button variant="outlined" onClick={() => handleCancel()}>Cancel</Button>
          </SaveCancelWrapper>
          </>}
        </div>
          </Wrapper> : <Loading /> }
    </div>
  )
}

export default StudyComponentFull;
