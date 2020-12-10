import React, { useState } from 'react';
import { Table } from '@equinor/eds-core-react';
import { EquinorIcon } from '../../common/StyledComponents';
import useFetchUrl from '../../common/hooks/useFetchUrl';
const { Body, Row, Cell, Head } = Table;

type SandboxConfirmedProps = {
    sandboxId;
};

const DatasetConfirmed: React.FC<SandboxConfirmedProps> = ({ sandboxId }) => {
    const [datasetsConfirmed, setDatasetsConfirmed] = useState([]);
    const datasetsConfirmedResponse = useFetchUrl('sandbox/' + sandboxId + '/datasets', setDatasetsConfirmed);
    return (
        <Table style={{ width: '100%', marginBottom: '24px' }}>
            <Head>
                <Row>
                    <Cell as="th" scope="col">
                        Data sets in sandbox
                    </Cell>
                    <Cell as="th" scope="col" />
                </Row>
            </Head>
            <Body>
                {datasetsConfirmed.length > 0 ? (
                    datasetsConfirmed.map((dataset: any, index: number) => {
                        return (
                            <Row key={index}>
                                <Cell>
                                    {EquinorIcon('check', '#007079', 24)}
                                    <span style={{ marginLeft: '32px' }}>{dataset.name}</span>
                                </Cell>
                                <Cell style={{ width: '32px' }}>{dataset.status}</Cell>
                            </Row>
                        );
                    })
                ) : (
                    <Row key={1}>
                        <Cell>{datasetsConfirmedResponse.loading ? 'loading...' : 'No data sets in sandbox'}</Cell>
                        <Cell style={{ width: '32px' }}>{''}</Cell>
                    </Row>
                )}
            </Body>
        </Table>
    );
};

export default DatasetConfirmed;
