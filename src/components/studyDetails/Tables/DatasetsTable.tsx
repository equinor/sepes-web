/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect, useState } from 'react';
import { Table } from '@equinor/eds-core-react';
import { Link, useHistory } from 'react-router-dom';
import { EquinorIcon } from '../../common/StyledComponents';
import '../../../styles/Table.scss';
import { truncate } from 'components/common/helpers/helpers';
import TextTruncate from '../../common/customComponents/infoDisplayComponents/TextTruncate';
import DataTable from 'components/common/table/DataTable';
import { getStudyId } from 'utils/CommonUtil';
import { DatasetLightObj } from 'components/common/interfaces';

const { Row, Cell } = Table;

const columns = [
    {
        key: 'name',
        style: { textAlign: 'left' },
        name: 'Dataset',
        accessor: 'name',
        sortDirection: 'none',
        isSortable: true,
        isSorted: false
    },
    {
        key: 'sandboxes',
        name: 'Sandboxes',
        style: { textAlign: 'left' },
        accessor: 'sandboxes.name',
        sortDirection: 'none',
        isSortable: false
    },
    {
        key: '',
        name: '',
        maxWidth: 250,
        accessor: '',
        sortDirection: 'none',
        isSortable: false,
        style: { width: '10px' }
    }
];

const DatasetsTable = (props: any) => {
    const { editMode, datasets } = props;
    const [mouseHoverSandbox, setMouseHoverSandbox] = useState<boolean>(false);
    const history = useHistory();
    const returnCell = (row: any, value: string, type: 'text' | 'icon') => {
        //This means it is a study specific dataset
        if (row.studyId) {
            return (
                <Cell>
                    {type === 'icon' ? (
                        EquinorIcon('chevron_right', '', 24, () => {}, true)
                    ) : (
                        <TextTruncate inputText={value} />
                    )}
                </Cell>
            );
        }
        return (
            <Cell>
                {editMode && type === 'icon' && props.disabled ? (
                    EquinorIcon('close', '', 24, () => props.removeDataset(row), true)
                ) : (
                    <TextTruncate inputText={value} />
                )}
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

    const returnListOfItems = (dataset: DatasetLightObj) => {
        if (dataset === undefined) {
            return {};
        }
        return (
            <Row key={dataset.id} onClick={() => redirectOnCellClick(dataset)} id="tableRow">
                {returnCell(dataset, dataset.name, 'text')}
                {editMode && (
                    <Cell>
                        {dataset.sandboxes &&
                            dataset.sandboxes.length > 0 &&
                            dataset.sandboxes.map((sandbox: any, index: number) => {
                                return (
                                    <Link
                                        key={sandbox.id}
                                        style={{ color: '#000000', cursor: 'pointer' }}
                                        to={'/studies/' + props.studyId + '/sandboxes/' + sandbox.id}
                                        onMouseOver={() => setMouseHoverSandbox(true)}
                                        onMouseLeave={() => setMouseHoverSandbox(false)}
                                    >
                                        {index === dataset.sandboxes.length - 1
                                            ? sandbox && truncate(sandbox.name)
                                            : sandbox.name && <TextTruncate inputText={sandbox.name} /> + ', '}
                                    </Link>
                                );
                            })}
                    </Cell>
                )}
                {returnCell(dataset, '', 'icon')}
            </Row>
        );
    };

    return (
        <div style={{ width: '100%', marginBottom: '24px' }}>
            <DataTable
                columns={editMode ? columns : columns.slice(0, 1).concat(columns.slice(2, 3))}
                data={datasets}
                listItems={returnListOfItems}
                cookiePrefix={'datasets-editMode' + editMode + getStudyId()}
                disablePagination={!editMode}
            />
        </div>
    );
};

export default DatasetsTable;
