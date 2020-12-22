import React from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { chevron_right } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';

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
    const returnCell = (value: string, sandboxId: string, type: 'icon' | 'text') => {
        //This means it is a study specific dataset
        return (
            <Cell>
                <Link
                    style={{ color: '#000000', cursor: 'pointer' }}
                    to={'/studies/' + studyId + '/sandboxes/' + sandboxId}
                >
                    {type === 'icon' ? <Icon name="chevron_right" size={24} /> : value}
                </Link>
            </Cell>
        );
    };
    return (
        <div>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                <Head>
                    <Row>
                        <Cell as="th" scope="col">
                            Sandbox
                        </Cell>
                        <Cell style={{ width: '10px' }} as="th" scope="col">
                            {''}
                        </Cell>
                    </Row>
                </Head>
                <Body>
                    {sandboxes && sandboxes.length > 0 ? (
                        sandboxes.map((row) => (
                            <Row key={row.id}>
                                {returnCell(row.name, row.id, 'text')}
                                {returnCell('', row.id, 'icon')}
                            </Row>
                        ))
                    ) : (
                        <Row key={1}>
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
