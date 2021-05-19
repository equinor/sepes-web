/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Table, Icon, Button } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import { ParticipantObj, StudyPermissions } from '../../common/interfaces';
import { studyOwner } from '../../common/staticValues/Roles';
import useWindowDimensions from '../../common/hooks/useWindowDimensions';
import '../../../styles/Table.scss';

const { Body, Row, Cell, Head } = Table;
const icons = {
    close
};
Icon.add(icons);

type DatasetsTableProps = {
    participants: any;
    removeParticipant?: any;
    editMode: boolean;
    permissions?: StudyPermissions;
};

const DatasetsTable: React.FC<DatasetsTableProps> = ({ participants, removeParticipant, editMode, permissions }) => {
    const { width } = useWindowDimensions();
    return (
        <div>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                <Head>
                    <Row>
                        <Cell scope="col">Name</Cell>
                        {editMode && width > 800 && <Cell scope="col">E-mail</Cell>}
                        <Cell scope="col">Role</Cell>
                        {editMode && (
                            <Cell style={{ width: '10px' }} scope="col">
                                {''}
                            </Cell>
                        )}
                    </Row>
                </Head>
                <Body>
                    {participants &&
                        participants.length > 0 &&
                        participants.map((participant: ParticipantObj) => (
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
                                            >
                                                <Icon name="close" style={{ cursor: 'pointer' }} size={24} />
                                            </Button>
                                        )}
                                    </Cell>
                                ) : (
                                    editMode && <Cell>{''}</Cell>
                                )}
                            </Row>
                        ))}
                </Body>
            </Table>
        </div>
    );
};

export default DatasetsTable;
