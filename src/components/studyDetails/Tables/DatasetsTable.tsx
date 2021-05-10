/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect, useState } from 'react';
import { Table } from '@equinor/eds-core-react';
import { Link, useHistory } from 'react-router-dom';
import { EquinorIcon } from '../../common/StyledComponents';
import '../../../styles/Table.scss';

const { Body, Row, Cell, Head } = Table;

const DatasetsTable = (props: any) => {
    const { editMode, datasets } = props;
    const [mouseHoverSandbox, setMouseHoverSandbox] = useState<boolean>(false);
    const history = useHistory();
    const returnCell = (row: any, value: string, type: 'text' | 'icon') => {
        //This means it is a study specific dataset
        if (row.studyId) {
            return <Cell>{type === 'icon' ? EquinorIcon('chevron_right', '', 24, () => {}, true) : value}</Cell>;
        }
        return (
            <Cell>
                {editMode && type === 'icon' && props.disabled
                    ? EquinorIcon('close', '', 24, () => props.removeDataset(row), true)
                    : value}
            </Cell>
        );
    };
    useEffect(() => {
        return () => setMouseHoverSandbox(false);
    }, []);

    const redirectOnCellClick = (row: any) => {
        if (row.studyId && !mouseHoverSandbox) {
            history.push('/studies/' + props.studyId + '/datasets/' + row.id);
        }
    };

    return (
        <div>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                <Head>
                    <Row>
                        <Cell scope="col">Dataset</Cell>
                        {editMode && <Cell scope="col">Sandboxes</Cell>}
                        <Cell style={{ width: '10px' }} scope="col">
                            {''}
                        </Cell>
                    </Row>
                </Head>
                <Body>
                    {datasets && datasets.length > 0 ? (
                        datasets.map((row) => (
                            <Row key={row.id} onClick={() => redirectOnCellClick(row)} id="tableRow">
                                {returnCell(row, row.name, 'text')}
                                {editMode && (
                                    <Cell>
                                        {row.sandboxes &&
                                            row.sandboxes.length > 0 &&
                                            row.sandboxes.map((sandbox: any, index: number) => {
                                                return (
                                                    <Link
                                                        key={sandbox.id}
                                                        style={{ color: '#000000', cursor: 'pointer' }}
                                                        to={'/studies/' + props.studyId + '/sandboxes/' + sandbox.id}
                                                        onMouseOver={() => setMouseHoverSandbox(true)}
                                                        onMouseLeave={() => setMouseHoverSandbox(false)}
                                                    >
                                                        {index === row.sandboxes.length - 1
                                                            ? sandbox && sandbox.name
                                                            : sandbox.name && sandbox.name + ', '}
                                                    </Link>
                                                );
                                            })}
                                    </Cell>
                                )}
                                {returnCell(row, '', 'icon')}
                            </Row>
                        ))
                    ) : (
                        <Row key={1} id="tableRowNoPointerNoColor">
                            <Cell>No datasets added</Cell>
                            {editMode && <Cell />}
                            <Cell>{''}</Cell>
                        </Row>
                    )}
                </Body>
            </Table>
        </div>
    );
};

export default DatasetsTable;
