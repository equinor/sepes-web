import React from 'react';
import styled from 'styled-components';
import { SandboxObj } from '../common/interfaces';
import Dataset from './components/Dataset';
import Policy from './components/Policy';
import Resources from './components/Resources';

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: auto auto;
    grid-gap: 32px;
    border-radius: 4px;
    background-color: #ffffff;
`;

const InfoWrapper = styled.div`
    display: grid;
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
    margin-right: 86px;
    @media (max-width: 700px) {
        display: block;
        margin-right: 0px;
    }
`;

type SandboxConfigProps = {
    resources: any;
    sandboxId: string;
    updateCache: any;
    setUpdateCache: any;
    setSandbox: any;
    sandbox: SandboxObj;
    controller: AbortController;
};

const SandboxConfig: React.FC<SandboxConfigProps> = ({
    resources,
    sandboxId,
    updateCache,
    setUpdateCache,
    setSandbox,
    sandbox,
    controller
}) => {
    return (
        <Wrapper>
            <InfoWrapper>
                <Dataset
                    sandboxId={sandboxId}
                    updateCache={updateCache}
                    setUpdateCache={setUpdateCache}
                    setSandbox={setSandbox}
                    sandbox={sandbox}
                    controller={controller}
                />
                <PolictyComponentWrapper>
                    <Policy displayCheckbox sandbox={sandbox} />
                </PolictyComponentWrapper>
                <Resources resources={resources} permissions={sandbox.permissions} />
            </InfoWrapper>
        </Wrapper>
    );
};

export default SandboxConfig;
