import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, TextField, Icon } from '@equinor/eds-core-react';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { dollar, lock, lock_open } from '@equinor/eds-icons';
import { StudyObj } from '../common/interfaces';
import { createStudy, editStudy } from '../../services/Api';

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
  const { description, wbsCode, name, id, vendor, restricted } = props.study;
  const [editMode, setEditMode] = useState<boolean>(props.newStudy);
  const [descriptionL, setDescription] = useState<any>(description);
  const [descriptionOnChange, setDescriptionOnChange] = useState<string>(description);
  const [wbsL, setWbs] = useState<string>(wbsCode);
  const [wbsOnChange, setWbsOnChange] = useState<string>(wbsCode);
  const [studyName, setstudyName] = useState<string>(name);
  const [studyNameOnChange, setstudyNameOnChange] = useState<string>(name);
  const [vendorL, setVendor] = useState<string>(vendor);
  const [vendorOnChange, setSupplierOnChange] = useState<string>(vendor);
  const [checked, setChecked] = useState<boolean>(restricted);
  const [inputError, setInputError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = () => {
    if (studyNameOnChange === '' || wbsOnChange === '') {
      setInputError(true);
    }
    else {
      setEditMode(false);
      setDescription(descriptionOnChange);
      setWbs(wbsOnChange);
      setstudyName(studyNameOnChange);
      setVendor(vendorOnChange);
    }

    const newStudy = {
        name: studyNameOnChange,
        vendor: vendorOnChange,
        wbsCode: wbsOnChange,
        restricted: checked,
        description: descriptionOnChange,
        logoUrl: ''
    }
    sendStudyToApi(newStudy);
    props.setNewStudy(false);
  };

  const sendStudyToApi = (study: StudyObj) => {
    setLoading(true);
    if (props.newStudy) {
      createStudy(study).then((result: any) => {
        if (result) {
            window.location.pathname = '/studies/' + result.id;
            console.log("result: ", result);
        }
        else {
            console.log("Err");
        }
        setLoading(false);
    });
    }
    else {
      study.id = id;
      editStudy(study, id);
    }
  }

  const handleCancel = () => {
    setInputError(false);
    setEditMode(false);
    setDescriptionOnChange(description);
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
            {!editMode ? <Title>{studyName}</Title> : <TextField placeholder="What is the study name?" variant={changeVariantBasedOnInputError()} onChange={e => setstudyNameOnChange(e.target.value)} label="Study name" meta="Required" style={{margin: "auto", marginLeft: "0"}} value={studyNameOnChange} /> }
            {!editMode ? <SmallText>{vendorL}</SmallText> : <TextField placeholder="Who is the vendor?" variant={changeVariantBasedOnInputError()} onChange={e => setSupplierOnChange(e.target.value)} value={vendorOnChange} label="Vendor" meta="Required"/>}
            {!editMode ? <SmallIconWrapper><Icon color="#007079" name="dollar" size={24} /> <span>{wbsL}</span></SmallIconWrapper>: <TextField helperIcon={icons.dollar} placeholder="Wbs for the study" onChange={e => setWbsOnChange(e.target.value)} value={wbsOnChange} label="wbs" />}
            <SmallIconWrapper>
                {!editMode ? <>
                <Icon color="#007079" name={checked ? "lock": "lock_open"} size={24} /> <span>{checked ? 'Locked' : 'Unlocked'}</span></>: 
                <FormControlLabel control={<CheckBox style={{ color: '#007079' }} checked={checked} onChange={() => setChecked(!checked)} />} label="Restricted" />}
            </SmallIconWrapper>
            {!editMode ? <Button variant="outlined" onClick={() => setEditMode(true)} style={{width: "50%"}}>Edit</Button>: null}
        </TitleWrapper>
        {!editMode ?
          <DescriptionWrapper>{descriptionL}</DescriptionWrapper>:
          <TextField placeholder="Describe the study" multiline={true} onChange={e => setDescriptionOnChange(e.target.value)} label="Description" style={{ margin: 'auto', marginLeft: '0' }} value={descriptionOnChange} /> }
        <div style={{ margin: 'auto' }}>
          <Dot>SP</Dot>
          {editMode ?
          <>
          <Button variant="outlined" style={{ margin: '5px 0 20px 0' }}>Change logo</Button>
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
