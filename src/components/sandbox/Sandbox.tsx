import React, { useState, useContext, useEffect } from 'react';
import StepBar from './StepBar';
import SandboxConfig from './SandboxConfig';
import Execution from './Execution';
import VmConfig from './components/VmConfig';
import LoadingFull from '../common/LoadingFullscreen';
import styled from 'styled-components';
import { UpdateCache } from '../../App';
import useFetchUrl from '../common/hooks/useFetchUrl';
import NotFound from '../common/informationalComponents/NotFound';
import { getResourcesList } from '../../services/Api';
import { getStudyId, getSandboxId } from '../../utils/CommonUtil';
import Prompt from 'components/common/Prompt';
import { useDispatch, useSelector } from 'react-redux';
import { setCallResources, setSandboxInStore } from 'store/sandboxes/sandboxesSlice';
import { getCallResourcesStatus, getSandboxFromStore } from 'store/sandboxes/sanboxesSelectors';
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

    const dispatch = useDispatch();
    const SandboxResponse = useFetchUrl(
        'sandboxes/' + sandboxId,
        undefined,
        undefined,
        undefined,
        false,
        dispatch,
        setSandboxInStore
    );

    const sandbox = useSelector(getSandboxFromStore());
    const [deleteSandboxInProgress, setDeleteSandboxInProgress] = useState<boolean>(false);
    const [vmsWithOpenInternet, setVmsWithOpenInternet] = useState<boolean>(false);
    const [makeAvailableInProgress, setMakeAvailableInProgress] = useState<boolean>(false);
    const [step, setStep] = useState<number | undefined>((sandbox && sandbox.currentPhase) || undefined);
    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const callGetResources = useSelector(getCallResourcesStatus());

    useEffect(() => {
        return () => {
            controller.abort();
            controller = new AbortController();
            dispatch(setSandboxInStore({}));
        };
    }, []);

    useEffect(() => {
        if (callGetResources) {
            getResources();
            dispatch(setCallResources(false));
        }
    }, [callGetResources]);

    useEffect(() => {
        if (sandbox && sandbox.currentPhase) {
            setNewPhase(sandbox.currentPhase);
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
        if (sandbox) {
            setStep(phase);
            dispatch(setSandboxInStore({ ...sandbox, currentPhase: phase }));
        }
    };

    const setNewCostanalysisLink = (link: any) => {
        sandbox.linkToCostAnalysis = link;
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
                                step={step}
                                setStep={setStep}
                                studyId={studyId}
                                sandboxId={sandboxId}
                                setLoading={SandboxResponse.setLoading}
                                setNewPhase={setNewPhase}
                                setDeleteSandboxInProgress={setDeleteSandboxInProgress}
                                setNewCostanalysisLink={setNewCostanalysisLink}
                                controller={controller}
                                vmsWithOpenInternet={vmsWithOpenInternet}
                                makeAvailableInProgress={makeAvailableInProgress}
                                setMakeAvailableInProgress={setMakeAvailableInProgress}
                                setHasChanged={setHasChanged}
                                updateCache={updateCache}
                                setUpdateCache={setUpdateCache}
                            />
                            {returnStepComponent()}
                            {(step === 0 || step === 1) && (
                                <VmConfig
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
