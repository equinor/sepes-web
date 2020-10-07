import React, { useState, useEffect } from 'react';
import StepBar from './StepBar';
import SandboxConfig from './SandboxConfig';
import Execution from './Execution';
import { getSandbox, getResourceStatus } from '../../services/Api';
import { SandboxObj } from '../common/interfaces';
import LoadingFull from '../common/LoadingComponentFullscreen';
import * as notify from '../common/notify';
import styled from 'styled-components';

const Wrapper = styled.div`
  display:grid;
  grid-template-rows: auto 4fr;
  grid-gap: 16px;
  margin: 8px 32px 32px 32px;
  padding: 16px;
`;

type SandboxProps = {
};

const Sandbox: React.FC<SandboxProps> = ({ }) => {
    const studyId = window.location.pathname.split('/')[2];
    const sandboxId = window.location.pathname.split('/')[4];
    const [step, setStep] = useState<number>(0);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [sandbox, setSandbox] = useState<SandboxObj>();
    const [resources, setResources] = useState<any>();

    useEffect(() => {
        setIsSubscribed(true);
        getCurrentSandbox();
        getResources();
        let timer:any;
        try {
            timer = setInterval(async () => {
            getResources();
            }, 10000);
          } catch(e) {
            console.log(e);
          }
        return () => {clearInterval(timer); setIsSubscribed(false)};
    }, []);

    const getResources = () => {
        getResourceStatus(studyId, sandboxId).then((result: any) => {
            if (result && !result.Message) {
                console.log("result: ", result);
                setResources(result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
             }
        });
    }

    const getCurrentSandbox = ():void => {
        setLoading(true);
        getSandbox(studyId, sandboxId).then((result: any) => {
            if (result && !result.Message && isSubscribed) {
                console.log("result: ", result);
                setSandbox(result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
             }
             setLoading(false);
        });
    }

    const returnStepComponent = () => {
        switch (step) {
            case 1:
                return <Execution resources={resources} />;
            case 2:
                return <div></div>;
            default:
                return <SandboxConfig resources={resources} />;
        }
    }

    return (
        <Wrapper>
            {loading && <LoadingFull /> }
            <StepBar sandbox={sandbox && sandbox} step={step} setStep={setStep} studyId={studyId} sandboxId={sandboxId} />
            {returnStepComponent()}
        </Wrapper>
    )
}

export default Sandbox;
