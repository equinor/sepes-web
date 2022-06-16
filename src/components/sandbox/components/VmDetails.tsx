/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, TextField, Button, Tooltip } from '@equinor/eds-core-react';
import { EquinorIcon } from '../../common/StyledComponents';
import VmProperties from './VmProperties';
import CoreDevDropdown from '../../common/customComponents/Dropdown';
import {
    createVirtualMachineRule,
    getVirtualExternalLink,
    getVirtualMachineExtended,
    getVirtualMachineRule
} from '../../../services/Api';
import { resourceStatus, resourceType } from '../../common/staticValues/types';
import { ButtonEnabledObj, SandboxPermissions } from '../../common/interfaces';
import { checkIfValidIp, checkIfInputIsNumberWihoutCharacters } from '../../common/helpers/helpers';
import '../../../styles/Table.scss';
import {
    checkIfAnyVmRulesHasChanged,
    checkIfSaveIsEnabled,
    returnOpenClosedOutboundRule
} from 'components/common/helpers/sandboxHelpers';
import useKeyEvents from '../../common/hooks/useKeyEvents';
import { useDispatch, useSelector } from 'react-redux';
import { setCallResources } from 'store/sandboxes/sandboxesSlice';
import { getUnsavedChangesValue } from 'store/usersettings/userSettingsSelectors';
import { setHasUnsavedChangesValue } from 'store/usersettings/userSettingsSlice';
import getVirtualMachinesFromStore from 'store/virtualmachines/virtualMachinesSelector';
import {
    updateVirtualMachineExtendedInfo,
    updateVirtualMachineLinkToExternalSystem,
    updateVirtualMachineRules
} from 'store/virtualmachines/virtualMachinesSlice';
import { useGetResourceListQuery } from 'store/resources/resourceApi';
import { getSandboxId } from 'utils/CommonUtil';

const { Body, Row, Cell, Head } = Table;

const Wrapper = styled.div`
    min-height: 400px;
    padding: 32px 16px 16px 16px;
    margin-bottom: 128px;
    display: grid;
    grid-template-columns: 298px 1fr;
    grid-gap: 40px;
    @media (max-width: 700px) {
        display: block;
    }
`;

type VmDetailsProps = {
    vm: any;
    setActiveTab: any;
    index: number;
    permissions: SandboxPermissions;
    setUpdateCache: any;
    updateCache: any;
    setVmSaved: any;
    hasChangedVmRules: any;
    setHasChangedVmRules: any;
};

const ipMethod = [
    { displayValue: 'Current personal IP', key: '1' },
    { displayValue: 'Custom', key: '2' }
];

const ports = {
    HTTP: 80,
    HTTPS: 443
};

const protocolOptions = {
    HTTP: 'HTTP',
    HTTPS: 'HTTPS',
    CUSTOM: 'Custom'
};

const portsOptions = [
    { displayValue: 'HTTP', key: 'HTTP' },
    { displayValue: 'HTTPS', key: 'HTTPS' },
    { displayValue: 'Custom', key: 'Custom' }
];

const numberOfPorts = 65535;

const VmDetails: React.FC<VmDetailsProps> = ({
    vm,
    setActiveTab,
    index,
    permissions,
    setUpdateCache,
    updateCache,
    setVmSaved,
    hasChangedVmRules,
    setHasChangedVmRules
}) => {
    const [clientIp, setClientIp] = useState<string>('');
    const [outboundRuleChanged, setOutboundRuleChanged] = useState<boolean>(false);
    const [saveIsEnabled, setSaveIsEnabled] = useState<ButtonEnabledObj>({ enabled: false, error: '' });
    const dispatch = useDispatch();
    const {data: resources} = useGetResourceListQuery(getSandboxId());
    const vms = useSelector(getVirtualMachinesFromStore());
    const hasUnsavedChanges = useSelector(getUnsavedChangesValue());
    let keyCount: number = 0;

    useEffect(() => {
        getVmExtendedInfo();
    }, [index, vm, resources]);
    useEffect(() => {
        setSaveIsEnabled(checkIfSaveIsEnabled(hasChangedVmRules, vm, saveIsEnabled.error));
    }, [vms]);
    useEffect(() => {
        callGetMyIp();
        getVmRules();
    }, [index]);

    useEffect(() => {
        dispatch(setHasUnsavedChangesValue(checkIfAnyVmRulesHasChanged(hasChangedVmRules)));
    }, [hasChangedVmRules]);

    const getKey = () => {
        const res = keyCount++;
        return res.toString();
    };

    const getVmExtendedInfo = () => {
        if (!vm.extendedInfo && isVmCreatingOrReady()) {
            getVirtualMachineExtended(vm.id).then((result: any) => {
                if (result && !result.message) {
                    dispatch(updateVirtualMachineExtendedInfo({ vmId: vm.id, extendedInfo: result }));
                } else {
                    console.log('Err');
                }
            });
        }
    };

    const getVmRules = () => {
        if (!vm.rules) {
            getVirtualMachineRule(vm.id).then((result: any) => {
                if (result && !result.message) {
                    dispatch(updateVirtualMachineRules({ vmId: vm.id, rules: result }));
                } else {
                    console.log('Err');
                }
            });
        }
    };

    const resetRules = () => {
        setOutboundRuleChanged(false);
        dispatch(setHasUnsavedChangesValue(false));
        updateHasChanged(false);
        getVirtualMachineRule(vm.id).then((result: any) => {
            if (result && !result.message) {
                dispatch(updateVirtualMachineRules({ vmId: vm.id, rules: result }));
            } else {
                console.log('Err');
            }
        });
    };

    const getExternalLink = () => {
        getVirtualExternalLink(vm.id).then((result: any) => {
            if (result && !result.message) {
                dispatch(
                    updateVirtualMachineLinkToExternalSystem({
                        vmId: vm.id,
                        linkToExternalSystem: result.linkToExternalSystem
                    })
                );
            } else {
                console.log('Err');
            }
        });
    };

    const isVmCreatingOrReady = (): boolean => {
        let res = false;
        if (!resources || !Array.isArray(resources)) {
            return res;
        }
        resources.map((resource: any) => {
            if (
                resource.type === resourceType.virtualMachine &&
                resource.status === resourceStatus.ok &&
                resource.name === vm.name
            ) {
                res = true;
                if (!vm.linkToExternalSystem) {
                    getExternalLink();
                }
            }
        });
        return res;
    };

    const updateHasChanged = (_hasChanged: boolean) => {
        const indexHasChanged = hasChangedVmRules.findIndex((x: any) => x.vmId === vm.id);
        const temp: any = [...hasChangedVmRules];
        if (indexHasChanged === -1) {
            temp.push({ vmId: vm.id, hasChanged: _hasChanged });
        } else {
            temp[indexHasChanged].hasChanged = _hasChanged;
        }
        setHasChangedVmRules(temp);
    };

    const checkIfVmRulesHasChanged = () => {
        const indexHasChanged = hasChangedVmRules.findIndex((x: any) => x.vmId === vm.id);
        if (indexHasChanged === -1) {
            return false;
        }
        return hasChangedVmRules[indexHasChanged].hasChanged;
    };

    const addRule = () => {
        dispatch(setHasUnsavedChangesValue(true));
        updateHasChanged(true);
        let currentRules: any = [];
        const vmRules = [...vm.rules];
        if (vmRules && vmRules.length) {
            currentRules = [...vmRules];
        }
        currentRules.push({
            description: '',
            ip: '',
            protocol: 'Custom',
            port: '',
            useClientIp: false,
            direction: 0,
            name: '',
            key: getKey()
        });
        dispatch(updateVirtualMachineRules({ vmId: vm.id, rules: currentRules }));
    };

    const addOutBoundRule = () => {
        updateHasChanged(true);
        setOutboundRuleChanged(true);
        const newRules = vm.rules.map((rule) => {
            if (rule.direction === 1) {
                return { ...rule, action: rule.action === 1 ? 0 : 1 };
            }
            return rule;
        });

        dispatch(updateVirtualMachineRules({ vmId: vm.id, rules: newRules }));
    };

    const saveRule = () => {
        updateHasChanged(false);
        setOutboundRuleChanged(false);
        createVirtualMachineRule(vm.rules, vm.id).then((result: any) => {
            if (result && !result.message) {
                dispatch(updateVirtualMachineRules({ vmId: vm.id, rules: result }));
                dispatch(setCallResources(true));
                setVmSaved(true);
            } else {
                console.log('Err');
            }
        });
    };

    const updateRule = (i: number, value: string, key: string) => {
        updateHasChanged(true);
        const vmRules = vm.rules.map((rule, index) => {
            if (index === i) {
                return { ...rule, [key]: value };
            }

            return rule;
        });
        dispatch(updateVirtualMachineRules({ vmId: vm.id, rules: vmRules }));
    };

    const removeRule = (i: number) => {
        updateHasChanged(true);
        const vmRules: any = [...vm.rules];
        vmRules.splice(i, 1);
        dispatch(updateVirtualMachineRules({ vmId: vm.id, rules: vmRules }));
    };

    const handleDropdownChange = (key: string, i: number, value?): void => {
        updateHasChanged(true);
        const vmRules = vm.rules.map((rule, index) => {
            if (index === i) {
                const port = value === protocolOptions.HTTP ? ports.HTTP : ports.HTTPS;
                return { ...rule, [key]: value, port: port };
            }

            return rule;
        });

        dispatch(updateVirtualMachineRules({ vmId: vm.id, rules: vmRules }));
    };

    const handleDropdownChangeClientIp = (value: any, name: string, ruleIndex): void => {
        updateHasChanged(true);        
        const vmRules = vm.rules.map((rule, index) => {
            if (index === ruleIndex) {               
                const useClientIp = value === '1' ? true: false;
                return { ...rule, [name]: useClientIp, ip: clientIp };
            }
            
            return rule;
        });

        dispatch(updateVirtualMachineRules({ vmId: vm.id, rules: vmRules }));
    };

    const getMyIp = async () => {
        return fetch('https://api.ipify.org?format=json')
            .then((response) => {
                return response.json();
            })
            .then((res: any) => {
                setClientIp(res.ip);
                return res.ip;
            })
            .catch((err: any) => console.error('Problem fetching my IP', err));
    };

    const callGetMyIp = async () => {
        let ip = '';
        let tryCount = 0;
        while (!ip && tryCount < 3) {
            ip = await getMyIp();
            tryCount++;
        }
    };

    useKeyEvents(resetRules, saveRule, true);

    return (
        <>
            <Wrapper>
                <VmProperties
                    vmProperties={vm}
                    setActiveTab={setActiveTab}
                    permissions={permissions}
                    setUpdateCache={setUpdateCache}
                    updateCache={updateCache}
                />
                <div>
                    <Table style={{ width: '100%' }}>
                        <Head>
                            <Row>
                                <Cell scope="col">Inbound rules</Cell>
                                <Cell style={{ width: '220px' }} scope="col" />
                                <Cell style={{ width: '180px' }} scope="col" />
                                <Cell style={{ width: '220px' }} scope="col" />
                                <Cell style={{ width: '100px' }} scope="col" />
                                <Cell scope="col" style={{ width: '24px' }} />
                            </Row>
                        </Head>
                        <Body>
                            {vm.rules && vm.rules.length > 1 ? (
                                vm.rules.map((rule: any, ruleNumber: number) => {
                                    return (
                                        rule.direction === 0 && (
                                            <Row key={getKey()} id="tableRowNoPointerNoColor">
                                                <Cell>
                                                    <TextField
                                                        id={getKey()}
                                                        value={rule.description}
                                                        onChange={(e: any) =>
                                                            updateRule(ruleNumber, e.target.value, 'description')
                                                        }
                                                        placeholder="Description"
                                                        data-cy="vm_rule_description"
                                                        disabled={!permissions.editInboundRules}
                                                        autoComplete="off"
                                                        autoFocus={hasUnsavedChanges}
                                                    />
                                                </Cell>
                                                <Cell>
                                                    <CoreDevDropdown
                                                        options={ipMethod}
                                                        onChange={(e: any) =>
                                                            handleDropdownChangeClientIp(e, 'useClientIp', ruleNumber)
                                                        }
                                                        name="useClientIp"
                                                        tabIndex={0}
                                                        preSelectedValue={'Custom'}
                                                        data-cy="vm_rule_useClientIp"
                                                        disabled={!permissions.editInboundRules}
                                                    />
                                                </Cell>
                                                <Cell>
                                                    {rule.useClientIp ? (
                                                        <span>{rule.ip || 'loading ip..'}</span>
                                                    ) : (
                                                        <Tooltip
                                                            title={
                                                                checkIfValidIp(rule.ip) || rule.ip === ''
                                                                    ? ''
                                                                    : 'This is not a valid ip'
                                                            }
                                                            placement="top"
                                                        >
                                                            <TextField
                                                                id={getKey()}
                                                                autoComplete="off"
                                                                value={rule.ip}
                                                                onChange={(e: any) => {
                                                                    updateRule(ruleNumber, e.target.value, 'ip');
                                                                }}
                                                                placeholder="IP"
                                                                data-cy="vm_rule_ip"
                                                                disabled={!permissions.editInboundRules}
                                                                variant={
                                                                    checkIfValidIp(rule.ip) || rule.ip === ''
                                                                        ? 'default'
                                                                        : 'error'
                                                                }
                                                            />
                                                        </Tooltip>
                                                    )}
                                                </Cell>
                                                <Cell>
                                                    <CoreDevDropdown
                                                        options={portsOptions}
                                                        onChange={(e: any) => {
                                                            handleDropdownChange('protocol', ruleNumber, e);
                                                        }}
                                                        name="protocol"
                                                        preSelectedValue={rule.protocol || 'Custom'}
                                                        data-cy="vm_rule_protocol"
                                                        disabled={!permissions.editInboundRules}
                                                        width="240px"
                                                        tabIndex={1}
                                                    />
                                                </Cell>
                                                <Cell>
                                                    {rule.protocol !== protocolOptions.CUSTOM ? (
                                                        <div style={{ width: '100px', textAlign: 'center' }}>
                                                            <span>{rule.port || '-'}</span>
                                                        </div>
                                                    ) : (
                                                        <Tooltip
                                                            title={
                                                                checkIfInputIsNumberWihoutCharacters(rule.port) ||
                                                                !hasUnsavedChanges
                                                                    ? ''
                                                                    : 'Not a valid port number (0-65535)'
                                                            }
                                                            placement="top"
                                                        >
                                                            <TextField
                                                                id={getKey()}
                                                                autoComplete="off"
                                                                value={rule.port}
                                                                onChange={(e: any) => {
                                                                    let value = e.target.value;
                                                                    if (value <= numberOfPorts && value >= 0) {
                                                                        updateRule(ruleNumber, value, 'port');
                                                                    }
                                                                }}
                                                                type="number"
                                                                placeholder="Port"
                                                                data-cy="vm_rule_port"
                                                                style={{ width: '100px' }}
                                                                disabled={!permissions.editInboundRules}
                                                            />
                                                        </Tooltip>
                                                    )}
                                                </Cell>

                                                <Cell>
                                                    {permissions.editInboundRules && (
                                                        <Button
                                                            variant="ghost_icon"
                                                            onClick={() => removeRule(ruleNumber)}
                                                        >
                                                            {EquinorIcon('clear', '', 24)}
                                                        </Button>
                                                    )}
                                                </Cell>
                                            </Row>
                                        )
                                    );
                                })
                            ) : (
                                <Row id="tableRowNoPointerNoColor">
                                    <Cell style={{ width: '220px' }}>No inbound rules added</Cell>
                                    <Cell />
                                    <Cell />
                                    <Cell />
                                    <Cell />
                                    <Cell />
                                </Row>
                            )}
                        </Body>
                    </Table>
                    <div style={{ float: 'right', margin: '24px 16px 24px 16px' }}>
                        <Tooltip
                            title={
                                permissions.editInboundRules ? '' : 'You do not have permission to add or create rules'
                            }
                            placement="left"
                        >
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    addRule();
                                }}
                                data-cy="vm_add_rule"
                                disabled={!permissions.editInboundRules}
                            >
                                Add rule
                            </Button>
                        </Tooltip>
                    </div>
                    <Table style={{ width: '100%', marginTop: '24px' }}>
                        <Head>
                            <Row id="tableRowNoPointerNoColor">
                                <Cell scope="col">Outbound rules</Cell>
                                <Cell scope="col" />
                            </Row>
                        </Head>
                        <Body>
                            <Row key={1} id="tableRowNoPointerNoColor">
                                <Cell>
                                    {outboundRuleChanged
                                        ? 'Changed outbound internet status to:'
                                        : 'Outbound internet traffic is currently'}{' '}
                                    {returnOpenClosedOutboundRule('text', vm)}
                                </Cell>
                                <Cell>
                                    <Button
                                        variant="outlined"
                                        style={{ float: 'right' }}
                                        data-cy="open_close_internet"
                                        disabled={!permissions.openInternet}
                                        onClick={() => {
                                            addOutBoundRule();
                                        }}
                                    >
                                        {returnOpenClosedOutboundRule('button', vm)}
                                    </Button>
                                </Cell>
                            </Row>
                        </Body>
                    </Table>
                    <div style={{ float: 'right', margin: '24px 16px 24px 16px' }}>
                        <Tooltip
                            title={saveIsEnabled.enabled || !hasUnsavedChanges ? '' : saveIsEnabled.error}
                            placement="left"
                        >
                            <Button
                                onClick={() => {
                                    saveRule();
                                }}
                                disabled={!saveIsEnabled.enabled}
                                data-cy="vm_rule_save"
                            >
                                Save
                            </Button>
                        </Tooltip>
                    </div>
                    <Button
                        variant="outlined"
                        style={{ float: 'right', margin: '24px 0 0 0' }}
                        onClick={() => {
                            resetRules();
                        }}
                        disabled={!checkIfVmRulesHasChanged()}
                        data-cy="vm_rule_cancel"
                    >
                        Cancel
                    </Button>
                </div>
            </Wrapper>
        </>
    );
};

export default VmDetails;
