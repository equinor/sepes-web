import React, { useState } from 'react';
import { Table, Checkbox } from '@equinor/eds-core-react';
import { EquinorIcon } from '../../common/StyledComponents';
const { Body, Row, Cell, Head } = Table;

const mockData = [
    {
        name: 'Equinor standard phrases',
        status: 'Open',
        enabled: true
    },
    {
        name: 'Data set #3',
        status: 'Restricted',
        enabled: true
    },
]

const DatasetConfirmed = (props: any) => {
    return (
        <Table style={{ width: '100%', marginBottom: '24px' }}>
                    <Head>
                    <Row>
                        <Cell as="th" scope="col">Data sets in sandbox</Cell>
                        <Cell as="th" scope="col"/>
                    </Row>
                    </Head>
                    <Body>
                        {mockData.map((dataset:any, index:number) => {
                            return(
                                <Row key={index}>
                                    <Cell component="th" scope="row">
                                        {EquinorIcon('check', '#007079', 24)}
                                        <span style={{marginLeft: '32px'}}>{dataset.name}</span>
                                    </Cell>
                                    <Cell style={{ width: '32px' }}>{dataset.status}</Cell>
                                </Row>
                            )
                        })}
                    </Body>
        </Table>
    )
}

export default DatasetConfirmed;
