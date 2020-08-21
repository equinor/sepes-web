import React, { useState } from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { chevron_right } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';


const { Body, Row, Cell, Head } = Table;
const icons = {
    chevron_right
};
Icon.add(icons);

const studyId = window.location.pathname.split('/')[2];
const SandboxTable = (props: any) => {
    return (
        <div>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                <Head style={{ backgroundColor: '#F7F7F7' }}>
                    <Row>
                        <Cell as="th" scope="col">Sandbox</Cell>
                        <Cell style={{ width: '10px' }} as="th" scope="col"></Cell>
                    </Row>
                </Head>
                <Body>
                {props.sandboxes && props.sandboxes.map((row) => (
                        <Row key={row.name}>
                        <Cell>
                        <Link style={{ textDecoration: 'none', color: '#000000', cursor: 'pointer' }} to={"/studies/" + studyId +"/sandboxes/" + row.id} >
                            {row.name}
                        </Link>
                        </Cell>
                        <Cell><Icon name="chevron_right" size={24} /></Cell>
                        </Row>
                    ))}
                </Body>
            </Table>
        </div>
    )
}

export default SandboxTable;
