import React from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { chevron_right } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../../../styles/Table.scss';

const { Body, Row, Cell, Head } = Table;
const icons = {
    chevron_right
};
Icon.add(icons);

type SandboxTableProps = {
    sandboxes: any;
};

const SandboxTable: React.FC<SandboxTableProps> = ({ sandboxes }) => {
    const studyId = window.location.pathname.split('/')[2];
    const history = useHistory();
    const returnCell = (value: string, sandboxId: string, type: 'icon' | 'text') => {
        //This means it is a study specific dataset
        return <Cell>{type === 'icon' ? <Icon name="chevron_right" size={24} /> : value}</Cell>;
    };

    const redirectOnCellClick = (row: any) => {
        if (studyId && row.id) {
            history.push('/studies/' + studyId + '/sandboxes/' + row.id);
        }
    };
    return (
        <div>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                <Head>
                    <Row>
                        <Cell scope="col">Sandbox</Cell>
                        <Cell style={{ width: '10px' }} scope="col">
                            {''}
                        </Cell>
                    </Row>
                </Head>
                <Body>
                    {sandboxes && sandboxes.length > 0 ? (
                        sandboxes.map((row) => (
                            <Row key={row.id} id="tableRow" onClick={() => redirectOnCellClick(row)}>
                                {returnCell(row.name, row.id, 'text')}
                                {returnCell('', row.id, 'icon')}
                            </Row>
                        ))
                    ) : (
                        <Row key={1} id="tableRow">
                            <Cell>No sandboxes added</Cell>
                            <Cell>{''}</Cell>
                        </Row>
                    )}
                </Body>
            </Table>
        </div>
    );
};

export default SandboxTable;
