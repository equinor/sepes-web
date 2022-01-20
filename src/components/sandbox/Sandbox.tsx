import React, { useState, useContext, useEffect } from 'react';
import StepBar from './StepBar';
import SandboxConfig from './SandboxConfig';
import Execution from './Execution';
import { SandboxObj } from '../common/interfaces';
import VmConfig from './components/VmConfig';
import LoadingFull from '../common/LoadingFullscreen';
import styled from 'styled-components';
import { UpdateCache } from '../../App';
import useFetchUrl from '../common/hooks/useFetchUrl';
import { getSandboxByIdUrl } from '../../services/ApiCallStrings';
import NotFound from '../common/informationalComponents/NotFound';
import { getResourcesList } from '../../services/Api';
import { getStudyId, getSandboxId } from '../../utils/CommonUtil';
import Prompt from 'components/common/Prompt';
import { useDispatch, useSelector } from 'react-redux';
import { setCallResources } from 'store/sandboxes/sandboxesSlice';
import getCallResourcesStatus from 'store/sandboxes/sanboxesSelectors';
import { setResourcesInStore } from 'store/resources/resourcesSlice';

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: auto 4fr;
    grid-gap: 16px;
    margin: 8px 32px 32px 32px;
`;

type SandboxProps = {};

let controller = new AbortController();

const Sandbox: React.FC<SandboxProps> = () => {
    const studyId = getStudyId();
    const sandboxId = getSandboxId();
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
        linkToCostAnalysis: '',
        studyName: '',
        restrictionDisplayText: '',
        permissions: {
            delete: false,
            editInboundRules: false,
            openInternet: false,
            update: false,
            increasePhase: false
        }
    });

    const SandboxResponse = useFetchUrl('sandboxes/' + sandboxId, setSandbox, undefined, undefined, false);
    const [deleteSandboxInProgress, setDeleteSandboxInProgress] = useState<boolean>(false);
    const [vmsWithOpenInternet, setVmsWithOpenInternet] = useState<boolean>(false);
    const [makeAvailableInProgress, setMakeAvailableInProgress] = useState<boolean>(false);
    const [step, setStep] = useState<number | undefined>(
        (SandboxResponse.cache[getSandboxByIdUrl(sandboxId)] &&
            SandboxResponse.cache[getSandboxByIdUrl(sandboxId)].currentPhase) ||
            undefined
    );
    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const callGetResources = useSelector(getCallResourcesStatus());
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            controller.abort();
            controller = new AbortController();
        };
    }, []);

    useEffect(() => {
        if (callGetResources) {
            getResources();
            dispatch(setCallResources(false));
        }
    }, [callGetResources]);

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
        getResourcesList(sandboxId, controller.signal).then((result: any) => {
            if (result && (result.errors || result.message)) {
                console.log('Err');
            } else {
                dispatch(setResourcesInStore(result));
            }
        });
    };

    const setNewPhase = (phase: any) => {
        if (SandboxResponse.cache[getSandboxByIdUrl(sandboxId)]) {
            setStep(phase);
            SandboxResponse.cache[getSandboxByIdUrl(sandboxId)].currentPhase = phase;
        }
    };

    const setNewCostanalysisLink = (link: any) => {
        SandboxResponse.cache[getSandboxByIdUrl(sandboxId)].linkToCostAnalysis = link;
    };

    const returnStepComponent = () => {
        switch (step) {
            case 1:
                return <Execution sandbox={sandbox} />;
            case 2:
                return <div />;
            default:
                return (
                    <SandboxConfig
                        sandboxId={sandboxId}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                        sandbox={sandbox}
                        setSandbox={setSandbox}
                        controller={controller}
                    />
                );
        }
    };

    return (
        <>
            <Prompt hasChanged={hasChanged || SandboxResponse.loading} fallBackAddress={'/studies/' + studyId} />
            {!SandboxResponse.notFound ? (
                step !== undefined ? (
                    <>
                        {SandboxResponse.loading && (
                            <LoadingFull noTimeout={deleteSandboxInProgress || makeAvailableInProgress} />
                        )}
                        <Wrapper>
                            <StepBar
                                sandbox={sandbox}
                                setSandbox={setSandbox}
                                step={step}
                                setStep={setStep}
                                studyId={studyId}
                                sandboxId={sandboxId}
                                setUpdateCache={setUpdateCache}
                                updateCache={updateCache}
                                setLoading={SandboxResponse.setLoading}
                                setNewPhase={setNewPhase}
                                setDeleteSandboxInProgress={setDeleteSandboxInProgress}
                                setNewCostanalysisLink={setNewCostanalysisLink}
                                controller={controller}
                                vmsWithOpenInternet={vmsWithOpenInternet}
                                makeAvailableInProgress={makeAvailableInProgress}
                                setMakeAvailableInProgress={setMakeAvailableInProgress}
                                setHasChanged={setHasChanged}
                            />
                            {returnStepComponent()}
                            {(step === 0 || step === 1) && (
                                <VmConfig
                                    sandbox={sandbox}
                                    setUpdateCache={setUpdateCache}
                                    updateCache={updateCache}
                                    controller={controller}
                                    setVmsWithOpenInternet={setVmsWithOpenInternet}
                                    setHasChanged={setHasChanged}
                                />
                            )}
                        </Wrapper>
                    </>
                ) : (
                    <LoadingFull noTimeout={deleteSandboxInProgress} />
                )
            ) : (
                <NotFound />
            )}
        </>
    );
};

export default Sandbox;
