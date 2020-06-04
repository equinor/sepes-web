import React from 'react';
import { Search } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { delete_to_trash } from '@equinor/eds-icons';
import { Table, Icon } from '@equinor/eds-core-react';

const { Body, Row, Cell, Head } = Table;
const icons = {
    delete_to_trash
};
Icon.add(icons);

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 35px 1fr;
    grid-gap: 23px;
`;

const DataSetComponent = (props: any) => {


    return (
        <Wrapper>
            <div>
                <Search />
            </div>
            <div>
                <Table style={{width: "100%"}}>
                    <Head>
                    <Row>
                        <Cell as="th" scope="col">Dataset</Cell>
                        <Cell as="th" scope="col"></Cell>
                    </Row>
                    </Head>
                    <Body>
                    {props.dataSets && props.dataSets.map((row) => (
                        <Row key={row.name}>
                        <Cell component="th" scope="row">{row.name}</Cell>
                        <Cell align="right"><Icon name="delete_to_trash" size={24} /></Cell>
                        </Row>
                    ))}
                    </Body>
                </Table>
            </div>
        </Wrapper>
    )
}



export default DataSetComponent;