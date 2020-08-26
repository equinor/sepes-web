import React, { useState } from 'react';
import { Table } from '@equinor/eds-core-react';
const { Body, Row, Cell, Head } = Table;

const Dataset = (props: any) => {
    return (
        <Table style={{ width: '100%', marginBottom: '24px' }}>
                    <Head>
                    <Row>
                        <Cell as="th" scope="col">Resources</Cell>
                    </Row>
                    </Head>
                    <Body>
                        <Row key={1}>
                            <Cell component="th" scope="row">VNET Something</Cell>
                        </Row>
                        <Row key={2}>
                            <Cell component="th" scope="row">Equinor standard phrases</Cell>
                        </Row>
                        <Row key={3}>
                            <Cell component="th" scope="row">Equinor standard phrases</Cell>
                        </Row>
                    </Body>
        </Table>
    )
}

export default Dataset;
