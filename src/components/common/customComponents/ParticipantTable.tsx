import React, { useState } from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import { ParticipantObj } from '../interfaces';
import { studyOwner } from '../Roles';

const { Body, Row, Cell, Head } = Table;
const icons = {
    close
};
Icon.add(icons);

type DatasetsTableProps = {
    participants:any;
    removeParticipant?:any;
    editMode:boolean;
};

const DatasetsTable: React.FC<DatasetsTableProps> = ({participants, removeParticipant, editMode}) => {
    return (
        <div>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                    <Head style={{ backgroundColor: '#F7F7F7', borderBottom: '2px solid #DCDCDC' }}>
                    <Row>
                        <Cell as="th" scope="col">Name</Cell>
                        {editMode && <Cell as="th" scope="col">E-mail</Cell>}
                        <Cell as="th" scope="col">Role</Cell>
                        {editMode && <Cell style={{ width: '10px' }} as="th" scope="col" />}
                    </Row>
                    </Head>
                    <Body>
                    {participants && participants.map((participant: ParticipantObj) => (
                        <Row key={participant.id}>
                            <Cell>{participant.fullName}</Cell>
                            {editMode && <Cell align="right">{participant.emailAddress}</Cell>}
                            <Cell align="right">{participant.role}</Cell>
                            {editMode && participant.role !== studyOwner ?
                            <Cell align="right">
                                <Icon
                                    name="close"
                                    style={{ cursor: 'pointer' }}
                                    size={24}
                                    onClick={() => removeParticipant(participant)}
                                />
                            </Cell>: editMode && <Cell /> }
                        </Row>
                    ))}
                    </Body>
            </Table>
        </div>
    )
}

export default DatasetsTable;
