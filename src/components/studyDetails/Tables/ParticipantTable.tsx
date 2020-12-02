import React from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import { ParticipantObj, StudyPermissions } from '../../common/interfaces';
import { studyOwner } from '../../common/Roles';
import useWindowDimensions from '../../common/hooks/useWindowDimensions';

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
    const { height, width } = useWindowDimensions();
    return (
        <div>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                <Head>
                    <Row>
                        <Cell as="th" scope="col">
                            Name
                        </Cell>
                        {editMode && width > 800 && (
                            <Cell as="th" scope="col">
                                E-mail
                            </Cell>
                        )}
                        <Cell as="th" scope="col">
                            Role
                        </Cell>
                        {editMode && (
                            <Cell style={{ width: '10px' }} as="th" scope="col">
                                {''}
                            </Cell>
                        )}
                    </Row>
                </Head>
                <Body>
                    {participants &&
                        participants.map((participant: ParticipantObj) => (
                            <Row key={participant.userId + participant.role}>
                                <Cell>{participant.fullName}</Cell>
                                {editMode && width > 800 && <Cell align="right">{participant.emailAddress}</Cell>}
                                <Cell align="right">{participant.role}</Cell>
                                {editMode && participant.role !== studyOwner ? (
                                    <Cell align="right">
                                        {permissions?.addRemoveParticipant && (
                                            <Icon
                                                name="close"
                                                style={{ cursor: 'pointer' }}
                                                size={24}
                                                onClick={() => removeParticipant(participant)}
                                            />
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
