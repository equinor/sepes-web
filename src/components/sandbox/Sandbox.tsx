import React, { useState, useContext, useEffect } from 'react';
import StepBar from './StepBar';
import SandboxConfig from './SandboxConfig';
import Execution from './Execution';
import VmConfig from './components/VmConfig';
import styled from 'styled-components';
import { UpdateCache } from '../../App';
import NotFound from '../common/informationalComponents/NotFound';
import { getResourcesList, getSandbox } from '../../services/Api';
import { getStudyId, getSandboxId } from '../../utils/CommonUtil';
import Prompt from 'components/common/Prompt';
import { useDispatch, useSelector } from 'react-redux';
import { setCallResources, setSandboxInStore, setSandboxToInitialState } from 'store/sandboxes/sandboxesSlice';
import { getCallResourcesStatus, getSandboxFromStore } from 'store/sandboxes/sanboxesSelectors';
import { setResourcesInStore } from 'store/resources/resourcesSlice';
import { setScreenLoading } from 'store/screenloading/screenLoadingSlice';
import getScreenLoadingFromStore from 'store/screenloading/screenLoadingSelector';
import LoadingFullScreenNew from 'components/common/LoadingFullScreenNew';

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
    const sandbox = useSelector(getSandboxFromStore());
    const showLoading = useSelector(getScreenLoadingFromStore());
    const [vmsWithOpenInternet, setVmsWithOpenInternet] = useState<boolean>(false);
    const [step, setStep] = useState<number | undefined>((sandbox && sandbox.currentPhase) || undefined);
    const callGetResources = useSelector(getCallResourcesStatus());
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        dispatch(setScreenLoading(true));
        if (!sandbox.id) {
            getSandbox(sandboxId).then((result: any) => {
                dispatch(setScreenLoading(false));
                if (result && !result.message) {
                    dispatch(setSandboxInStore(result));
                } else {
                    setNotFound(true);
                }
            });
        }
    }, [studyId, sandboxId]);

    useEffect(() => {
        return () => {
            controller.abort();
            controller = new AbortController();
            dispatch(setSandboxToInitialState());
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
        } else if (sandbox.currentPhase !== undefined && !showLoading) {
            setNewPhase(sandbox.currentPhase);
        }
    }, [showLoading, sandbox.currentPhase]);

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
        dispatch(setSandboxInStore({ ...sandbox, setNewCostanalysisLink: link }));
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
            <Prompt fallBackAddress={'/studies/' + studyId} />
            {!notFound ? (
                step !== undefined ? (
                    <>
                        <Wrapper>
                            <StepBar
                                step={step}
                                setStep={setStep}
                                studyId={studyId}
                                sandboxId={sandboxId}
                                setNewPhase={setNewPhase}
                                setNewCostanalysisLink={setNewCostanalysisLink}
                                controller={controller}
                                vmsWithOpenInternet={vmsWithOpenInternet}
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
                                />
                            )}
                        </Wrapper>
                    </>
                ) : (
                    ''
                )
            ) : (
                <NotFound />
            )}
            <LoadingFullScreenNew />
        </>
    );
};

export default Sandbox;
