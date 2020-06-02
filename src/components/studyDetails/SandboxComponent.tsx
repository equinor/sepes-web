import React from 'react';
import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowRight from '../../icons/chevron_right.svg';


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
        </div> 
    )
}



export default SandboxComponent;