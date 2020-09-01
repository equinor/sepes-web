import React from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { close, chevron_right } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';

const { Body, Row, Cell, Head } = Table;
const icons = {
    close,
    chevron_right
};
Icon.add(icons);

const DatasetsTable = (props: any) => {
    const { editMode, datasets } = props;

    const returnCell = (row: any) => {
        //This means it is a study specific dataset
        if (row.studyId) {
            return (
                <Cell>
                    <Link
                        style={{ textDecoration: 'none', color: '#000000', cursor: 'pointer' }}
                        to={"/studies/" + props.studyId +"/datasets/" + row.id}
                    >
                        <Icon style={{ cursor: 'pointer' }} name="chevron_right" size={24} />
                    </Link>
                </Cell>
                    );
        }
        return (
        <Cell>
            <Icon
                style={{ cursor: 'pointer' }}
                name="close"
                size={24}
                onClick={() => props.removeDataset(row)}
            />
        </Cell>
        );
    }

    return (
        <div>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                    <Head>
                    <Row>
                        <Cell as="th" scope="col">Dataset</Cell>
                        <Cell as="th" scope="col">Sandboxes</Cell>
                        {editMode ? <Cell style={{ width: '10px' }} as="th" scope="col" /> : null}
                    </Row>
                    </Head>
                    <Body>
                    {datasets && datasets.map((row) => (
                        <Row key={row.id}>
                            <Cell component="th" scope="row">{row.name}</Cell>
                            <Cell component="th" scope="row" />
                            {editMode && returnCell(row)}
                        </Row>
                    ))}
                    </Body>
            </Table>
        </div>
    )
}

export default DatasetsTable;
