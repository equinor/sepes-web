/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { useHistory } from 'react-router-dom';
import '../../../styles/Table.scss';
import { getStudyId } from '../../../utils/CommonUtil';
import TextTruncate from 'components/common/customComponents/infoDisplayComponents/TextTruncate';
import DataTable from 'components/common/table/DataTable';
import { SandboxLightObj } from 'components/common/interfaces';

const { Row, Cell } = Table;

const columns = [
    {
        key: 'name',
        style: { textAlign: 'left' },
        name: 'Sandbox',
        accessor: 'name',
        sortDirection: 'none',
        isSortable: true,
        isSorted: false
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

type SandboxTableProps = {
    sandboxes: any;
    onFallBackAddressChange: any;
    editMode: boolean;
};

const SandboxTable: React.FC<SandboxTableProps> = ({ sandboxes, onFallBackAddressChange, editMode }) => {
    const studyId = getStudyId();
    const history = useHistory();
    const returnCell = (sandbox: SandboxLightObj, type: 'icon' | 'text') => {
        //This means it is a study specific dataset
        return (
            <Cell>
                {type === 'icon' ? <Icon name="chevron_right" size={24} /> : <TextTruncate inputText={sandbox.name} />}
            </Cell>
        );
    };

    const redirectOnCellClick = (row: SandboxLightObj) => {
        if (studyId && row.id) {
            const url = '/studies/' + studyId + '/sandboxes/' + row.id;
            history.push(url);
            onFallBackAddressChange(url);
        }
    };

    const returnListOfItems = (sandbox: SandboxLightObj) => {
        if (sandbox === undefined) {
            return {};
        }
        return (
            <Row key={sandbox.id} id="tableRow" onClick={() => redirectOnCellClick(sandbox)}>
                {returnCell(sandbox, 'text')}
                {returnCell(sandbox, 'icon')}
            </Row>
        );
    };

    return (
        <div style={{ width: '100%', marginBottom: '24px' }}>
            <DataTable
                columns={columns}
                data={sandboxes ?? []}
                listItems={returnListOfItems}
                cookiePrefix={'sandboxes-editMode' + getStudyId()}
                disablePagination={!editMode || sandboxes.length < 10}
            />
        </div>
    );
};

export default SandboxTable;
