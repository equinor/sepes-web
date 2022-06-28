/*eslint-disable consistent-return, no-shadow, react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Button, Typography, Menu, Tooltip, Icon, Breadcrumbs } from '@equinor/eds-core-react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import DeleteResourceComponent from '../common/customComponents/DeleteResource';
import { EquinorIcon } from '../common/StyledComponents';
import { deleteSandbox, getSandboxCostAnalysis, makeAvailable } from '../../services/Api';
import { getSandboxByIdUrl, getStudyByIdUrl } from '../../services/ApiCallStrings';
import SureToProceed from '../common/customComponents/SureToProceed';
import {
    returnToolTipForMakeAvailable
} from 'components/common/helpers/sandboxHelpers';
import BreadcrumbTruncate from 'components/common/customComponents/infoDisplayComponents/BreadcrumbTruncate';
import { StepBarDescriptions, StepBarLabels } from 'components/common/constants/StepBarTexts';
import { useDispatch, useSelector } from 'react-redux';
import { getSandboxFromStore } from 'store/sandboxes/sanboxesSelectors';
import { setSandboxInStore, setSandboxToInitialState } from 'store/sandboxes/sandboxesSlice';
import { setScreenLoading } from 'store/screenloading/screenLoadingSlice';
import getScreenLoadingFromStore from 'store/screenloading/screenLoadingSelector';
import { setHasUnsavedChangesValue } from 'store/usersettings/userSettingsSlice';
import { ResourceItem, useGetResourceListQuery } from 'store/resources/resourceApi';
import { getSandboxId } from 'utils/CommonUtil';
import { resourceStatus, resourceType } from 'components/common/staticValues/types';

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 64px 1fr;
    grid-gap: 0px;
    border-radius: 4px;
    padding: 16px;
    background-color: #ffffff;
`;

const CostAnalysisWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 32px;
    margin-bottom: -8px;
    color: #007079;
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
    setStep: any;
    step: number;
    studyId: string;
    sandboxId: string;
    setNewPhase: any;
    vmsWithOpenInternet: any;
    updateCache: any;
    setUpdateCache: any;
};

const getSteps = () => {
    return [
        {
            label: StepBarLabels.ConfigAndData,
            description: StepBarDescriptions.ConfigAndData
        },
        {
            label: StepBarLabels.DataSets,
            description: StepBarDescriptions.DataSets
        }
    ];
};

const interval = 20000; //20 seconds

const StepBar: React.FC<StepBarProps> = ({
    step,
    setStep,
    studyId,
    sandboxId,
    setNewPhase,
    vmsWithOpenInternet,
    updateCache,
    setUpdateCache
}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const steps = getSteps();
    const [userClickedMakeAvailable, setUserClickedMakeAvailable] = useState<boolean>(false);
    const [allResourcesOk, setAllResourcesOk] = useState<boolean>(false);
    const [sandboxHasVm, setSandboxHasVm] = useState<boolean>(false);
    const [anyVmWithOpenInternet, setAnyVmWithOpenInternet] = useState<boolean>(false);
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const sandbox = useSelector(getSandboxFromStore());
    const showLoading = useSelector(getScreenLoadingFromStore());
    const [pollingInterval, setPollingInterval] = useState(interval);
    const { data: resources } = useGetResourceListQuery(getSandboxId(), { pollingInterval });

    useEffect(() => {
        if (resources?.length) {
            updateResourceStatus(resources);
        }
    }, [resources]);

    const updateResourceStatus = (resources: ResourceItem[]): void => {
        let res = true;
        let hasVm = false;
        let noOpenInternet = true;
        let hasFailed = false;
        resources.forEach((resource: ResourceItem) => {
            if (resource.status?.includes(resourceStatus.failed)) {
                if (resource.status.includes('/')) {
                    const [firstString, secondString] = resource.status.split('/');
                    const attempts = +firstString[firstString.length - 1];
                    const maxAttempts = +secondString[0];
                    if (attempts >= maxAttempts) {
                        hasFailed = true;
                    }
                } else {
                    hasFailed = true;
                }
            }
            if (resource.status !== resourceStatus.ok) {
                res = false;
            }
            if (resource.type === resourceType.virtualMachine) {
                hasVm = true;
                if (resource.additionalProperties && resource.additionalProperties.InternetIsOpen) {
                    noOpenInternet = false;
                }
            }
            if (resource.type === resourceType.resourceGroup && sandbox.linkToCostAnalysis === null) {
                getSandboxCostAnalysis(sandbox.id).then((result: any) => {
                    if (result && !result.message) {
                        dispatch(setSandboxInStore({ ...sandbox, linkToCostAnalysis: result }));
                    }
                });
            }
        });
        const isAllResourcesOk = res && hasVm && noOpenInternet;
        const pollingInterval = isAllResourcesOk || hasFailed ? 0 : interval;
        console.log('setting interval: ', pollingInterval);
        setPollingInterval(pollingInterval);
        setAnyVmWithOpenInternet(!noOpenInternet);
        setSandboxHasVm(hasVm);
        setAllResourcesOk(isAllResourcesOk);
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
        dispatch(setHasUnsavedChangesValue(false));
        setUserClickedDelete(false);
        dispatch(setScreenLoading(true));
        setUpdateCache({ ...updateCache, [getStudyByIdUrl(studyId)]: true });
        setPollingInterval(0);
        deleteSandbox(sandboxId).then(() => {
            dispatch(setScreenLoading(false));
            dispatch(setSandboxToInitialState());
            history.push('/studies/' + studyId);
        });
    };

    const makeThisSandboxAvailable = (): void => {
        setUserClickedMakeAvailable(false);
        setUpdateCache({ ...updateCache, [getSandboxByIdUrl(sandboxId)]: true });
        dispatch(setScreenLoading(true));
        makeAvailable(sandboxId).then((result: any) => {
            dispatch(setScreenLoading(false));
            if (result.message || result.errors) {
                setNewPhase(0);
            } else {
                dispatch(
                    setSandboxInStore({
                        ...sandbox,
                        datasets: result.datasets,
                        permissions: result.permissions
                    })
                );
                setNewPhase(1);
            }
        });
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
            >
                <Menu.Item
                    onClick={() => setUserClickedDelete(true)}
                    data-cy="sandbox_delete"
                    disabled={sandbox.permissions && !sandbox.permissions.delete}
                    data-testid="delete_sandbox"
                >
                    {EquinorIcon('delete_forever', 'red', 24)}
                    <span style={{ color: 'red' }}>Delete sandbox</span>
                </Menu.Item>
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
                    <span style={{ marginLeft: '8px', marginRight: '4px' }}>More options</span>
                    {EquinorIcon('more_vertical', '#007079', 24)}
                </Button>
                <Menu
                    id="menuButton"
                    aria-labelledby="menuButton"
                    open={isOpen}
                    onClose={closeMenu}
                    anchorEl={buttonEl}
                    focus={focus}
                    placement="bottom-end"
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
                            <Tooltip
                                title={returnToolTipForMakeAvailable(
                                    sandbox,
                                    sandboxHasVm,
                                    anyVmWithOpenInternet,
                                    allResourcesOk
                                )}
                                placement="left"
                            >
                                <Button
                                    onClick={() => {
                                        setUserClickedMakeAvailable(true);
                                    }}
                                    data-cy="sandbox_make_available"
                                    data-testid="make_available"
                                    style={{ width: '160px' }}
                                    disabled={
                                        !(
                                            sandbox.permissions &&
                                            sandbox.permissions.increasePhase &&
                                            sandbox.datasets.length > 0 &&
                                            !showLoading &&
                                            allResourcesOk &&
                                            !vmsWithOpenInternet
                                        )
                                    }
                                >
                                    <span style={{ marginLeft: '0' }}>Make available</span>
                                    {EquinorIcon('chevron_right', '#FFFFFF', 24, () => { }, true)}
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
                            {EquinorIcon('chevron_left', '#007079', 16, () => { }, true)}Make Available
                        </Button>
                        {returnOptionsButton()}
                    </BtnTwoWrapper>
                );
            }
        }
    };
    return (
        <Wrapper>
            <div style={{ display: 'flex' }}>
                <Breadcrumbs>
                    <BreadcrumbTruncate breadcrumbText={sandbox.studyName} link={'/studies/' + studyId} />
                    <BreadcrumbTruncate breadcrumbText={sandbox.name} />
                </Breadcrumbs>
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
                        {sandbox.linkToCostAnalysis && (
                            <CostAnalysisWrapper>
                                <Typography
                                    style={{
                                        display: 'inline-block',
                                        marginTop: '4px',
                                        fontSize: '16px'
                                    }}
                                    variant="h2"
                                    color="#007079"
                                >
                                    Cost analysis
                                </Typography>
                                <Icon
                                    style={{ marginLeft: '12px' }}
                                    color="#007079"
                                    name="external_link"
                                    size={24}
                                    title="external_link"
                                />
                            </CostAnalysisWrapper>
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
    );
};

export default StepBar;
