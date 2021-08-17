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
import { SandboxPermissions } from '../../common/interfaces';
import { checkIfValidIp, checkIfInputIsNumberWihoutCharacters } from '../../common/helpers/helpers';
import '../../../styles/Table.scss';
import Prompt from '../../common/Promt';
import { getStudyId } from 'utils/CommonUtil';

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
    setVms: any;
    vms: any;
    setActiveTab: any;
    index: number;
    resources: any;
    getResources: any;
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

const inputErrors = {
    equalRules: 'Two or more rules are equal',
    notAllFieldsFilled: 'Enabled when all fields of rules are filled out',
    notValidIp: 'You entered an invalid IP',
    ok: ''
};

const numberOfPorts = 65535;

const VmDetails: React.FC<VmDetailsProps> = ({
    vm,
    setVms,
    vms,
    setActiveTab,
    index,
    resources,
    permissions,
    setUpdateCache,
    updateCache,
    getResources,
    setVmSaved,
    hasChangedVmRules,
    setHasChangedVmRules
}) => {
    const [clientIp, setClientIp] = useState<string>('');
    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const [outboundRuleChanged, setOutboundRuleChanged] = useState<boolean>(false);
    // const [hasChangedVmRules, setHasChangedVmRules] = useState<any>([]);
    const [inputError, setInputError] = useState<string>(inputErrors.notAllFieldsFilled);
    const studyId = getStudyId();
    let keyCount: number = 0;

    useEffect(() => {
        getVmExtendedInfo();
    }, [index, vm, resources]);
    useEffect(() => {
        callGetMyIp();
        getVmRules();
    }, [index]);

    useEffect(() => {
        checkIfAnyVmRulesHasChanged();
    }, [hasChangedVmRules]);

    const getKey = () => {
        const res = keyCount++;
        return res.toString();
    };

    const getVmExtendedInfo = () => {
        if (!vm.extendedInfo && isVmCreatingOrReady()) {
            getVirtualMachineExtended(vm.id).then((result: any) => {
                if (result && !result.message) {
                    const tempsVms: any = [...vms];
                    tempsVms[index].extendedInfo = result;
                    setVms(tempsVms);
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
                    const tempsVms: any = [...vms];
                    tempsVms[index].rules = result;
                    setVms(tempsVms);
                } else {
                    console.log('Err');
                }
            });
        }
    };

    const resetRules = () => {
        setOutboundRuleChanged(false);
        setHasChanged(false);
        updateHasChanged(false);
        getVirtualMachineRule(vm.id).then((result: any) => {
            if (result && !result.message) {
                const tempsVms: any = [...vms];
                tempsVms[index].rules = result;
                setVms(tempsVms);
            } else {
                console.log('Err');
            }
        });
    };

    const getExternalLink = () => {
        getVirtualExternalLink(vm.id).then((result: any) => {
            if (result && !result.message) {
                const tempsVms: any = [...vms];
                tempsVms[index].linkToExternalSystem = result.linkToExternalSystem;
                setVms(tempsVms);
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

    const checkIfAnyVmRulesHasChanged = () => {
        const indexHasChanged = hasChangedVmRules.filter((x: any) => x.hasChanged === true);
        if (indexHasChanged.length > 0) {
            setHasChanged(true);
        } else {
            setHasChanged(false);
        }
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
        setHasChanged(true);
        updateHasChanged(true);
        let currentRules: any = [];
        if (vm.rules && vm.rules.length) {
            currentRules = [...vm.rules];
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
        const tempsVms: any = [...vms];
        tempsVms[index].rules = currentRules;
        setVms(tempsVms);
    };

    const addOutBoundRule = () => {
        updateHasChanged(true);
        setOutboundRuleChanged(true);
        const newRules: any = [...vm.rules];
        const tempsVms: any = [...vms];
        const outboundRule = newRules.find((rule: any) => rule.direction === 1);
        const indexRule = newRules.indexOf(outboundRule);
        outboundRule.action = outboundRule.action === 1 ? 0 : 1;
        newRules[indexRule] = outboundRule;
        tempsVms[index].rules = newRules;
        setVms(tempsVms);
    };

    const saveRule = (rules: any) => {
        updateHasChanged(false);
        setOutboundRuleChanged(false);
        createVirtualMachineRule(rules, vm.id).then((result: any) => {
            if (result && !result.message) {
                const tempsVms: any = [...vms];
                tempsVms[index].rules = result;
                setVms(tempsVms);
                getResources();
                setVmSaved(true);
            } else {
                console.log('Err');
            }
        });
    };

    const updateRule = (i: number, value: string, key: string) => {
        updateHasChanged(true);
        const currentRules: any = [...vm.rules];
        currentRules[i][key] = value;
        const tempsVms: any = [...vms];
        tempsVms[index].rules = currentRules;
        setVms(tempsVms);
    };

    const removeRule = (i: number) => {
        updateHasChanged(true);
        const currentRules: any = [...vm.rules];
        currentRules.splice(i, 1);
        const tempsVms: any = [...vms];
        tempsVms[index].rules = currentRules;
        setVms(tempsVms);
    };

    const handleDropdownChange = (key: string, i: number, value?): void => {
        updateHasChanged(true);
        const currentRules: any = [...vm.rules];
        currentRules[i][key] = value;
        if (value === protocolOptions.HTTP) {
            currentRules[i].port = ports.HTTP;
        }
        if (value === protocolOptions.HTTPS) {
            currentRules[i].port = ports.HTTPS;
        }
        const tempsVms: any = [...vms];
        tempsVms[index].rules = currentRules;
        setVms(tempsVms);
    };

    const handleDropdownChangeClientIp = (value: any, name: string, ruleIndex): void => {
        updateHasChanged(true);
        const currentRules: any = [...vm.rules];
        if (value === '1') {
            currentRules[ruleIndex][name] = true;
            currentRules[ruleIndex].ip = clientIp;
        } else {
            currentRules[ruleIndex][name] = false;
        }
        const tempsVms: any = [...vms];
        tempsVms[index].rules = currentRules;
        setVms(tempsVms);
    };

    const checkIfEqualRules = (): boolean => {
        if (vm.rules.length < 2) {
            return false;
        }
        for (let i = 1; i < vm.rules.length; i++) {
            for (let j = i + 1; j < vm.rules.length; j++) {
                if (vm.rules[i].ip === vm.rules[j].ip && vm.rules[i].port.toString() === vm.rules[j].port.toString()) {
                    return true;
                }
            }
        }
        return false;
    };

    const checkIfSaveIsEnabled = (): boolean => {
        const hasChangedIndex = hasChangedVmRules.findIndex((x: any) => x.vmId === vm.id);
        if (hasChangedIndex === -1) {
            return false;
        }
        if (!vm.rules || !hasChangedVmRules[hasChangedIndex].hasChanged) {
            return false;
        }

        if (checkIfEqualRules()) {
            if (inputError !== inputErrors.equalRules) {
                setInputError(inputErrors.equalRules);
            }
            return false;
        }

        let enabled = true;
        vm.rules.forEach((rule) => {
            if (!checkIfValidIp(rule.ip) && rule.direction === 0) {
                enabled = false;
            }
            if (rule.direction === 0 && !checkIfInputIsNumberWihoutCharacters(rule.port)) {
                enabled = false;
            }
            if (rule.description === '' || rule.ip === '' || rule.protocol === '' || rule.port === '') {
                enabled = false;
                if (inputError !== inputErrors.notAllFieldsFilled) {
                    setInputError(inputErrors.notAllFieldsFilled);
                }
            }
        });
        return enabled;
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

    const returnOpenClosed = (type: 'text' | 'button') => {
        if (!vm.rules) {
            return;
        }
        const actionRule = vm.rules.find((rule: any) => rule.direction === 1);
        if (actionRule) {
            if (actionRule.action === 0) {
                return type === 'text' ? ' open' : 'Close internet';
            }
            return type === 'text' ? ' closed' : 'Open internet';
        }
    };

    return (
        <>
            <Prompt hasChanged={hasChanged} fallBackAddress={'/studies/' + studyId} />
            <Wrapper>
                <VmProperties
                    vmProperties={vm}
                    setVms={setVms}
                    vms={vms}
                    setActiveTab={setActiveTab}
                    permissions={permissions}
                    setUpdateCache={setUpdateCache}
                    updateCache={updateCache}
                    getResources={getResources}
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
                                                        autoFocus={hasChanged}
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
                                                        preSlectedValue={'Custom'}
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
                                                        preSlectedValue={rule.protocol || 'Custom'}
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
                                                                !hasChanged
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
                                    {returnOpenClosed('text')}
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
                                        {returnOpenClosed('button')}
                                    </Button>
                                </Cell>
                            </Row>
                        </Body>
                    </Table>
                    <div style={{ float: 'right', margin: '24px 16px 24px 16px' }}>
                        <Tooltip title={checkIfSaveIsEnabled() || !hasChanged ? '' : inputError} placement="left">
                            <Button
                                onClick={() => {
                                    saveRule(vm.rules);
                                }}
                                disabled={!checkIfSaveIsEnabled()}
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
