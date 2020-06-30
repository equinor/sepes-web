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
            <Table style={{width: "100%"}}>
                    <Head style={{backgroundColor: "#F7F7F7", borderBottom: "2px solid #DCDCDC"}}>
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
                        <Cell>{row.name}</Cell>
                        <Cell align="right">{row.Emailaddress}</Cell>
                        <Cell align="right">{row.Role}</Cell>
                        {props.editMode ? <Cell align="right"><Icon name="close" size={24} onClick={() => props.removeParticipant(row)} /></Cell> : null }
                        </Row>
                    ))}
                    </Body>
                </Table>
        </div>
    )
}

export default DatasetsTable;
