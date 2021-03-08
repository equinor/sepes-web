import React, { useEffect, useState } from 'react';
import { Button, Typography, Menu, DotProgress, Tooltip, Icon } from '@equinor/eds-core-react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import DeleteResourceComponent from '../common/customComponents/DeleteResourceComponent';
import { EquinorIcon } from '../common/StyledComponents';
import { deleteSandbox, getResourceStatus, makeAvailable, getSandboxCostAnalysis } from '../../services/Api';
import * as notify from '../common/notify';
import { SandboxObj } from '../common/interfaces';
import { getSandboxByIdUrl, getStudyByIdUrl } from '../../services/ApiCallStrings';
import SureToProceed from '../common/customComponents/SureToProceed';
import { resourceStatus, resourceType } from '../common/staticValues/types';
import LoadingFull from '../common/LoadingComponentFullscreen';
let set = require('lodash/set');

const { MenuItem } = Menu;

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 64px 1fr;
    grid-gap: 0px;
    border-radius: 4px;
    padding: 16px;
    background-color: #ffffff;
`;

const BtnTwoWrapper = styled.div`
    display: grid;
    grid-template-columns: 160px 160px;
    grid-gap: 8px;
`;
/*
const BtnThreeWrapper = styled.div`
    display: grid;
    grid-template-columns: 160px 160px 160px;
    grid-gap: 8px;
`;*/

type StepBarProps = {
    setStep: (value: any) => void;
    step: number;
    studyId: string;
    sandboxId: string;
    sandbox: SandboxObj;
    setSandbox: any;
    updateCache: any;
    setUpdateCache: any;
    userClickedDelete: any;
    setUserClickedDelete: any;
    setResources: any;
    setLoading: any;
    setNewPhase: any;
    setDeleteSandboxInProgress: any;
    setNewCostanalysisLink: any;
    controller: AbortController;
    vmsWithOpenInternet: any;
};

const getSteps = () => {
    return [
        {
            label: 'Config and data sets',
            description:
                'Configuration of sandbox, and selection of data sets. Selected data sets affects security policies when they are made available. This is the phase where you have flexibility to set up everything you need'
        },
        {
            label: 'Data sets available',
            description:
                'Data sets become available in the sandbox, and you can now work your magic. Data set restrictions are applied.'
        }
    ];
};
/*
,
        {
            label: 'Data retention',
            description:
                'Choose which data should be kept and which should be deleted when decommissioning the sandbox.'
        },
        {
            label: 'Decommission sandbox',
            description: 'Resources shuts down. Data will be removed according to your data retention  choices.'
        }
*/

let resourcesFailed = false;
const interval = 20000; //20 seconds

const StepBar: React.FC<StepBarProps> = ({
    step,
    setStep,
    studyId,
    sandboxId,
    sandbox,
    setSandbox,
    updateCache,
    setUpdateCache,
    setResources,
    userClickedDelete,
    setUserClickedDelete,
    setLoading,
    setNewPhase,
    setDeleteSandboxInProgress,
    setNewCostanalysisLink,
    controller,
    vmsWithOpenInternet
}) => {
    const history = useHistory();
    const steps = getSteps();
    const [userClickedMakeAvailable, setUserClickedMakeAvailable] = useState<boolean>(false);
    const [makeAvailableInProgress, setMakeAvailableInProgress] = useState<boolean>(false);
    const [allResourcesOk, setAllResourcesOk] = useState<boolean>(false);

    useEffect(() => {
        getResources();
        let timer: any;
        try {
            timer = setInterval(async () => {
                if (!userClickedDelete && !resourcesFailed) {
                    getResources();
                }
            }, interval);
        } catch (e) {
            console.log(e);
        }
        return () => {
            clearInterval(timer);
            resourcesFailed = false;
        };
    }, [userClickedDelete]);

    const getResources = () => {
        getResourceStatus(sandboxId, controller.signal).then((result: any) => {
            if (result && (result.errors || result.Message)) {
                resourcesFailed = true;
                notify.show('danger', '500', result);
                console.log('Err');
            } else {
                setResources(result);
                allResourcesStatusOkAndAtleastOneVm(result);
            }
        });
    };

    const allResourcesStatusOkAndAtleastOneVm = (resourcesIn) => {
        let res = true;
        if (!resourcesIn) {
            return res;
        }
        let hasVm = false;
        resourcesIn.map((resource: any, i: number) => {
            if (resource.status !== resourceStatus.ok) {
                res = false;
            }
            if (resource.type === resourceType.virtualMachine) {
                hasVm = true;
            }
            if (resource.type === resourceType.resourceGroup && sandbox.linkToCostAnalysis === null) {
                getCostAnalysisLinkToSandbox();
            }
        });
        setAllResourcesOk(res && hasVm);
    };

    const getCostAnalysisLinkToSandbox = () => {
        getSandboxCostAnalysis(sandboxId).then((result: any) => {
            if (result && result.Message) {
                notify.show('danger', '500', result);
            } else {
                setNewCostanalysisLink(result);
                setSandbox({ ...sandbox, linkToCostAnalysis: result });
            }
        });
    };

    const [state, setState] = React.useState<{
        buttonEl: any;
        focus: 'first' | 'last';
    }>({
        focus: 'first',
        buttonEl: null
    });
    const { buttonEl, focus } = state;
    const isOpen = Boolean(buttonEl);

    const openMenu = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>,
        focus: 'first' | 'last'
    ) => {
        const target = e.target as HTMLButtonElement;
        setState({ ...state, buttonEl: target, focus });
    };

    const closeMenu = () => {
        setState({ ...state, buttonEl: null, focus });
    };

    const deleteThisSandbox = (): void => {
        setDeleteSandboxInProgress(true);
        setUserClickedDelete(false);
        setLoading(true);
        setUpdateCache({ ...updateCache, [getStudyByIdUrl(studyId)]: true });
        deleteSandbox(sandboxId).then((result: any) => {
            setLoading(false);
            if (result && result.Message) {
                setDeleteSandboxInProgress(false);
                notify.show('danger', '500', result);
            }
            history.push('/studies/' + studyId);
        });
    };

    const makeThisSandboxAvailable = (): void => {
        setUserClickedMakeAvailable(false);
        setUpdateCache({ ...updateCache, [getSandboxByIdUrl(sandboxId)]: true });
        setMakeAvailableInProgress(true);
        makeAvailable(sandboxId).then((result: any) => {
            setMakeAvailableInProgress(false);
            if (result.Message || result.errors) {
                setNewPhase(0);
                notify.show('danger', '500', result);
            } else {
                setSandbox(set({ ...sandbox }, 'permissions.openInternet', result.permissions.openInternet));
                setSandbox(set({ ...sandbox }, 'datasets', result.datasets));
                setNewPhase(1);
            }
        });
    };

    const returnToolTipForMakeAvailable = (): string => {
        if (sandbox.permissions && !sandbox.permissions.increasePhase) {
            return 'You do not have permission to make this sandbox Available';
        }
        if (!allResourcesOk || sandbox.datasets.length === 0) {
            return 'All resources must have status OK and atleast one VM and Data set must be in the sandbox';
        }
        return '';
    };

    const optionsTemplate = (
        <>
            <Tooltip
                title={
                    sandbox.permissions && !sandbox.permissions.delete
                        ? 'You do not have access to delete this sandbox'
                        : ''
                }
                placement="left"
                open={sandbox.permissions && !sandbox.permissions.delete}
            >
                <MenuItem
                    onClick={() => setUserClickedDelete(true)}
                    data-cy="sandbox_delete"
                    disabled={sandbox.permissions && !sandbox.permissions.delete}
                >
                    {EquinorIcon('delete_forever', 'red', 24)}
                    <span style={{ color: 'red' }}>Delete sandbox</span>
                </MenuItem>
            </Tooltip>
        </>
    );

    const returnOptionsButton = () => {
        return (
            <>
                <Button
                    variant="outlined"
                    id="menuButton"
                    aria-controls="menu-on-button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={(e) => (isOpen ? closeMenu() : openMenu(e, 'first'))}
                    data-cy="sandbox_more_options"
                >
                    <span style={{ marginLeft: '0' }}>More options</span>
                    {EquinorIcon('more_vertical', '#007079', 24)}
                </Button>
                <Menu
                    id="menuButton"
                    aria-labelledby="menuButton"
                    open={isOpen}
                    onClose={closeMenu}
                    anchorEl={buttonEl}
                    focus={focus}
                >
                    {optionsTemplate}
                </Menu>
            </>
        );
    };

    const returnControlButtons = () => {
        switch (step) {
            case 0: {
                return (
                    <BtnTwoWrapper>
                        {returnOptionsButton()}
                        <div>
                            <Tooltip title={returnToolTipForMakeAvailable()} placement="left">
                                <Button
                                    onClick={() => {
                                        setUserClickedMakeAvailable(true);
                                    }}
                                    data-cy="sandbox_make_available"
                                    style={{ width: '160px' }}
                                    disabled={
                                        !(
                                            sandbox.permissions &&
                                            sandbox.permissions.increasePhase &&
                                            sandbox.datasets.length > 0 &&
                                            !makeAvailableInProgress &&
                                            allResourcesOk &&
                                            !vmsWithOpenInternet
                                        )
                                    }
                                >
                                    <span style={{ marginLeft: '0' }}>Make available</span>
                                    {EquinorIcon('chevron_right', '#FFFFFF', 24, () => {}, true)}
                                </Button>
                            </Tooltip>
                        </div>
                    </BtnTwoWrapper>
                );
            }
            case 1: {
                return (
                    <BtnTwoWrapper>
                        {/*}
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setStep(0);
                            }}
                        >
                            {EquinorIcon('arrow_back', '#007079', 16, () => {}, true)}Config
                        </Button>
                        */}
                        {returnOptionsButton()}
                        {/* 
                        <Button
                            onClick={() => {
                                setStep(2);
                            }}
                        >
                            Decommission{EquinorIcon('arrow_forward', '#FFFFFF', 16, () => {}, true)}
                        </Button>
                        */}
                    </BtnTwoWrapper>
                );
            }
            default: {
                return (
                    <BtnTwoWrapper>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setStep(0);
                            }}
                        >
                            {EquinorIcon('chevron_left', '#007079', 16, () => {}, true)}Make Available
                        </Button>
                        {returnOptionsButton()}
                    </BtnTwoWrapper>
                );
            }
        }
    };
    return (
        <>
            {makeAvailableInProgress && <LoadingFull noTimeout />}
            <Wrapper>
                <div style={{ display: 'flex' }}>
                    <Link to={'/studies/' + studyId} style={{ color: '#007079', fontSize: '22px' }}>
                        <Button variant="ghost_icon">
                            <Icon
                                style={{ marginBottom: '' }}
                                color="#007079"
                                name="chevron_left"
                                size={24}
                                title="chevron_left"
                            />
                        </Button>
                    </Link>
                    <Typography style={{ display: 'inline-block', marginLeft: '8px' }} variant="h2">
                        {sandbox && sandbox.name}
                    </Typography>
                    <div style={{ marginLeft: 'auto' }}>{returnControlButtons()}</div>
                </div>
                <Stepper activeStep={step} alternativeLabel nonLinear color="red">
                    {steps.map((stepL: any, index) => {
                        const labelProps: any = {};
                        labelProps.optional = <Typography variant="caption">{stepL.description}</Typography>;

                        return (
                            <Step key={index} style={{ padding: '0 96px 0 96px' }}>
                                <StepLabel {...labelProps}>
                                    <span style={{ textAlign: 'center' }}>{stepL.label}</span>
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                <div style={{ marginLeft: 'auto' }}>
                    <Tooltip
                        title={sandbox.linkToCostAnalysis ? '' : 'Link will be available when resource group is ready'}
                        placement="left"
                    >
                        <a
                            href={sandbox.linkToCostAnalysis}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: '#007079',
                                fontSize: '22px',
                                margin: '0 0 0 16px',
                                display: 'inline-block',
                                float: 'right'
                            }}
                        >
                            <Typography
                                style={{ display: 'inline-block', marginRight: '8px', fontSize: '16px' }}
                                variant="h2"
                            >
                                Cost analysis
                            </Typography>
                            {sandbox.linkToCostAnalysis ? (
                                EquinorIcon('external_link', '#007079', 24, () => {}, true)
                            ) : (
                                <DotProgress color="primary" />
                            )}
                        </a>
                    </Tooltip>
                </div>
                {userClickedDelete && (
                    <DeleteResourceComponent
                        ResourceName={sandbox.name}
                        setUserClickedDelete={setUserClickedDelete}
                        onClick={deleteThisSandbox}
                        type="sandbox"
                    />
                )}
                {userClickedMakeAvailable && (
                    <SureToProceed
                        setUserClickedButton={setUserClickedMakeAvailable}
                        onClick={makeThisSandboxAvailable}
                        type="making the selected data sets available to this sandbox"
                    />
                )}
            </Wrapper>
        </>
    );
};

export default StepBar;
