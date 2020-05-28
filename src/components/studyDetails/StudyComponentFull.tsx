import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Dollar from '../../icons/dollar.svg'
import Lock from '../../icons/lock_off.svg'
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

const IconWrapper = styled.div`
display: grid;
grid-template-columns: 30px 1fr;
`;


//repeat(auto-fit,minmax(100px,1fr));
const StudyComponentFull = (props: any) => {
  return (
    <div style={{ backgroundColor: "white", margin: "20px 20px 0px 20px", display: "flex", borderRadius: "4px", padding: "16px", minWidth: "120px" }}>
      <Wrapper>
        <TitleWrapper>
            <Title>{props.name}</Title>
            <SmallText>Bouvet</SmallText>
            <IconWrapper>
                <img src={Dollar} /> <span>wbs</span>
            </IconWrapper>
            <IconWrapper>
                <img src={Lock} /> <span>Unlocked</span>
            </IconWrapper>
        </TitleWrapper>
        <Description>{props.description}</Description>
        <Dot style={{ margin: 'auto' }}>SP</Dot>
      </Wrapper>
    </div>
  )
}

export default StudyComponentFull;
