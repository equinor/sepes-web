import React, { useState } from 'react';
import { Search, Button } from '@equinor/eds-core-react';
import Delete from '../../icons/delete_to_trash.svg';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const rows = [
    {
        name: 'Equinor standard phrase',
        Email: 'test@test-cp',
        Role: 'sponsor',
    },
    {
        name: 'Equinor standard phrase',
        Email: 'test@test-cp',
        Role: 'sponsor',
    },
    {
        name: 'Equinor standard phrase',
        Email: 'test@test-cp',
        Role: 'sponsor',
    },
    {
        name: 'Equinor standard phrase',
        Email: 'test@test-cp',
        Role: 'sponsor',
    }
]

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 45px 1fr;
    width: 100%;
    grid-gap: 10px;
`;

const SearchWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 0.5fr 0.5fr;
    grid-gap: 10px;
`;

const ParicipantComponent = (props: any) => {
    return (
        <Wrapper>
            <SearchWrapper>
                <Search />
                <FormControl style={{marginTop: "-12px"}}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Sponsor">Sponsor</MenuItem>
                        <MenuItem value="Sponsor rep">Sponsor rep</MenuItem>
                        <MenuItem value="Viewer">Viewer</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined">Add participant</Button>
            </SearchWrapper>
            <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={{backgroundColor: "#F7F7F7", borderBottom: "2px solid #DCDCDC"}}>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">E-mail</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.Email}</TableCell>
                        <TableCell align="right">{row.Role}</TableCell>
                        <TableCell align="right"><img src={Delete}/></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        </Wrapper>
    )
}

export default ParicipantComponent; 