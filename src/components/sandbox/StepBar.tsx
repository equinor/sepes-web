import React, { useState } from 'react';
import { Button, Typography } from '@equinor/eds-core-react';
import { deleteSandbox } from '../../services/Api';
import * as notify from '../common/notify';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 32px;
  border-radius: 4px;
  padding: 16px;
  background-color: #ffffff;
`;
type StepBarProps = {
    setStep: (value:any) => void;
    step: number;
    studyId: string;
    sandboxId: string;
    sandbox: any;
};

const StepBar: React.FC<StepBarProps> = ({ step, setStep, studyId, sandboxId, sandbox }) => {
    const history = useHistory();

    const deleteThisSandbox = ():void => {
        deleteSandbox(studyId, sandboxId).then((result: any) => {
            if (result && !result.Message) {
                history.push('/studies/' + studyId);
                console.log("result: ", result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
             }
        });
    }

    const returnControlButtons = () => {
        switch(step) {
            case 0: {
                return (
                    <>
                        <Button variant="outlined" onClick={() => { setStep(1)}} style={{ width: '300px' }}>Make available</Button>
                        <Button variant="outlined" onClick={deleteThisSandbox} color="danger" style={{ width: '300px' }}>Delete sandbox</Button>
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
            <Typography variant="h2">{sandbox && sandbox.name}</Typography>
            {returnControlButtons()}
        </Wrapper>
    )
}

export default StepBar;
