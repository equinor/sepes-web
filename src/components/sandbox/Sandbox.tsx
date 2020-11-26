import React, { useState, useEffect, useContext } from 'react';
import StepBar from './StepBar';
import SandboxConfig from './SandboxConfig';
import Execution from './Execution';
import { getSandbox, getResourceStatus, getDatasetsForStudy, getDatasetForSandbox } from '../../services/Api';
import { SandboxObj } from '../common/interfaces';
import VmConfig from './components/VmConfig';
import LoadingFull from '../common/LoadingComponentFullscreen';
import * as notify from '../common/notify';
import styled from 'styled-components';
import useFetch from '../common/hooks/useFetch';
import { UpdateCache } from '../../App';

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
    const [step, setStep] = useState<number>(0);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const [datasets, setDatasets] = useState([]);
    const [sandbox, setSandbox] = useState<SandboxObj>({
        deleted: false,
        region: '',
        resources: [],
        studyId: '',
        technicalContactEmail: '',
        technicalContactName: '',
        name: '',
        template: '',
        id: sandboxId,
        studyName: '',
        permissions: {
            delete: false,
            editRules: false,
            update: false
        }
    });
    const [resources, setResources] = useState<any>();
    const { loading } = useFetch(getSandbox, setSandbox, 'sandbox' + sandboxId, studyId, sandboxId);
    useFetch(getDatasetsForStudy, setDatasets, null, studyId);

    useEffect(() => {
        setIsSubscribed(true);
        getResources();
        let timer: any;
        try {
            timer = setInterval(async () => {
                getResources();
            }, 20000);
        } catch (e) {
            console.log(e);
        }
        return () => {
            clearInterval(timer);
            setIsSubscribed(false);
        };
    }, []);

    const getResources = () => {
        getResourceStatus(studyId, sandboxId).then((result: any) => {
            if (result && !result.Message) {
                setResources(result);
            } else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log('Err');
            }
        });
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
                        datasets={datasets}
                        sandboxId={sandboxId}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                        permissions={sandbox.permissions}
                    />
                );
        }
    };

    return (
        <Wrapper>
            {loading && <LoadingFull />}
            <StepBar
                sandbox={sandbox && sandbox}
                step={step}
                setStep={setStep}
                studyId={studyId}
                sandboxId={sandboxId}
                setUpdateCache={setUpdateCache}
                updateCache={updateCache}
            />
            {returnStepComponent()}
            {(step === 0 || step === 1) && (
                <VmConfig
                    sandbox={sandbox}
                    showAddNewVm={step === 0 && sandbox.permissions.update}
                    resources={resources}
                    loadingSandbox={loading}
                    permissions={sandbox.permissions}
                />
            )}
        </Wrapper>
    );
};

export default Sandbox;
