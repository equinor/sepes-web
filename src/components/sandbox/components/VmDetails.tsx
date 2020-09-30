import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, TextField, Button } from '@equinor/eds-core-react';
import { EquinorIcon } from '../../common/StyledComponents';
import VmProperties from './VmProperties';
const { Body, Row, Cell, Head } = Table;

const Wrapper = styled.div`
    height: 400px;
    padding: 16px;
    display:grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 16px;
  `;

type VmDetailsProps = {
    vm : any;
};

const VmDetails: React.FC<VmDetailsProps> = ({ vm }) => {
    return (
        <Wrapper>
            <VmProperties vmProperties="" />
            <div>
                <Table style={{ width: '100%'}}>
                        <Head>
                        <Row>
                            <Cell as="th" scope="col">Inbound rules</Cell>
                            <Cell as="th" scope="col" />
                            <Cell as="th" scope="col" />
                        </Row>
                        </Head>
                        <Body>
                            <Row key={1}>
                                <Cell component="th" scope="row"><TextField value="127.0.0.1" /></Cell>
                                <Cell component="th" scope="row"><TextField value="443" /></Cell>
                                <Cell>{EquinorIcon('clear', '', 24)}</Cell>
                            </Row>
                            <Row key={2}>
                                <Cell component="th" scope="row"><TextField value="127.0.0.1" /></Cell>
                                <Cell component="th" scope="row"><TextField value="80" /></Cell>
                                <Cell>{EquinorIcon('clear', '', 24)}</Cell>
                            </Row>
                        </Body>
                </Table>
                <Button variant="outlined" style={{ float: 'right' }}>Add rule</Button>
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
