import React, { useState } from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';


const { Body, Row, Cell, Head } = Table;
const icons = {
    close
};
Icon.add(icons);

const DatasetsTable = (props: any) => {
    const { editMode, datasets } = props;
    return (
        <div>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                    <Head>
                    <Row>
                        <Cell as="th" scope="col">Dataset</Cell>
                        {editMode ? <Cell style={{ width: '10px' }} as="th" scope="col" /> : null}
                    </Row>
                    </Head>
                    <Body>
                    {datasets && datasets.map((row) => (
                        <Row key={row.id}>
                        <Cell component="th" scope="row"><Link style={{ textDecoration: 'none', color: '#000000' }} to={"/studies/" + props.studyId +"/datasets/" + row.id} >{row.name}</Link></Cell>
                        {props.editMode ? <Cell><Icon name="close" size={24} onClick={() => props.removeDataset(row)} /></Cell> :  null}
                        </Row>
                    ))}
                    </Body>
            </Table>
        </div>
    )
}

export default DatasetsTable;
