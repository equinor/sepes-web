import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, TextField, Button } from '@equinor/eds-core-react';
import { EquinorIcon } from '../../common/StyledComponents';
import VmProperties from './VmProperties';
import CoreDevDropdown from '../../common/customComponents/Dropdown'
const { Body, Row, Cell, Head } = Table;

const Wrapper = styled.div`
    height: 400px;
    padding: 16px;
    margin-bottom: 128px;
    display:grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 16px;
  `;

type VmDetailsProps = {
    vm : any;
};

const mockRules = [
    {
        name: 'Roger sitt hjemmekontor',
        ipType: 'Current personal ip',
        ip: '123.117.1.0',
        protocol: "http",
        port: "443"
    }
];

const options = [
    { displayValue: "test1", key:'1' },
    { displayValue: "2", key:'2' },
    { displayValue: "3", key:'3' },
    { displayValue: "4", key:'4' }
  ];

const VmDetails: React.FC<VmDetailsProps> = ({ vm }) => {
    const [rules, setRules] = useState<any>(mockRules);

    const addRule = () => {
        let currentRules:any = [...rules];
        currentRules.push(
            {
                name: '',
                ipType: '',
                ip: '',
                protocol: "",
                port: ""
            }
        )
        setRules(currentRules);
    }

    const updateRule = (i:number, value:string, key:string) => {
        let currentRules:any = [...rules];
        currentRules[i][key] = value;
        setRules(currentRules);
    }

    const removeRule = (i:number) => {
        let currentRules:any = [...rules];
        currentRules.splice(i, 1);
        setRules(currentRules);
    }

    const handleDropdownChange = ( key:string, i:number, value?,): void => {
        let currentRules:any = [...rules];
        currentRules[i][key] = value;
        setRules(currentRules);
    };

    return (
        <Wrapper>
            <VmProperties vmProperties={vm} />
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
                            {rules.map((rule:any, index:number) => {
                                return (
                                <Row>
                                    <Cell component="th" scope="row">
                                        <TextField
                                            value={rule.name}
                                            onChange={(e:any) => updateRule(index, e.target.value, 'name')}
                                        />
                                    </Cell>
                                    <Cell component="th" scope="row">
                                        <div style={{ paddingBottom: '16px' }}>
                                            <CoreDevDropdown
                                                options={options}
                                                onChange={(e:any) => handleDropdownChange( 'protocol', index)}
                                                name="classification"
                                                preSlectedValue={rule.protocol}
                                                data-cy="dataset_classification"
                                            />
                                        </div>
                                    </Cell>
                                    <Cell component="th" scope="row">
                                        <TextField
                                            value={rule.ip}
                                            onChange={(e:any) => updateRule(index, e.target.value, 'ip')}
                                        />
                                    </Cell>
                                    <Cell component="th" scope="row">
                                        <div style={{ paddingBottom: '16px'}}>
                                            <CoreDevDropdown
                                                options={options}
                                                onChange={(e:any) => handleDropdownChange('protocol', index)}
                                                name="classification"
                                                preSlectedValue={rule.protocol}
                                                data-cy="dataset_classification"
                                            />
                                        </div>
                                    </Cell>
                                    <Cell component="th" scope="row">
                                        <TextField
                                            value={rule.port}
                                            onChange={(e:any) => updateRule(index, e.target.value, 'port')}
                                        />
                                    </Cell>
                                    <Cell>{EquinorIcon('clear', '', 24, () => removeRule(index), true)}</Cell>
                                </Row>
                                )
                            })}
                        </Body>
                </Table>
                <Button
                    variant="outlined"
                    style={{ float: 'right', margin: '24px' }}
                    onClick={() => addRule()}
                >
                        Add rule
                </Button>
                <Table style={{ width: '100%', marginTop: '24px' }}>
                        <Head>
                        <Row>
                            <Cell as="th" scope="col">Outbound rules</Cell>
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
