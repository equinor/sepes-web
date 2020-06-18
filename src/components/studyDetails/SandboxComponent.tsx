import React from 'react';
import { Button, Table, Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { chevron_right } from '@equinor/eds-icons';

const { Body, Row, Cell, Head } = Table;
const icons = {
    chevron_right
};
Icon.add(icons);

const SandboxComponent = (props: any) => {

    return (
        <div>
            <Button variant="outlined" style={{ float: 'right', marginBottom: '20px' }}>Add resource</Button>
            <Table style={{ width: '100%' }}>
                <Head style={{ backgroundColor: '#F7F7F7' }}>
                    <Row>
                        <Cell as="th" scope="col">Sandbox</Cell>
                        <Cell style={{ width: '10px' }} as="th" scope="col"></Cell>
                    </Row>
                </Head>
                <Body>
                {props.sandBoxes && props.sandBoxes.map((row) => (
                        <Row key={row.name}>
                        <Cell>
                            {row.name}
                        </Cell>
                        <Cell><Icon name="chevron_right" size={24} /></Cell>
                        </Row>
                    ))}
                </Body>
            </Table>
        </div>
    )
}

export default SandboxComponent;