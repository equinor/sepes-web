import React, { useState, useContext, useEffect } from 'react';
import StepBar from './StepBar';
import SandboxConfig from './SandboxConfig';
import Execution from './Execution';
import { SandboxObj } from '../common/interfaces';
import VmConfig from './components/VmConfig';
import LoadingFull from '../common/LoadingComponentFullscreen';
import styled from 'styled-components';
import { UpdateCache } from '../../App';
import useFetchUrl from '../common/hooks/useFetchUrl';
import { getSandboxByIdUrl } from '../../services/ApiCallStrings';
import NotFound from '../common/NotFound';
import { getResourceStatus } from '../../services/Api';

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
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const [sandbox, setSandbox] = useState<SandboxObj>({
        deleted: false,
        region: '',
        resources: [],
        datasets: [],
        studyId: '',
        technicalContactEmail: '',
        technicalContactName: '',
        name: '',
        template: '',
        id: sandboxId,
        currentPhase: undefined,
        studyName: '',
        permissions: {
            delete: false,
            editInboundRules: false,
            openInternet: false,
            update: false,
            increasePhase: false
        }
    });

    const [resources, setResources] = useState<any>([]);
    const SandboxResponse = useFetchUrl('sandboxes/' + sandboxId, setSandbox);
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const [step, setStep] = useState<number | undefined>(
        (SandboxResponse.cache[getSandboxByIdUrl(sandboxId)] &&
            SandboxResponse.cache[getSandboxByIdUrl(sandboxId)].currentPhase) ||
            undefined
    );
    useEffect(() => {
        if (
            SandboxResponse.cache[getSandboxByIdUrl(sandboxId)] &&
            SandboxResponse.cache[getSandboxByIdUrl(sandboxId)].currentPhase
        ) {
            setNewPhase(SandboxResponse.cache[getSandboxByIdUrl(sandboxId)].currentPhase);
        } else if (sandbox.currentPhase !== undefined && !SandboxResponse.loading) {
            setNewPhase(sandbox.currentPhase);
        }
    }, [SandboxResponse.loading, sandbox.currentPhase]);

    const getResources = () => {
        getResourceStatus(sandboxId).then((result: any) => {
            if (result && (result.errors || result.Message)) {
                console.log('Err');
            } else {
                setResources(result);
            }
        });
    };

    const setNewPhase = (phase: any) => {
        setStep(phase);
        SandboxResponse.cache[getSandboxByIdUrl(sandboxId)].currentPhase = phase;
    };

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
                        sandboxId={sandboxId}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                        permissions={sandbox.permissions}
                        sandbox={sandbox}
                        setSandbox={setSandbox}
                    />
                );
        }
    };

    return !SandboxResponse.notFound ? (
        step !== undefined ? (
            <Wrapper>
                {SandboxResponse.loading && <LoadingFull />}
                <StepBar
                    sandbox={sandbox && sandbox}
                    setSandbox={setSandbox}
                    step={step}
                    setStep={setStep}
                    studyId={studyId}
                    sandboxId={sandboxId}
                    setUpdateCache={setUpdateCache}
                    updateCache={updateCache}
                    setUserClickedDelete={setUserClickedDelete}
                    userClickedDelete={userClickedDelete}
                    setResources={setResources}
                    setLoading={SandboxResponse.setLoading}
                    setNewPhase={setNewPhase}
                />
                {returnStepComponent()}
                {(step === 0 || step === 1) && (
                    <VmConfig
                        sandbox={sandbox}
                        showAddNewVm={sandbox.permissions && sandbox.permissions.update}
                        resources={resources}
                        getResources={getResources}
                        loadingSandbox={SandboxResponse.loading}
                        permissions={sandbox.permissions}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                    />
                )}
            </Wrapper>
        ) : (
            <LoadingFull />
        )
    ) : (
        <NotFound />
    );
};

export default Sandbox;
