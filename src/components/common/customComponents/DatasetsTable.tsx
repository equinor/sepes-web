import React, {useEffect} from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { EquinorIcon } from '../StyledComponents';

const { Body, Row, Cell, Head } = Table;

const DatasetsTable = (props: any) => {
    const { editMode, datasets } = props;
    const returnCell = (row: any, value:string, type: 'text' | 'icon') => {
        //This means it is a study specific dataset
        if (row.studyId) {
            return (
                <Cell>
                    <Link
                        style={{ textDecoration: 'none', color: '#000000', cursor: 'pointer' }}
                        to={"/studies/" + props.studyId +"/datasets/" + row.id}
                    >
                        {type === 'icon' ? EquinorIcon('chevron_right', '', 24, () => {}, true) : value}
                    </Link>
                </Cell>
                    );
        }
        return (
        <Cell>
            {editMode && type === 'icon' ? EquinorIcon('close', '', 24, () => props.removeDataset(row), true) : value}
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
                            {returnCell(row, row.name, 'text')}
                            {returnCell(row, '', 'text')}
                            {returnCell(row, '', 'icon')}
                        </Row>
                    )):
                    <Row key={1}>
                            <Cell component="th" scope="row">No datasets added</Cell>
                            <Cell component="th" scope="row">{''}</Cell>
                            <Cell component="th" scope="row">{''}</Cell>
                    </Row>
                    }
                    </Body>
            </Table>
        </div>
    )
}

export default DatasetsTable;
