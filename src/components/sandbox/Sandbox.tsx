import React, { useState } from 'react';
import { Search, Button, TextField} from '@equinor/eds-core-react';
import StepBar from './StepBar';
import SandboxConfig from './SandboxConfig';
import Execution from './Execution';
import styled from 'styled-components';

const Wrapper = styled.div`
  display:grid;
  grid-template-rows: 1fr 4fr;
  grid-gap: 32px;
  margin: 8px 32px 32px 32px;
  padding: 16px;
`;

type SandboxProps = {
};

const Sandbox: React.FC<SandboxProps> = ({ }) => {
    const [step, setStep] = useState<number>(0);

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
            <StepBar step={step} setStep={setStep} />
            {returnStepComponent()}
        </Wrapper>
    )
}

export default Sandbox;
