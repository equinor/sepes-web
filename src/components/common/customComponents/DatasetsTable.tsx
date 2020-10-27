import React, {useEffect} from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { EquinorIcon } from '../StyledComponents';

const { Body, Row, Cell, Head } = Table;

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
                        {EquinorIcon('chevron_right', '', 24, () => {}, true)}
                    </Link>
                </Cell>
                    );
        }
        return (
        <Cell>
            {editMode && EquinorIcon('close', '', 24, () => props.removeDataset(row), true)}
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
                        <Cell style={{ width: '10px' }} as="th" scope="col">{""}</Cell>
                    </Row>
                    </Head>
                    <Body>
                    {datasets && datasets.length > 0 ? datasets.map((row) => (
                        <Row key={row.id}>
                            <Cell component="th" scope="row">{row.name}</Cell>
                            <Cell component="th" scope="row">{""}</Cell>
                            {returnCell(row)}
                        </Row>
                    )):
                    <Row key={1}>
                            <Cell component="th" scope="row">No datasets added</Cell>
                            <Cell component="th" scope="row">{""}</Cell>
                    </Row>
                    }
                    </Body>
            </Table>
        </div>
    )
}

export default DatasetsTable;
