import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, TextField, Button } from '@equinor/eds-core-react';
import { EquinorIcon } from '../../common/StyledComponents';
import VmProperties from './VmProperties';
import CoreDevDropdown from '../../common/customComponents/Dropdown';
import {
    createVirtualMachineRule,
    getVirtualExternalLink,
    getVirtualMachineExtended,
    getVirtualMachineRule
} from '../../../services/Api';
import * as notify from '../../common/notify';
import { resourceStatus, resourceType } from '../../common/types';
import { SandboxPermissions } from '../../common/interfaces';
const { Body, Row, Cell, Head } = Table;

const Wrapper = styled.div`
    min-height: 400px;
    padding: 16px;
    margin-bottom: 128px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 16px;
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
    permissions: SandboxPermissions;
};

const ipMethod = [
    { displayValue: 'current personal IP', key: '1' },
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

const VmDetails: React.FC<VmDetailsProps> = ({ vm, setVms, vms, setActiveTab, index, resources, permissions }) => {
    const [clientIp, setClientIp] = useState<string>('');
    const [hasChanged, setHasChanged] = useState<boolean>(false);

    useEffect(() => {
        getVmExtendedInfo();
    }, [index, vm, resources]);
    useEffect(() => {
        getMyIp();
        getVmRules();
    }, [index]);

    const getVmExtendedInfo = () => {
        if (!vm.extendedInfo && isVmCreatingOrReady()) {
            getVirtualMachineExtended(vm.id).then((result: any) => {
                if (result && !result.Message) {
                    let tempsVms: any = [...vms];
                    tempsVms[index].extendedInfo = result;
                    setVms(tempsVms);
                } else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
            });
        }
    };

    const getVmRules = () => {
        if (!vm.rules) {
            getVirtualMachineRule(vm.id).then((result: any) => {
                if (result && !result.Message) {
                    let tempsVms: any = [...vms];
                    tempsVms[index].rules = result;
                    setVms(tempsVms);
                } else {
                    //notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
            });
        }
    };

    const resetRules = () => {
        setHasChanged(false);
        getVirtualMachineRule(vm.id).then((result: any) => {
            if (result && !result.Message) {
                let tempsVms: any = [...vms];
                tempsVms[index].rules = result;
                setVms(tempsVms);
            } else {
                console.log('Err');
            }
        });
    };

    const getExternalLink = () => {
        getVirtualExternalLink(vm.id).then((result: any) => {
            if (result && !result.Message) {
                let tempsVms: any = [...vms];
                tempsVms[index].linkToExternalSystem = result.linkToExternalSystem;
                setVms(tempsVms);
            } else {
                console.log('Err');
            }
        });
    };

    const isVmCreatingOrReady = (): boolean => {
        let res = false;
        if (!resources) {
            return res;
        }
        resources.map((resource: any, i: number) => {
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

    const addRule = () => {
        setHasChanged(true);
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
            name: ''
        });
        let tempsVms: any = [...vms];
        tempsVms[index].rules = currentRules;
        setVms(tempsVms);
    };

    const addOutBoundRule = () => {
        setHasChanged(true);
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
        setHasChanged(false);
        createVirtualMachineRule(rules, vm.id).then((result: any) => {
            if (result && !result.Message) {
                const tempsVms: any = [...vms];
                tempsVms[index].rules = result;
                setVms(tempsVms);
            } else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log('Err');
            }
        });
    };

    const updateRule = (i: number, value: string, key: string) => {
        setHasChanged(true);
        let currentRules: any = [...vm.rules];
        currentRules[i][key] = value;
        let tempsVms: any = [...vms];
        tempsVms[index].rules = currentRules;
        console.log(vms[index].rules);
        setVms(tempsVms);
    };

    const removeRule = (i: number) => {
        setHasChanged(true);
        let currentRules: any = [...vm.rules];
        currentRules.splice(i, 1);
        let tempsVms: any = [...vms];
        tempsVms[index].rules = currentRules;
        setVms(tempsVms);
    };

    const handleDropdownChange = (key: string, i: number, value?): void => {
        setHasChanged(true);
        let currentRules: any = [...vm.rules];
        currentRules[i][key] = value;
        if (value === protocolOptions.HTTP) {
            currentRules[i].port = ports.HTTP;
        }
        if (value === protocolOptions.HTTPS) {
            currentRules[i].port = ports.HTTPS;
        }
        let tempsVms: any = [...vms];
        tempsVms[index].rules = currentRules;
        setVms(tempsVms);
    };

    const handleDropdownChangeClientIp = (value: any, name: string, ruleIndex): void => {
        setHasChanged(true);
        let currentRules: any = [...vm.rules];
        if (value === '1') {
            currentRules[ruleIndex][name] = true;
            currentRules[ruleIndex].ip = clientIp;
        } else {
            currentRules[ruleIndex][name] = false;
        }
        let tempsVms: any = [...vms];
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
        if (!vm.rules || !hasChanged) {
            return false;
        }
        if (checkIfEqualRules()) {
            return false;
        }
        let enabled = true;
        vm.rules.forEach((rule) => {
            if (rule.description === '' || rule.ip === '' || rule.protocol === '' || rule.port === '') {
                enabled = false;
            }
        });
        return enabled;
    };

    const getMyIp = () => {
        fetch('https://api.ipify.org?format=json')
            .then((response) => {
                return response.json();
            })
            .then((res: any) => {
                setClientIp(res.ip);
            })
            .catch((err: any) => console.error('Problem fetching my IP', err));
    };

    const returnOpenClosed = (type: 'text' | 'button') => {
        if (!vm.rules) {
            return;
        }
        const actionRule = vm.rules.find((rule: any) => rule.direction === 1);
        if (actionRule) {
            if (actionRule.action === 0) {
                return type === 'text' ? ' open' : 'Close internet';
            } else {
                return type === 'text' ? ' closed' : 'Open internet';
            }
        }
    };

    return (
        <Wrapper>
            <VmProperties
                vmProperties={vm}
                setVms={setVms}
                vms={vms}
                setActiveTab={setActiveTab}
                permissions={permissions}
            />
            <div>
                <Table style={{ width: '100%' }}>
                    <Head>
                        <Row>
                            <Cell as="th" scope="col">
                                Inbound rules
                            </Cell>
                            <Cell style={{ width: '220px' }} as="th" scope="col" />
                            <Cell as="th" scope="col" />
                            <Cell style={{ width: '220px' }} as="th" scope="col" />
                            <Cell as="th" scope="col" />
                            <Cell as="th" scope="col" />
                        </Row>
                    </Head>
                    <Body>
                        {vm.rules && vm.rules.length > 1 ? (
                            vm.rules.map((rule: any, ruleNumber: number) => {
                                return (
                                    rule.direction === 0 && (
                                        <Row>
                                            <Cell component="th" scope="row">
                                                <TextField
                                                    value={rule.description}
                                                    onChange={(e: any) =>
                                                        updateRule(ruleNumber, e.target.value, 'description')
                                                    }
                                                    placeholder="Description"
                                                    data-cy="vm_rule_description"
                                                    disabled={!permissions.editRules}
                                                />
                                            </Cell>
                                            <Cell component="th" scope="row">
                                                <div style={{ paddingBottom: '16px' }}>
                                                    <CoreDevDropdown
                                                        options={ipMethod}
                                                        onChange={(e: any) =>
                                                            handleDropdownChangeClientIp(e, 'useClientIp', ruleNumber)
                                                        }
                                                        name="useClientIp"
                                                        preSlectedValue={'Custom'}
                                                        data-cy="vm_rule_useClientIp"
                                                        disabled={!permissions.editRules}
                                                    />
                                                </div>
                                            </Cell>
                                            <Cell component="th" scope="row">
                                                {rule.useClientIp ? (
                                                    <span>{rule.ip || 'loading ip..'}</span>
                                                ) : (
                                                    <TextField
                                                        value={rule.ip}
                                                        onChange={(e: any) => {
                                                            updateRule(ruleNumber, e.target.value, 'ip');
                                                        }}
                                                        placeholder="IP"
                                                        data-cy="vm_rule_ip"
                                                        disabled={!permissions.editRules}
                                                    />
                                                )}
                                            </Cell>
                                            <Cell component="th" scope="row">
                                                <div style={{ paddingBottom: '16px' }}>
                                                    <CoreDevDropdown
                                                        options={portsOptions}
                                                        onChange={(e: any) => {
                                                            handleDropdownChange('protocol', ruleNumber, e);
                                                        }}
                                                        name="protocol"
                                                        preSlectedValue={rule.protocol || 'Custom'}
                                                        data-cy="vm_rule_protocol"
                                                        disabled={!permissions.editRules}
                                                    />
                                                </div>
                                            </Cell>
                                            <Cell component="th" scope="row">
                                                {rule.protocol !== protocolOptions.CUSTOM ? (
                                                    <span>{rule.port || '-'}</span>
                                                ) : (
                                                    <TextField
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
                                                        disabled={!permissions.editRules}
                                                    />
                                                )}
                                            </Cell>

                                            <Cell>
                                                {permissions.editRules &&
                                                    EquinorIcon('clear', '', 24, () => removeRule(ruleNumber), true)}
                                            </Cell>
                                        </Row>
                                    )
                                );
                            })
                        ) : (
                            <Row>
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
                <Button
                    variant="outlined"
                    style={{ float: 'right', margin: '24px 16px 24px 16px' }}
                    onClick={() => {
                        addRule();
                    }}
                    data-cy="vm_add_rule"
                    disabled={!permissions.editRules}
                >
                    Add rule
                </Button>
                <Table style={{ width: '100%', marginTop: '24px' }}>
                    <Head>
                        <Row>
                            <Cell as="th" scope="col">
                                Outbound rules
                            </Cell>
                            <Cell as="th" scope="col" />
                        </Row>
                    </Head>
                    <Body>
                        <Row key={1}>
                            <Cell component="th" scope="row">
                                Outbound internet traffic is currently {returnOpenClosed('text')}
                            </Cell>
                            <Cell component="th" scope="row">
                                <Button
                                    variant="outlined"
                                    style={{ float: 'right' }}
                                    disabled={!permissions.editRules}
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
                <Button
                    style={{ float: 'right', margin: '24px 16px 24px 16px' }}
                    onClick={() => {
                        saveRule(vm.rules);
                    }}
                    disabled={!checkIfSaveIsEnabled()}
                    data-cy="vm_rule_save"
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    style={{ float: 'right', margin: '24px 0 0 0' }}
                    onClick={() => {
                        resetRules();
                    }}
                    disabled={!hasChanged}
                    data-cy="vm_rule_cancel"
                >
                    Cancel
                </Button>
            </div>
        </Wrapper>
    );
};

export default VmDetails;
