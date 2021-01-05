import React from 'react';
import { Table } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { EquinorIcon } from '../../common/StyledComponents';

const { Body, Row, Cell, Head } = Table;

const DatasetsTable = (props: any) => {
    const { editMode, datasets } = props;
    const returnCell = (row: any, value: string, type: 'text' | 'icon') => {
        //This means it is a study specific dataset
        if (row.studyId) {
            return (
                <Cell>
                    <Link
                        style={{ color: '#000000', cursor: 'pointer' }}
                        to={{
                            pathname: '/studies/' + props.studyId + '/datasets/' + row.id,
                            state: { canEditStudySpecificDataset: props.disabled }
                        }}
                    >
                        {type === 'icon' ? EquinorIcon('chevron_right', '', 24, () => {}, true) : value}
                    </Link>
                </Cell>
            );
        }
        return (
            <Cell>
                {editMode && type === 'icon' && props.disabled
                    ? EquinorIcon('close', '', 24, () => props.removeDataset(row), true)
                    : value}
            </Cell>
        );
    };

    return (
        <div>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                <Head>
                    <Row>
                        <Cell as="th" scope="col">
                            Dataset
                        </Cell>
                        {editMode && (
                            <Cell as="th" scope="col">
                                Sandboxes
                            </Cell>
                        )}
                        <Cell style={{ width: '10px' }} as="th" scope="col">
                            {''}
                        </Cell>
                    </Row>
                </Head>
                <Body>
                    {datasets && datasets.length > 0 ? (
                        datasets.map((row) => (
                            <Row key={row.id}>
                                {returnCell(row, row.name, 'text')}
                                {editMode && (
                                    <Cell>
                                        {row.sandboxDatasets &&
                                            row.sandboxDatasets.map((sandbox: any, index: number) => {
                                                return (
                                                    <Link
                                                        key={sandbox.sandboxId}
                                                        style={{ color: '#000000', cursor: 'pointer' }}
                                                        to={
                                                            '/studies/' +
                                                            props.studyId +
                                                            '/sandboxes/' +
                                                            sandbox.sandboxId
                                                        }
                                                    >
                                                        {index === row.sandboxDatasets.length - 1
                                                            ? sandbox.sandboxName && sandbox.sandboxName
                                                            : sandbox.sandboxName && sandbox.sandboxName + ', '}
                                                    </Link>
                                                );
                                            })}
                                    </Cell>
                                )}
                                {returnCell(row, '', 'icon')}
                            </Row>
                        ))
                    ) : (
                        <Row key={1}>
                            <Cell>No datasets added</Cell>
                            {editMode && <Cell></Cell>}
                            <Cell>{''}</Cell>
                        </Row>
                    )}
                </Body>
            </Table>
        </div>
    );
};

export default DatasetsTable;
