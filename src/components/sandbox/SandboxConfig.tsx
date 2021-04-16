import React from 'react';
import styled from 'styled-components';
import { SandboxObj, SandboxPermissions } from '../common/interfaces';
import Dataset from './components/Dataset';
import PolicyComponent from './components/PolicyComponent';
import ResourcesComponent from './components/ResourcesComponent';

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
    permissions: SandboxPermissions;
    setSandbox: any;
    sandbox: SandboxObj;
    getResources: any;
    controller: AbortController;
};

const SandboxConfig: React.FC<SandboxConfigProps> = ({
    resources,
    sandboxId,
    updateCache,
    setUpdateCache,
    permissions,
    setSandbox,
    sandbox,
    getResources,
    controller
}) => {
    return (
        <Wrapper>
            <InfoWrapper>
                <Dataset
                    sandboxId={sandboxId}
                    updateCache={updateCache}
                    setUpdateCache={setUpdateCache}
                    permissions={permissions}
                    setSandbox={setSandbox}
                    sandbox={sandbox}
                    controller={controller}
                />
                <PolictyComponentWrapper>
                    <PolicyComponent displayCheckbox sandbox={sandbox} />
                </PolictyComponentWrapper>
                <ResourcesComponent resources={resources} getResources={getResources} permissions={permissions} />
            </InfoWrapper>
        </Wrapper>
    );
};

export default SandboxConfig;
