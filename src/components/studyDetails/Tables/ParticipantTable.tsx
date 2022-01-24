/* eslint-disable react/jsx-curly-brace-presence, consistent-return */
import React from 'react';
import { Table, Icon, Button } from '@equinor/eds-core-react';
import { ParticipantObj, StudyPermissions } from '../../common/interfaces';
import { studyOwner } from '../../common/staticValues/Roles';
import useWindowDimensions from '../../common/hooks/useWindowDimensions';
import DataTable from '../../common/table/DataTable';
import '../../../styles/Table.scss';
import { getStudyId } from 'utils/CommonUtil';

const { Row, Cell } = Table;

const columns = [
    {
        key: 'name',
        style: { textAlign: 'left' },
        name: 'Entity name',
        accessor: 'fullName',
        sortDirection: 'none',
        isSortable: true,
        isSorted: false
    },
    {
        key: 'code',
        name: 'E-mail',
        style: { textAlign: 'left' },
        accessor: 'emailAddress',
        sortDirection: 'none',
        isSortable: true
    },
    {
        key: 'role',
        name: 'Role',
        maxWidth: 250,
        accessor: 'role',
        sortDirection: 'none',
        style: { textAlign: 'left' },
        isSortable: true
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

type ParticipantsTableProps = {
    participants: any;
    removeParticipant?: any;
    editMode: boolean;
    permissions?: StudyPermissions;
};

const ParticipantsTable: React.FC<ParticipantsTableProps> = ({
    participants,
    removeParticipant,
    editMode,
    permissions
}) => {
    const { width } = useWindowDimensions();

    const returnListOfItems = (participant: ParticipantObj) => {
        if (participant === undefined) {
            return;
        }
        return (
            <Row key={participant.userId + participant.role} id="tableRowNoPointerNoColor">
                <Cell>{participant.fullName}</Cell>
                {editMode && width > 800 && <Cell align="right">{participant.emailAddress}</Cell>}
                <Cell align="right">{participant.role}</Cell>
                {editMode && participant.role !== studyOwner ? (
                    <Cell align="right">
                        {permissions?.addRemoveParticipant && (
                            <Button
                                variant="ghost_icon"
                                onClick={() => removeParticipant(participant)}
                                style={{ color: '#3D3D3D' }}
                                data-cy="study_remove_participant"
                            >
                                <Icon name="close" style={{ cursor: 'pointer' }} size={24} />
                            </Button>
                        )}
                    </Cell>
                ) : (
                    editMode && <Cell>{''}</Cell>
                )}
            </Row>
        );
    };

    return (
        <div>
            <DataTable
                columns={editMode ? columns : columns.slice(0, 2)}
                data={participants}
                listItems={returnListOfItems}
                cookiePrefix={'participants-editMode' + editMode + getStudyId()}
                disablePagination={!editMode || participants.length < 10}
            />
        </div>
    );
};

ParticipantsTable.defaultProps = {
    removeParticipant: undefined,
    permissions: undefined
};

export default ParticipantsTable;
