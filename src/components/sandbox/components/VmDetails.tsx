import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, TextField, Button } from '@equinor/eds-core-react';
import { EquinorIcon } from '../../common/StyledComponents';
const { Body, Row, Cell, Head } = Table;

const Wrapper = styled.div`
    height: 400px;
    padding: 16px;
    display:grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 16px;
  `;

type VmDetailsProps = {
    vm : any;
};

const VmDetails: React.FC<VmDetailsProps> = ({ vm }) => {
    return (
        <Wrapper>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                    <Head>
                    <Row>
                        <Cell as="th" scope="col">Rules</Cell>
                    </Row>
                    </Head>
                    <Body>
                        <Row key={1}>
                            <Cell component="th" scope="row">Open internet</Cell>
                        </Row>
                        <Row key={2}>
                            <Cell component="th" scope="row">Something else</Cell>
                        </Row>
                    </Body>
            </Table>
            <div style={{ width : '70%'}}>
                <Table style={{ width: '100%'}}>
                        <Head>
                        <Row>
                            <Cell as="th" scope="col">Incoming rules</Cell>
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
                            <Cell as="th" scope="col">Outgoing rules</Cell>
                            <Cell as="th" scope="col" />
                        </Row>
                        </Head>
                        <Body>
                            <Row key={1}>
                                <Cell component="th" scope="row"><TextField value="127.0.0.1" /></Cell>
                                <Cell component="th" scope="row"><TextField value="42" /></Cell>
                            </Row>

                        </Body>
                </Table>
                <Button variant="outlined" style={{ float: 'right' }}>Add rule</Button>
            </div>
        </Wrapper>
    )
}

export default VmDetails;
