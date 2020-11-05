import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, TextField, Button } from '@equinor/eds-core-react';
import { EquinorIcon } from '../../common/StyledComponents';
import VmProperties from './VmProperties';
import CoreDevDropdown from '../../common/customComponents/Dropdown'
import { createVirtualMachineRule, getVirtualMachineExtended, getVirtualMachineRule } from '../../../services/Api';
import * as notify from '../../common/notify';
import useFetch from '../../common/hooks/useFetch';
const { Body, Row, Cell, Head } = Table;

const Wrapper = styled.div`
    min-height: 400px;
    padding: 16px;
    margin-bottom: 128px;
    display:grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 16px;
    @media (max-width: 700px) {
        display: block;
      }
  `;

type VmDetailsProps = {
    vm : any;
    setVms:any;
    vms:any;
    setActiveTab:any;
    index:number;
    resources:any;
    getVms:any;
};

const ipMethod = [
    { displayValue: "current personal IP", key:'1' },
    { displayValue: "Custom", key:'2' }
  ];

  const portsOptions = [
    { displayValue: "HTTP", key:'1' },
    { displayValue: "Custom", key:'2' }
  ];

const VmDetails: React.FC<VmDetailsProps> = ({ vm, setVms, vms, setActiveTab, index, resources, getVms }) => {
    const [rules, setRules] = useState<any>([]);
    //const { intialValue } = useFetch(getVirtualMachineRule, setRules, 'vmrules' + vm.id, vm.id);
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
                    let tempsVms:any = [...vms];
                    tempsVms[index].extendedInfo = result;
                    setVms(tempsVms);
                    console.log('result', result);
                }
                else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
            });
        }
    };

    const getVmRules = () => {
        if (!vm.rules) {
            getVirtualMachineRule(vm.id).then((result: any) => {
                if (result && !result.Message) {
                    let tempsVms:any = [...vms];
                    tempsVms[index].rules = result;
                    setVms(tempsVms);
                    //setRules(result);
                    console.log('result', result);
                }
                else {
                    //notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
            });
        }
    };

    const isVmCreatingOrReady = ():boolean => {
        let res = false;
        if (!resources) {
            return res;
        }
        resources.map((resource:any, i:number) => {
            if (resource.type === "Virtual Machine" && resource.status === "Ok" && resource.name === vm.name) {
                res = true;
                if (!vm.linkToExternalSystem) {
                    getVms();
                }
            };
        });
        return res;
    };

    const addRule = () => {
        setHasChanged(true);
        let currentRules:any = [];
        if (vm.ru && vm.rules.length) {
            currentRules = [...vm.rules];
        }
        
        currentRules.push(
            {
                description: '',
                ip: '',
                protocol: "",
                port: "",
                useClientIp: false
            }
        )
        let tempsVms:any = [...vms];
        tempsVms[index].rules = currentRules;
        setVms(tempsVms);
        //setRules(currentRules);
    };

    const saveRule = () => {
        setHasChanged(false);
        createVirtualMachineRule(vm.rules, vm.id).then((result: any) => {
            if (result && !result.Message) {

                console.log('result', result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
            }
        });

    };
/*
    const saveRule = () => {
        setHasChanged(false);
        createVirtualMachineRule(rules, vm.id).then((result: any) => {
            if (result && !result.Message) {

                console.log('result', result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
            }
        });

    };*/

    const updateRule = (i:number, value:string, key:string) => {
        setHasChanged(true);
        let currentRules:any = [...vm.rules];
        currentRules[i][key] = value;
        let tempsVms:any = [...vms];
        tempsVms[index].rules = currentRules;
        setVms(tempsVms);
        //setRules(currentRules);
    };

    const removeRule = (i:number) => {
        setHasChanged(true);
        let currentRules:any = [...vm.rules];
        currentRules.splice(i, 1);
        let tempsVms:any = [...vms];
        tempsVms[index].rules = currentRules;
        setVms(tempsVms);
        //setRules(currentRules);
    };

    const handleDropdownChange = (key:string, i:number, value?): void => {
        setHasChanged(true);
        let currentRules:any = [...vm.rules];
        currentRules[i][key] = portsOptions[value-1].displayValue;
        let tempsVms:any = [...vms];
        tempsVms[index].rules = currentRules;
        setVms(tempsVms);
        //setRules(currentRules);
    };

    const handleDropdownChangeClientIp = (value:any, name:string, ruleIndex): void => {
        setHasChanged(true);
        let currentRules:any = [...vm.rules];
        if (value === "1") {
            currentRules[ruleIndex][name] = true;
            currentRules[ruleIndex].ip = clientIp;
        }
        else {
            currentRules[ruleIndex][name] = false;
        }
        let tempsVms:any = [...vms];
        tempsVms[index].rules = currentRules;
        setVms(tempsVms);
        //setRules(currentRules);
    };
    /*
    const handleDropdownChangeClientIp = (value:any, name:string, ruleIndex): void => {
        setHasChanged(true);
        let currentRules:any = [...rules];
        if (value === "1") {
            currentRules[ruleIndex][name] = true;
            currentRules[ruleIndex].ip = clientIp;
        }
        else {
            currentRules[ruleIndex][name] = false;
        }
        setRules(currentRules);
    };
*/
    const getMyIp = () => {
        fetch('https://api.ipify.org?format=json').then(response => {
          return response.json();
        }).then((res: any) => {
            setClientIp(res.ip);
        }).catch((err: any) => console.error('Problem fetching my IP', err))
      }

    return (
        <Wrapper>
            <VmProperties
                vmProperties={vm}
                setVms={setVms}
                vms={vms}
                setActiveTab={setActiveTab}
            />
            <div>
                <Table style={{ width: '100%' }}>
                        <Head>
                        <Row>
                            <Cell as="th" scope="col">Inbound rules</Cell>
                            <Cell style={{ width: '220px' }} as="th" scope="col" />
                            <Cell as="th" scope="col" />
                            <Cell style={{ width: '220px' }} as="th" scope="col" />
                            <Cell as="th" scope="col" />
                            <Cell as="th" scope="col" />
                        </Row>
                        </Head>
                        <Body>
                            {vm.rules && vm.rules.length > 0 ? vm.rules.map((rule:any, ruleNumber:number) => {
                                return (
                                <Row>
                                    <Cell component="th" scope="row">
                                        <TextField
                                            value={rule.description}
                                            onChange={(e:any) => updateRule(ruleNumber, e.target.value, 'description')}
                                            placeholder="Description"
                                        />
                                    </Cell>
                                    <Cell component="th" scope="row">
                                        <div style={{ paddingBottom: '16px' }}>
                                            <CoreDevDropdown
                                                options={ipMethod}
                                                onChange={(e:any) => handleDropdownChangeClientIp(e, 'useClientIp', ruleNumber)}
                                                name="useClientIp"
                                                preSlectedValue={"Custom"}
                                                data-cy="dataset_classification"
                                            />
                                        </div>
                                    </Cell>
                                    <Cell component="th" scope="row">
                                        {rule.useClientIp ? 
                                        <span>{rule.ip || 'loading ip..'}</span>:
                                        <TextField
                                            value={rule.ip}
                                            onChange={(e:any) => updateRule(ruleNumber, e.target.value, 'ip')}
                                            placeholder="IP"
                                        />
                                    }
                                    </Cell>
                                    <Cell component="th" scope="row">
                                        <div style={{ paddingBottom: '16px'}}>
                                            <CoreDevDropdown
                                                options={portsOptions}
                                                onChange={(e:any) => { handleDropdownChange('protocol', ruleNumber, e)}}
                                                name="protocol"
                                                preSlectedValue={rule.protocol}
                                                data-cy="dataset_classification"
                                            />
                                        </div>
                                    </Cell>
                                    <Cell component="th" scope="row">
                                        <TextField
                                            value={rule.port}
                                            onChange={(e:any) => updateRule(ruleNumber, e.target.value, 'port')}
                                            type="number"
                                            placeholder="Port"
                                        />
                                    </Cell>

                                    <Cell>{EquinorIcon('clear', '', 24, () => removeRule(ruleNumber), true)}</Cell>
                                </Row>
                                )
                            }) :
                            <Row>
                                <Cell style={{ width: '220px' }}>No inbound rules added</Cell>
                                <Cell />
                                <Cell />
                                <Cell />
                                <Cell />
                                <Cell />
                            </Row>}
                        </Body>
                </Table>
                <Button
                    style={{ float: 'right', margin: '24px 24px 24px 16px' }}
                    onClick={() => { saveRule()}}
                    disabled={!hasChanged}
                >
                        Save
                </Button>
                {/*<Button
                    variant="outlined"
                    style={{ float: 'right', margin: '24px 0 0 16px' }}
                    onClick={() => { console.log(intialValue); setRules(intialValue)}}
                    disabled={!hasChanged}
                >
                        Cancel
                </Button>*/}
                <Button
                    variant="outlined"
                    style={{ float: 'right', margin: '24px 0 0 0' }}
                    onClick={() => { addRule()}}
                >
                        Add rule
                </Button>
                <Table style={{ width: '100%', marginTop: '24px' }}>
                        <Head>
                        <Row>
                            <Cell as="th" scope="col">Outbound rules (Frontend Only)</Cell>
                            <Cell as="th" scope="col" />
                        </Row>
                        </Head>
                        <Body>
                            <Row key={1}>
                                <Cell component="th" scope="row">Outbound internet traffic is currently closed</Cell>
                                <Cell component="th" scope="row">
                                    <Button variant="outlined" style={{ float: 'right' }}>Open for 12 hours</Button>
                                </Cell>
                            </Row>
                            <Row key={2}>
                                <Cell component="th" scope="row">Outbound internet traffic is open intil XXXX</Cell>
                                <Cell component="th" scope="row">
                                    <div style={{ float: 'right' }}>
                                        <Button variant="outlined" style={{ marginRight: '16px' }}>Close internet</Button>
                                        <Button variant="outlined">Extend 12 hours</Button>
                                    </div>
                                </Cell>
                            </Row>
                            <Row key={3}>
                                <Cell component="th" scope="row">Outbound internet traffic is currently closed</Cell>
                                <Cell component="th" scope="row">
                                    <Button variant="outlined" style={{ float: 'right' }}>Ask sponsor (rep) for permission to open</Button>
                                </Cell>
                            </Row>
                        </Body>
                </Table>
            </div>
        </Wrapper>
    )
}

export default VmDetails;
