/* eslint-disable react/jsx-curly-brace-presence, react/no-array-index-key */
import React from 'react';
import { Table } from '@equinor/eds-core-react';
import { EquinorIcon } from '../../common/StyledComponents';
import '../../../styles/Table.scss';
import { SandboxObj } from '../../common/interfaces';

const { Body, Row, Cell, Head } = Table;

type SandboxConfirmedProps = {
    sandbox: SandboxObj;
};

const DatasetConfirmed: React.FC<SandboxConfirmedProps> = ({ sandbox }) => {
    return (
        <Table style={{ width: '100%', marginBottom: '24px' }}>
            <Head>
                <Row>
                    <Cell scope="col">Data sets in sandbox</Cell>
                    <Cell scope="col" />
                </Row>
            </Head>
            <Body>
                {sandbox.datasets.length > 0 ? (
                    sandbox.datasets.map((dataset: any, index: number) => {
                        return (
                            <Row key={index} id="tableRowNoPointerNoColor">
                                <Cell>
                                    {EquinorIcon('check', '#007079', 24)}
                                    <span style={{ marginLeft: '32px' }}>{dataset.name}</span>
                                </Cell>
                                <Cell style={{ width: '32px' }}>{dataset.status}</Cell>
                            </Row>
                        );
                    })
                ) : (
                    <Row key={1} id="tableRowNoPointerNoColor">
                        <Cell>No data sets in sandbox</Cell>
                        <Cell style={{ width: '32px' }}>{''}</Cell>
                    </Row>
                )}
            </Body>
        </Table>
    );
};

export default DatasetConfirmed;
