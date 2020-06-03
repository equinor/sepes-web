import React, { useState } from 'react';
import { Search, Button, Table, Icon } from '@equinor/eds-core-react';
import { delete_to_trash } from '@equinor/eds-icons';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const { Body, Row, Cell, Head } = Table;
const icons = {
    delete_to_trash
};
Icon.add(icons);

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
                <Table style={{width: "100%"}}>
                    <Head style={{backgroundColor: "#F7F7F7", borderBottom: "2px solid #DCDCDC"}}>
                    <Row>
                        <Cell as="th" scope="col">Name</Cell>
                        <Cell as="th" scope="col">E-mail</Cell>
                        <Cell as="th" scope="col">Role</Cell>
                        <Cell as="th" scope="col"></Cell>
                    </Row>
                    </Head>
                    <Body>
                    {rows.map((row) => (
                        <Row key={row.name}>
                        <Cell>
                            {row.name}
                        </Cell>
                        <Cell align="right">{row.Email}</Cell>
                        <Cell align="right">{row.Role}</Cell>
                        <Cell align="right"><Icon name="delete_to_trash" size={24} /></Cell>
                        </Row>
                    ))}
                    </Body>
                </Table>
            </div>
        </Wrapper>
    )
}

export default ParicipantComponent; 