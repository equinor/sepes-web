import React, { useState, useContext } from 'react';
import StepBar from './StepBar';
import SandboxConfig from './SandboxConfig';
import Execution from './Execution';
import { SandboxObj } from '../common/interfaces';
import VmConfig from './components/VmConfig';
import LoadingFull from '../common/LoadingComponentFullscreen';
import styled from 'styled-components';
import { UpdateCache } from '../../App';
import useFetchUrl from '../common/hooks/useFetchUrl';
import { getDatasetsInStudyUrl, getSandboxByIdUrl } from '../../services/ApiCallStrings';

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: auto 4fr;
    grid-gap: 16px;
    margin: 8px 32px 32px 32px;
    padding: 16px;
`;

type SandboxProps = {};

const Sandbox: React.FC<SandboxProps> = ({}) => {
    const studyId = window.location.pathname.split('/')[2];
    const sandboxId = window.location.pathname.split('/')[4];
    const [step, setStep] = useState<number>(0);
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const [datasets, setDatasets] = useState([]);
    const [sandbox, setSandbox] = useState<SandboxObj>({
        deleted: false,
        region: '',
        resources: [],
        studyId: '',
        technicalContactEmail: '',
        technicalContactName: '',
        name: '',
        template: '',
        id: sandboxId,
        studyName: '',
        permissions: {
            delete: false,
            editRules: false,
            update: false
        }
    });
    const [resources, setResources] = useState<any>();
    const SandboxResponse = useFetchUrl(getSandboxByIdUrl(sandboxId), setSandbox);
    useFetchUrl(getDatasetsInStudyUrl(studyId), setDatasets);
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);

    const returnStepComponent = () => {
        switch (step) {
            case 1:
                return <Execution resources={resources} sandboxId={sandboxId} />;
            case 2:
                return <div></div>;
            default:
                return (
                    <SandboxConfig
                        resources={resources}
                        datasets={datasets}
                        sandboxId={sandboxId}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                        permissions={sandbox.permissions}
                    />
                );
        }
    };

    return (
        <Wrapper>
            {SandboxResponse.loading && <LoadingFull />}
            <StepBar
                sandbox={sandbox && sandbox}
                step={step}
                setStep={setStep}
                studyId={studyId}
                sandboxId={sandboxId}
                setUpdateCache={setUpdateCache}
                updateCache={updateCache}
                setUserClickedDelete={setUserClickedDelete}
                userClickedDelete={userClickedDelete}
                setResources={setResources}
            />
            {returnStepComponent()}
            {(step === 0 || step === 1) && (
                <VmConfig
                    sandbox={sandbox}
                    showAddNewVm={step === 0 && sandbox.permissions.update}
                    resources={resources}
                    loadingSandbox={SandboxResponse.loading}
                    permissions={sandbox.permissions}
                    setUpdateCache={setUpdateCache}
                    updateCache={updateCache}
                />
            )}
        </Wrapper>
    );
};

export default Sandbox;
