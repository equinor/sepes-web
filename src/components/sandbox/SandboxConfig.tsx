import React from 'react';
import styled from 'styled-components';
import Dataset from './components/Dataset';
import PolicyComponent from './components/PolicyComponent';
import ResourcesComponent from './components/ResourcesComponent';

const Wrapper = styled.div`
  display:grid;
  grid-template-rows: auto auto;
  grid-gap: 32px;
  border-radius: 4px;
  background-color: #ffffff;
`;

const InfoWrapper = styled.div`
  display:grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 32px;
  border-radius: 4px;
  padding: 16px;
  background-color: #ffffff;
  @media (max-width: 700px) {
    display: block;
  }
`;

const PolictyComponentWrapper = styled.div`
  margin-Right: 86px;
  @media (max-width: 700px) {
    display: block;
    margin-Right: 0px;
  }
`;

type SandboxConfigProps = {
  resources:any;
  datasets:any;
  sandboxId:string;
};

const SandboxConfig: React.FC<SandboxConfigProps> = ({ resources, datasets, sandboxId }) => {

    return (
        <Wrapper>
            <InfoWrapper>
                <Dataset
                  datasets={datasets}
                  sandboxId={sandboxId}
                />
                <PolictyComponentWrapper>
                  <PolicyComponent displayCheckbox />
                </PolictyComponentWrapper>
                <ResourcesComponent resources={resources} />
            </InfoWrapper>
        </Wrapper>
    )
}

export default SandboxConfig;
