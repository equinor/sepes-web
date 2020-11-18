import React, { useState } from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { chevron_right } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';


const { Body, Row, Cell, Head } = Table;
const icons = {
    chevron_right
};
Icon.add(icons);

const SandboxTable = (props: any) => {
    const studyId = window.location.pathname.split('/')[2];
    const returnCell = (value:string, sandboxId:string, type:'icon' | 'text') => {
        //This means it is a study specific dataset
        return (
            <Cell>
                <Link
                    style={{ color: '#000000', cursor: 'pointer' }}
                    to={"/studies/" + studyId +"/sandboxes/" + sandboxId}
                >
                    {type === 'icon' ? <Icon name="chevron_right" size={24} /> : value}
                </Link>
            </Cell>
                );
    };
    return (
        <div>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                <Head style={{ backgroundColor: '#F7F7F7' }}>
                    <Row>
                        <Cell as="th" scope="col">Sandbox</Cell>
                        <Cell style={{ width: '10px' }} as="th" scope="col" >{""}</Cell>
                    </Row>
                </Head>
                <Body>
                {props.sandboxes && props.sandboxes.length > 0 ? props.sandboxes.map((row) => (
                        <Row key={row.name}>
                            {returnCell(row.name, row.id, 'text')}
                            {returnCell('', row.id, 'icon')}
                        </Row>
                    )):
                    <Row key={1}>
                            <Cell component="th" scope="row">No sandboxes added</Cell>
                            <Cell component="th" scope="row" >{""}</Cell>
                    </Row>
                    }
                </Body>
            </Table>
        </div>
    )
}

export default SandboxTable;
