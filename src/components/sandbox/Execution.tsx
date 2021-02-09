import React from 'react';
import styled from 'styled-components';
import PolicyComponent from './components/PolicyComponent';
import ResourcesComponent from './components/ResourcesComponent';
import { EquinorIcon } from '../common/StyledComponents';
import DatasetConfirmed from './components/DatasetsConfirmed';
import { SandboxObj } from '../common/interfaces';

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 0px auto;
    grid-gap: 32px;
    border-radius: 4px;
    background-color: #ffffff;
`;

const ResourceWrapper = styled.div`
    display: grid;
    padding: 16px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 32px;
    @media (max-width: 700px) {
        display: block;
    }
`;

type ExecutionProps = {
    resources: any;
    sandbox: SandboxObj;
};

const Execution: React.FC<ExecutionProps> = ({ resources, sandbox }) => {
    return (
        <Wrapper>
            <span style={{ padding: '16px' }}>
                {EquinorIcon('mood_very_happy', '#007079', 24)} Data is now available in storage account
            </span>
            <ResourceWrapper>
                <div>
                    <DatasetConfirmed sandbox={sandbox} />
                </div>
                <div>
                    <PolicyComponent sandbox={sandbox} />
                </div>
                <div>
                    <ResourcesComponent resources={resources} />
                </div>
            </ResourceWrapper>
        </Wrapper>
    );
};

export default Execution;
