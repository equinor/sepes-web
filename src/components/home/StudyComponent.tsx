import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Icon } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { lock, lock_open } from '@equinor/eds-icons';
import { getImage } from '../../services/BlobStorage';
import Loading from '../common/LoadingComponent';
import CustomLogoComponent from '../common/CustomLogoComponent';

const icons = {
  lock,
  lock_open
};
Icon.add(icons);

const SmallText = styled.div`
    font-size:10px;
    display:inline-block;
  `;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(125px,350px) minmax(200px,1fr);
    width: 100%;
    grid-gap: 64px;
    border-radius:4px;
    padding: 16px;
    min-width:120px;
    margin: 0 0 16px 32px;
    background-color: #ffffff;
    @media (max-width: 768px) {
      display: block;
      margin: 0 0 16px 0;
  }
  }
`;

const LogoTitleWrapper = styled.div`
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 768px) {
      display: block;
      margin: 0 0 16px 0;
  }
  }
`;

const StudyComponent = (props: any) => {
  const { name, description, restricted, id, vendor } = props.study;
  const url = '/studies/' + id;

  return (
      <Wrapper>
        <LogoTitleWrapper>
          <CustomLogoComponent logoUrl={props.study.logoUrl} />
          <div>
            <Typography variant="h6" ><Link to={url} style={{ color: 'black' }}>{name}</Link></Typography>
            <SmallText>{vendor}</SmallText>
            <div><SmallText>{restricted ? 'Restricted': 'Not restricted'}<Icon color="#007079" name={restricted ? "lock": "lock_open"} size={24} /></SmallText></div>
          </div>
        </LogoTitleWrapper>

        <div>{description}</div>
      </Wrapper>
  )
}

export default StudyComponent;
