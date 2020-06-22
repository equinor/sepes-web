import React from 'react';
import { Search, Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { close } from '@equinor/eds-icons';
import { Table, Icon } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';

const { Body, Row, Cell, Head } = Table;
const icons = {
    close
};
Icon.add(icons);

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 20px 20px 1fr;
    grid-gap: 23px;
`;

const Bar = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.3fr 1fr;
    margin-left: 50%;
    @media (max-width: 768px) {
        margin-left: 0;
    }
`;

const removeDataset= (name:string) => {
    alert('Remove dataset with name: ' + name + ' ?');
}

const DataSetComponent = (props: any) => {
    return (
        <Wrapper>
            <Bar>
                <Button variant="outlined">Add study specific data set</Button>
                <span style={{ textAlign: 'center' }}>or</span>
                <Search placeHolder="Add data set from catalogue" />
            </Bar>
            <Link to="/" style={{ color: '#007079', float: 'right', marginLeft: 'auto' }}>Advanced search</Link>
            <div>
                <Table style={{ width: '100%' }}>
                    <Head>
                    <Row>
                        <Cell as="th" scope="col">Dataset</Cell>
                        <Cell style={{ width: '10px' }} as="th" scope="col" />
                    </Row>
                    </Head>
                    <Body>
                    {props.dataSets && props.dataSets.map((row) => (
                        <Row key={row.name}>
                        <Cell component="th" scope="row">{row.name}</Cell>
                        <Cell><Icon name="close" size={24} onClick={() => removeDataset(row.name)} /></Cell>
                        </Row>
                    ))}
                    </Body>
                </Table>
            </div>
        </Wrapper>
    )
}

export default DataSetComponent;
