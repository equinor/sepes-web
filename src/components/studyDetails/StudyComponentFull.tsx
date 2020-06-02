import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@equinor/eds-core-react';
import CheckBox from '@material-ui/core/Checkbox';
import Dollar from '../../icons/dollar.svg';
import Lock from '../../icons/lock_off.svg';
import {
    faDollarSign,
    faLockOpen
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const Description = styled.span`
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

//repeat(auto-fit,minmax(100px,1fr));
const StudyComponentFull = (props: any) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(props.description || "");
  const [descriptionOnChange, setDescriptionOnChange] = useState<string>(props.description || "");
  const [checked, setChecked] = useState<boolean>(false);

  const handleSave = () => {
    setEditMode(false);
    setDescription(descriptionOnChange)
  };

  const handleCancel = () => {
    setEditMode(false);
    setDescriptionOnChange(description);
  }

  return (
    <div style={{ backgroundColor: "white", margin: "20px 20px 0px 20px", display: "flex", borderRadius: "4px", padding: "16px", minWidth: "120px" }}>
      <Wrapper>
        <TitleWrapper>
            <Title>{props.name}</Title>
            {!editMode ? <SmallText>Bouvet</SmallText>: <TextField value="Bouvet" label="Supplier"/>}
            <>
                {!editMode ? <SmallIconWrapper><img src={Dollar} /> <span>wbs</span></SmallIconWrapper>: <TextField value="some.wbs. 1231123" label="wbs" />}
            </>
            <SmallIconWrapper>
                {!editMode ? <><img src={Lock} /> <span>Unlocked</span></>: <CheckBox style={{color:"#007079"}} checked={checked} onChange={() => setChecked(!checked)}/>}
            </SmallIconWrapper>
            {!editMode ? <Button variant="outlined" onClick={() => setEditMode(true)} style={{width: "50%"}}>Edit</Button>: null}
        </TitleWrapper>
        {!editMode ? 
          <Description>{description}</Description>:
          <TextField multiline={true} onChange={e => setDescriptionOnChange(e.target.value)} label="Description" style={{margin: "auto", marginLeft: "0"}} value={descriptionOnChange} /> }
        <div style={{ margin: 'auto' }}>
          <Dot >SP</Dot>
          {editMode ?
          <>
          <Button variant="outlined" style={{marginBottom: "10px"}}>Change logo</Button> 
          <SaveCancelWrapper>
            
            <Button onClick={() => handleSave()}>Save</Button>
            <Button variant="outlined" onClick={() => handleCancel()}>Cancel</Button>
          </SaveCancelWrapper></>: null}
        </div>
      </Wrapper>
    </div>
  )
}

export default StudyComponentFull;
