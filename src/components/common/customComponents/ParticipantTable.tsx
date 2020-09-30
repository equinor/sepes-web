import React, { useState } from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';

const { Body, Row, Cell, Head } = Table;
const icons = {
    close
};
Icon.add(icons);

const DatasetsTable = (props: any) => {
    return (
        <div>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                    <Head style={{ backgroundColor: '#F7F7F7', borderBottom: '2px solid #DCDCDC' }}>
                    <Row>
                        <Cell as="th" scope="col">Name</Cell>
                        <Cell as="th" scope="col">E-mail</Cell>
                        <Cell as="th" scope="col">Role</Cell>
                        {props.editMode ? <Cell style={{ width: '10px' }} as="th" scope="col"></Cell> : null }
                    </Row>
                    </Head>
                    <Body>
                    {props.participants && props.participants.map((row) => (
                        <Row key={row.id}>
                        <Cell>{row.fullName}</Cell>
                        <Cell align="right">{row.emailAddress}</Cell>
                        <Cell align="right">{row.role}</Cell>
                        {props.editMode ? <Cell align="right"><Icon name="close" style={{ cursor: 'pointer' }} size={24} onClick={() => props.removeParticipant(row)} /></Cell> : null }
                        </Row>
                    ))}
                    </Body>
                </Table>
        </div>
    )
}

export default DatasetsTable;
