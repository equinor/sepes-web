import React, { useState } from 'react';
import { Table, Checkbox } from '@equinor/eds-core-react';
import styled from 'styled-components';
const { Body, Row, Cell, Head } = Table;

const mockData = [
    {
        name: 'Equinor standard phrases',
        status: 'Open',
        enabled: true
    },
    {
        name: 'Abbreviations',
        status: 'Internal',
        enabled: false
    },
    {
        name: 'Data set #3',
        status: 'Restricted',
        enabled: true
    },
    {
        name: 'Output from sandbox #1',
        status: 'Restricted',
        enabled: false
    },
]

const Dataset = (props: any) => {
    return (
        <Table style={{ width: '100%', marginBottom: '24px' }}>
                    <Head>
                    <Row>
                        <Cell as="th" scope="col">Data sets in sandbox</Cell>
                        <Cell as="th" scope="col">{""}</Cell>
                    </Row>
                    </Head>
                    <Body>
                        {mockData.map((dataset:any, index:number) => {
                            return(
                                <Row key={index}>
                                    <Cell component="th" scope="row">
                                    <div style={{ paddingTop: '6px' }}>
                                        <Checkbox
                                            checked={dataset.enabled}
                                            value={dataset.enabled}
                                            label={dataset.name}
                                        />
                                    </div>
                                    </Cell>
                                    <Cell style={{ width: '32px' }}>{dataset.status}</Cell>
                                </Row>
                            )
                        })}
                    </Body>
        </Table>
    )
}

export default Dataset;
