import React from 'react';
import { Button, Table, Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { chevron_right } from '@equinor/eds-icons';

const { Body, Row, Cell, Head } = Table;
const icons = {
    chevron_right
};
Icon.add(icons);

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 35px 1fr;
    grid-gap: 23px;
`;

const SandboxComponent = (props: any) => {

    const rows = [
        {
            name: 'Equinor standard phrases',
        },
        {
            name: 'Equinor standard phrases',
        },
        {
            name: 'Equinor standard phrases',
        }
    ]

    return (
        <div>
            <Button variant="outlined">Add sandbox</Button>
            <Table style={{width: "100%"}}>
                <Head style={{backgroundColor: "#F7F7F7"}}>
                    <Row>
                        <Cell as="th" scope="col">Sandbox</Cell>
                        <Cell as="th" scope="col"></Cell>
                    </Row>
                </Head>
                <Body>
                {rows.map((row) => (
                        <Row>
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

/*
<TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={{backgroundColor: "#F7F7F7", borderBottom: "2px solid #DCDCDC"}}>
                    <TableRow>
                        <TableCell>Sandbox</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right"><img src={ArrowRight}/></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
*/

export default SandboxComponent;