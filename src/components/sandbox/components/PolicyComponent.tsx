import React from 'react';
import { Table, Checkbox } from '@equinor/eds-core-react';
const { Body, Row, Cell, Head } = Table;

type DatasetProps = {
    displayCheckbox?: boolean;
};

const Dataset: React.FC<DatasetProps> = ({ displayCheckbox }) => {
    return (
        <>
            <Table style={{ width: '100%', marginBottom: '24px', marginRight: '86px' }}>
                <Head>
                    <Row>
                        <Cell as="th" scope="col">
                            Data set restrictions
                        </Cell>
                    </Row>
                </Head>
                <Body>
                    <Row key={1}>
                        <Cell>
                            Restricted data - Outbound internet traffic cannot be opened. Strict inbound rules. Data
                            traffic will be suspended if exceeding 500 MB
                        </Cell>
                    </Row>
                </Body>
            </Table>
            {displayCheckbox && (
                <div style={{ marginTop: '32px' }}>
                    <Checkbox checked label="Retain data when decomissioning sandbox" />
                </div>
            )}
        </>
    );
};

export default Dataset;
