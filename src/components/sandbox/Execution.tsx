import React, { useState } from 'react';
import styled from 'styled-components';
import Dataset from './components/Dataset';
import PolicyComponent from './components/PolicyComponent';
import ResourcesComponent from './components/ResourcesComponent';
import VmConfig from './components/VmConfig';
import { EquinorIcon } from '../common/StyledComponents';
import DatasetConfirmed from './components/DatasetsConfirmed';

const Wrapper = styled.div`
  display:grid;
  grid-template-rows: auto auto;
  grid-gap: 32px;
  border-radius: 4px;
  background-color: #ffffff;
`;

const ResourceWrapper = styled.div`
  display:grid;
  padding: 16px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 32px;
  @media (max-width: 700px) {
    display: block;
  }

`;

type ExecutionProps = {
    resources:any,
    sandboxId
};

const Execution: React.FC<ExecutionProps> = ({ resources, sandboxId }) => {

    return (
        <Wrapper>
            <ResourceWrapper>
                <div>
                    <span>{EquinorIcon('mood_very_happy', '#007079', 24)} Data is now available in storage account</span>
                    <div style={{ marginTop: '8px' }}>
                        <DatasetConfirmed sandboxId={sandboxId} />
                    </div>
                </div>
                <div style={{marginTop: '32px'}}>
                    <PolicyComponent />
                </div>
                <div style={{ marginTop: '32px'}}>
                    <ResourcesComponent resources={resources} />
                </div>
            </ResourceWrapper>
        </Wrapper>
    )
}

export default Execution;
