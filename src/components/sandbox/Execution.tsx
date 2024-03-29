import React from 'react';
import styled from 'styled-components';
import { EquinorIcon } from '../common/StyledComponents';
import DatasetConfirmed from './components/DatasetsConfirmed';
import { SandboxObj } from '../common/interfaces';
import Policy from './components/Policy';
import Resources from './components/Resources';

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

const SatusWrapper = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 24px 16px 16px 16px;
`;

type ExecutionProps = {
    sandbox: SandboxObj;
};

const Execution: React.FC<ExecutionProps> = ({ sandbox }) => {
    return (
        <Wrapper>
            <SatusWrapper>
                {EquinorIcon('mood_very_happy', '#007079', 24)}
                <div style={{ marginLeft: '8px' }}>Data is now available in storage account</div>
            </SatusWrapper>
            <ResourceWrapper>
                <div>
                    <DatasetConfirmed sandbox={sandbox} />
                </div>
                <div>
                    <Policy sandbox={sandbox} />
                </div>
                <div>
                    <Resources permissions={sandbox.permissions} />
                </div>
            </ResourceWrapper>
        </Wrapper>
    );
};

export default Execution;
