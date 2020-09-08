import React, { useState, useEffect } from 'react';
import StepBar from './StepBar';
import SandboxConfig from './SandboxConfig';
import Execution from './Execution';
import { getSandbox } from '../../services/Api';
import { SandboxObj } from '../common/interfaces';
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
    const [sandbox, setSandbox] = useState<SandboxObj>();

    useEffect(() => {
        setIsSubscribed(true);
        getCurrentSandbox();
        return () => setIsSubscribed(false);
    }, []);

    const getCurrentSandbox = ():void => {
        getSandbox(studyId, sandboxId).then((result: any) => {
            if (result && !result.Message && isSubscribed) {
                console.log("result: ", result);
                setSandbox(result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
             }
        });
    }

    const returnStepComponent = () => {
        switch (step) {
            case 1:
                return <Execution />
            case 2:
                return <div></div>
            default:
                return <SandboxConfig />
        }
    }

    return (
        <Wrapper>
            <StepBar sandbox={sandbox && sandbox} step={step} setStep={setStep} studyId={studyId} sandboxId={sandboxId} />
            {returnStepComponent()}
        </Wrapper>
    )
}

export default Sandbox;
