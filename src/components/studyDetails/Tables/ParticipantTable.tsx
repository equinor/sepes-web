/* eslint-disable react/jsx-curly-brace-presence, consistent-return */
import React from 'react';
import { Table, Icon, Button } from '@equinor/eds-core-react';
import { ParticipantObj, StudyPermissions } from '../../common/interfaces';
import { studyOwner } from '../../common/staticValues/Roles';
import useWindowDimensions from '../../common/hooks/useWindowDimensions';
import DataTable from '../../common/table/DataTable';
import '../../../styles/Table.scss';

const { Row, Cell } = Table;

const columns = [
    {
        key: 'name',
        style: { textAlign: 'left' },
        name: 'Entity name',
        accessor: 'fullName',
        sortDirection: 'ascending',
        isSortable: true,
        isSorted: true
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
        accessor: 'entityAccessGroup.code',
        sortDirection: 'none',
        isSortable: false,
        style: { width: '10px' }
    }
];

type DatasetsTableProps = {
    participants: any;
    removeParticipant?: any;
    editMode: boolean;
    permissions?: StudyPermissions;
};

const DatasetsTable: React.FC<DatasetsTableProps> = ({ participants, removeParticipant, editMode, permissions }) => {
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
                cookiePrefix={'adminEntities-editMode' + editMode}
            />
        </div>
    );
    // return (
    //     <div>
    //         <Table style={{ width: '100%', marginBottom: '24px' }}>
    //             <Head>
    //                 <Row>
    //                     <Cell scope="col">Name</Cell>
    //                     {editMode && width > 800 && <Cell scope="col">E-mail</Cell>}
    //                     <Cell scope="col">Role</Cell>
    //                     {editMode && (
    //                         <Cell style={{ width: '10px' }} scope="col">
    //                             {''}
    //                         </Cell>
    //                     )}
    //                 </Row>
    //             </Head>
    //             <Body>
    //                 {participants &&
    //                     participants.length > 0 &&
    //                     participants.map((participant: ParticipantObj) => (
    //                         <Row key={participant.userId + participant.role} id="tableRowNoPointerNoColor">
    //                             <Cell>{participant.fullName}</Cell>
    //                             {editMode && width > 800 && <Cell align="right">{participant.emailAddress}</Cell>}
    //                             <Cell align="right">{participant.role}</Cell>
    //                             {editMode && participant.role !== studyOwner ? (
    //                                 <Cell align="right">
    //                                     {permissions?.addRemoveParticipant && (
    //                                         <Button
    //                                             variant="ghost_icon"
    //                                             onClick={() => removeParticipant(participant)}
    //                                             style={{ color: '#3D3D3D' }}
    //                                             data-cy="study_remove_participant"
    //                                         >
    //                                             <Icon name="close" style={{ cursor: 'pointer' }} size={24} />
    //                                         </Button>
    //                                     )}
    //                                 </Cell>
    //                             ) : (
    //                                 editMode && <Cell>{''}</Cell>
    //                             )}
    //                         </Row>
    //                     ))}
    //             </Body>
    //         </Table>
    //     </div>
    // );
};

DatasetsTable.defaultProps = {
    removeParticipant: undefined,
    permissions: undefined
};

export default DatasetsTable;
