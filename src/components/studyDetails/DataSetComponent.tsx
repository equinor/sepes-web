import React from 'react';
import { Search } from '@equinor/eds-core-react'
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Wrapper = styled.div`
    display: grid;
    grid-template-rowns: 1fr 1fr;
    width: 100%;
    grid-gap: 10px;
`;

const DataSetComponent = (props: any) => {

    const rows = [
        {
            name: 'Equinor standard phrase',
        },
        {
            name: 'Abbreviations',
        }
    ]

    return (
        <Wrapper>
            <div>
                <Search />
            </div>
            <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={{backgroundColor: "#F7F7F7", borderBottom: "2px solid #DCDCDC"}}>
                    <TableRow>
                        <TableCell>Dataset</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        </Wrapper>
    )
}



export default DataSetComponent;