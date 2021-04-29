import React from 'react';
import { Table } from '@equinor/eds-core-react';
import '../../../styles/Table.scss';
import { SandboxObj } from '../../common/interfaces';
import { lineBreak } from 'components/common/helpers/helpers';

const { Body, Row, Cell, Head } = Table;

type DatasetProps = {
    displayCheckbox?: boolean;
    sandbox: SandboxObj;
};

const Dataset: React.FC<DatasetProps> = ({ displayCheckbox, sandbox }) => {
    return (
        <>
            <Table style={{ width: '100%', marginBottom: '24px', marginRight: '86px' }}>
                <Head>
                    <Row>
                        <Cell scope="col">Data set restrictions</Cell>
                    </Row>
                </Head>
                <Body>
                    <Row key={1} id="tableRowNoPointerNoColor">
                        <Cell style={{ padding: '16px' }}>{lineBreak(sandbox.restrictionDisplayText)}</Cell>
                    </Row>
                </Body>
            </Table>
            {displayCheckbox && (
                <div style={{ marginTop: '32px' }}>
                    {/*<Checkbox checked label="Retain data when decomissioning sandbox" />*/}
                </div>
            )}
        </>
    );
};

export default Dataset;
