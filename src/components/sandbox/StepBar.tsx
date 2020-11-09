import React, { useState } from 'react';
import { Button, Typography } from '@equinor/eds-core-react';
import DeleteResourceComponent from './components/DeleteResourceComponent';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { EquinorIcon } from '../common/StyledComponents';
import { deleteSandbox } from '../../services/Api';
import * as notify from '../common/notify';

const Wrapper = styled.div`
  display:grid;
  grid-template-rows: 64px 1fr;
  grid-gap: 0px;
  border-radius: 4px;
  padding: 16px;
  background-color: #ffffff;
`;

const BtnWrapper = styled.div`
  display:grid;
  grid-template-columns: 200px 200px;
  grid-gap: 16px;

`;
type StepBarProps = {
    setStep: (value:any) => void;
    step: number;
    studyId: string;
    sandboxId: string;
    sandbox: any;
    updateCache:any;
    setUpdateCache:any;
};

  const getSteps = () => {
    return [
        {
            label: 'Config and data sets',
            description: 'Configuration of sandbox, and selection of data sets. Selected data sets affects security policies when they are made available. This is the phase where you have flexibility to set up everything you need',
        },
        {
            label: 'Data sets available',
            description: 'Data sets become available in the sandbox, and you can now work your magic. Data set restrictions are applied.',
        },
        {
            label: 'Data retention',
            description: 'Choose which data should be kept and which should be deleted when decommissioning the sandbox.',
        },
        {
            label: 'Decommission sandbox',
            description: 'Resources shuts down. Data will be removed according to your data retention  choices.',
        }
    ]
  };

const StepBar: React.FC<StepBarProps> = ({ step, setStep, studyId, sandboxId, sandbox, updateCache, setUpdateCache }) => {
    const history = useHistory();
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const steps = getSteps();

    
    const deleteThisSandbox = ():void => {
        setUpdateCache({...updateCache, ['study' + studyId]: true});
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
                    <BtnWrapper>
                        <Button
                            variant="outlined"
                            onClick={() => setUserClickedDelete(true)}
                            color="danger"
                            data-cy="delete_sandbox"
                        >
                            Delete sandbox
                        </Button>
                        <Button
                            onClick={() => { setStep(1)}}
                        >
                            Make available{EquinorIcon('arrow_forward', '#FFFFFF', 16, () => {}, true)}
                        </Button>
                    </BtnWrapper>
                );
            }
            case 1: {
                return (
                    <BtnWrapper>
                        <Button
                            variant="outlined" 
                            onClick={() => { setStep(0)}} 
                        >
                            {EquinorIcon('arrow_back', '#007079', 16, () => {}, true)}Config
                        </Button>
                        <Button
                            onClick={() => { setStep(2)}}
                        >
                            Decommission{EquinorIcon('arrow_forward', '#FFFFFF', 16, () => {}, true)}
                        </Button>
                    </BtnWrapper>
                );
            }
            default: {
                return (
                    <>
                        <Button
                            variant="outlined"
                            onClick={() => { setStep(0)}}
                            style={{ width: '200px', marginRight: '216px' }}
                        >
                            {EquinorIcon('arrow_back', '#007079', 16, () => {}, true)}Make Available
                        </Button>
                    </>
                );
            }
        }
    }
    return (
        <Wrapper>
            <div>
                <Link to={'/studies/' + studyId} 
                    style={{ color: '#007079', fontSize: '22px', margin: '0 0 0 16px' }}>
                        {EquinorIcon('arrow_back', '#007079', 24, () => {}, true)}
                </Link>
                <Typography style={{ display: 'inline-block', marginLeft: '16px' }} variant="h2">{sandbox && sandbox.name}</Typography>
                <div style={{ float: 'right' }}>
                    {returnControlButtons()}
                </div>
            </div>
            <Stepper activeStep={step} alternativeLabel nonLinear>
                {steps.map((stepL:any, index) => {
                    const stepProps = {};
                    const labelProps:any = {};
                    labelProps.optional = <Typography variant="caption">{stepL.description}</Typography>;

                    return (
                        <Step key={index}>
                            <StepLabel {...labelProps}>{stepL.label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {userClickedDelete &&
                <DeleteResourceComponent
                    ResourceName={sandbox.name}
                    setUserClickedDelete={setUserClickedDelete}
                    onClick={deleteThisSandbox}
                    type="sandbox"
                />}
        </Wrapper>
    )
}

export default StepBar;
