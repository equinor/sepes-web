import React, { useState } from 'react';
import { Search, Button, TextField} from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display:grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 32px;
  border-radius: 4px;
  padding: 16px;
  background-color: #ffffff;
`;
type StepBarProps = {
    setStep: (value:any) => void;
    step: number;
};

const StepBar: React.FC<StepBarProps> = ({ step, setStep }) => {

    const returnControlButtons = () => {
        switch(step) {
            case 0: {
                return (
                    <>
                        <Button variant="outlined" onClick={() => { setStep(1)}} style={{ width: '300px' }}>Make available</Button>
                        <Button variant="outlined" color="danger" style={{ width: '300px' }}>Delete sandbox</Button>
                    </>
                );
            }
            case 1: {
                return (
                    <>
                        <Button variant="outlined" onClick={() => { setStep(0)}} style={{ width: '300px' }}>Re-open config</Button>
                        <Button variant="outlined" onClick={() => { setStep(2)}} style={{ width: '300px' }}>Close sandbox</Button>
                    </>
                );
            }
            case 2: {
                return (
                    <>
                        <Button variant="outlined" onClick={() => { setStep(0)}} style={{ width: '300px' }}>Re-open config</Button>
                        <Button variant="outlined" onClick={() => { setStep(1)}} style={{ width: '300px' }}>Re-open execution sandbox</Button>
                    </>
                );
            }
        }
    }
    return (
        <Wrapper>
            Currently on step {step}
            {returnControlButtons()}
        </Wrapper>
    )
}

export default StepBar;
