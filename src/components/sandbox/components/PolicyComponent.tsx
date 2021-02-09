import React from 'react';
import { Table, Checkbox } from '@equinor/eds-core-react';
import '../../../styles/Table.scss';
import { DatasetClassificationObj } from '../../common/interfaces';
const { Body, Row, Cell, Head } = Table;

type DatasetProps = {
    displayCheckbox?: boolean;
    sandboxDatasetRestriction?: DatasetClassificationObj;
};

const Dataset: React.FC<DatasetProps> = ({ displayCheckbox, sandboxDatasetRestriction }) => {
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
                        <Cell>{sandboxDatasetRestriction?.restrictionDisplayText}</Cell>
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
