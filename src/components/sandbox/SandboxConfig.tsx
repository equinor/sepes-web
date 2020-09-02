import React, { useState } from 'react';
import { Search, Button, TextField} from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Dataset from './components/Dataset';
import PolicyComponent from './components/PolicyComponent';
import ResourcesComponent from './components/ResourcesComponent';
import VmConfig from './components/VmConfig';

const Wrapper = styled.div`
  display:grid;
  grid-template-rows: auto auto;
  grid-gap: 32px;
  border-radius: 4px;
`;

const InfoWrapper = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 32px;
  border-radius: 4px;
  padding: 16px;
  background-color: #ffffff;
  @media (max-width: 700px) {
    display: block;
  }
`;

type SandboxConfigProps = {

};

const SandboxConfig: React.FC<SandboxConfigProps> = ({  }) => {

    return (
        <Wrapper>
            <InfoWrapper>
                <Dataset />
                <PolicyComponent />
                <ResourcesComponent />
            </InfoWrapper>
            <VmConfig showAddNewVm={true} />
        </Wrapper>
    )
}

export default SandboxConfig;
