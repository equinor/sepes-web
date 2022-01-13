/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { useHistory } from 'react-router-dom';
import '../../../styles/Table.scss';
import { getStudyId } from '../../../utils/CommonUtil';
import TextTruncate from 'components/common/customComponents/infoDisplayComponents/TextTruncate';

const { Body, Row, Cell, Head } = Table;

type SandboxTableProps = {
    sandboxes: any;
    onFallAddressBackChange: any;
};

const SandboxTable: React.FC<SandboxTableProps> = ({ sandboxes, onFallAddressBackChange }) => {
    const studyId = getStudyId();
    const history = useHistory();
    const returnCell = (value: string, sandboxId: string, type: 'icon' | 'text') => {
        //This means it is a study specific dataset
        return (
            <Cell>
                {type === 'icon' ? <Icon name="chevron_right" size={24} /> : <TextTruncate inputText={value} />}
            </Cell>
        );
    };

    const redirectOnCellClick = (row: any) => {
        if (studyId && row.id) {
            const url = '/studies/' + studyId + '/sandboxes/' + row.id;
            history.push(url);
            onFallAddressBackChange(url);
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
                        <Row key={1} id="tableRowNoPointerNoColor">
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
