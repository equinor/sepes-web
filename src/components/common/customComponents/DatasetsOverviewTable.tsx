import React, { useState } from 'react';
import { Table, Icon, Button, Checkbox } from '@equinor/eds-core-react';
import { checkbox } from '@equinor/eds-icons';
import styled from 'styled-components';
//import { close } from '@equinor/eds-icons';
import { DatasetObj } from '../../common/interfaces'


const { Body, Row, Cell, Head } = Table;
const icons = {
    checkbox
};
Icon.add(icons);

/*
export default {
    title: 'Components|Selection controls/Checkbox',
    component: Checkbox,
  }*/

const UnstyledList = styled.ul`
  margin: 0;
  padding: 0 24px 0 24px;
  z-index:99;
  position:absolute;
  background-color:white;
  border-radius:4px;
`;

const ButtonWrapper = styled.div`
  display:grid;
  grid-template-columns: 200px 200px;
  float:right;
  grid-gap:32px;
  padding:24px;
`;

interface checkedColumns {
    name?: boolean;
    sourceSystem?: boolean;
    areaL2?: string;
    areaL1?: string;
    asset?: string;
    baDataOwner?: string;
    classification?: string;
    countryOfOrigin?: string;
    dataId?: number;
    lraId?: number;
    tags?: string;
}


const DatasetsOverviewTable = (props: any) => {
    const { datasets } = props;
    const [checkedColums, setCheckedColumns] = useState<checkedColumns>({
        name: true
    });
    const [showColumnsPicker, setShowColumnsPicker] = useState<boolean>(false);
    //setCheckedColumns({ ...checkedColums, name: true });
    //const showColumnsPicker = true;
    const handleColumnsChange = (evt) => {
        setCheckedColumns({ ...checkedColums, [evt.target.name]: evt.target.checked });
    }

    const returnCell = (checker: any, fieldName?:string | number, header?:boolean) => {
        if (header) {
            return checker ? <Cell as="th" scope="col">{fieldName}</Cell> : null;
        }
        return checker ? <Cell>{fieldName}</Cell> : null;
    }

    const redirectToCreateDataset = () => {
        window.location.pathname = 'datasets/new';
    }

    return (
        <div style={{ paddingBottom: '24px' }}>
            <ButtonWrapper>
            <Button
                variant="outlined"
                onClick={redirectToCreateDataset}
            >
                Create data set
            </Button>
            <div>
            <Button
                variant="outlined"
                onClick={() => setShowColumnsPicker(!showColumnsPicker)}
            >
                Add / remove columns
            </Button>
            {showColumnsPicker ?
            <UnstyledList>
                <li style={{display:'grid'}}>
                    <Checkbox
                        checked={checkedColums?.name}
                        label="Name"
                        name="name"
                        value={checkedColums?.name}
                        onChange={handleColumnsChange}
                    />
                    <Checkbox
                        checked={checkedColums?.sourceSystem}
                        label="Source system"
                        name="sourceSystem"
                        value={checkedColums?.sourceSystem}
                        onChange={handleColumnsChange}
                    />
                    <Checkbox
                        checked={checkedColums?.areaL2}
                        label="Area L2"
                        name="areaL2"
                        value={checkedColums?.areaL2}
                        onChange={handleColumnsChange}
                    />
                    <Checkbox
                        checked={checkedColums?.areaL1}
                        label="Area L1"
                        name="areaL1"
                        value={checkedColums?.areaL1}
                        onChange={handleColumnsChange}
                    />
                    <Checkbox
                        checked={checkedColums?.asset}
                        label="Asset"
                        name="asset"
                        value={checkedColums?.asset}
                        onChange={handleColumnsChange}
                    />
                    <Checkbox
                        checked={checkedColums?.baDataOwner}
                        label="BA data owner"
                        name="baDataOwner"
                        value={checkedColums?.baDataOwner}
                        onChange={handleColumnsChange}
                    />
                    <Checkbox
                        checked={checkedColums?.classification}
                        label="Classification"
                        name="classification"
                        value={checkedColums?.classification}
                        onChange={handleColumnsChange}
                    />
                    <Checkbox
                        checked={checkedColums?.countryOfOrigin}
                        label="Country of origin"
                        name="countryOfOrigin"
                        value={checkedColums?.countryOfOrigin}
                        onChange={handleColumnsChange}
                    />
                    <Checkbox
                        checked={checkedColums?.dataId}
                        label="Data ID"
                        name="dataId"
                        value={checkedColums?.dataId}
                        onChange={handleColumnsChange}
                    />
                    <Checkbox
                        checked={checkedColums?.lraId}
                        label="LRA ID"
                        name="lraId"
                        value={checkedColums?.lraId}
                        onChange={handleColumnsChange}
                    />
                    <Checkbox
                        checked={checkedColums?.tags}
                        label="Tags"
                        name="tags"
                        value={checkedColums?.tags}
                        onChange={handleColumnsChange}
                    />
                </li>
            </UnstyledList>: null }
            </div>
            </ButtonWrapper>
            <Table style={{ width: '100%', marginBottom: '24px' }}>
                    <Head>
                    <Row>
                        {returnCell(checkedColums?.name, 'Dataset', true)}
                        {returnCell(checkedColums?.sourceSystem, 'Source system', true)}
                        {returnCell(checkedColums?.areaL2, 'Area L2', true)}
                        {returnCell(checkedColums?.areaL1, 'Area L1', true)}
                        {returnCell(checkedColums?.asset, 'Asset', true)}
                        {returnCell(checkedColums?.baDataOwner, 'BA data owner', true)}
                        {returnCell(checkedColums?.classification, 'Classification', true)}
                        {returnCell(checkedColums?.countryOfOrigin, 'Country of origin', true)}
                        {returnCell(checkedColums?.dataId, 'Data ID', true)}
                        {returnCell(checkedColums?.lraId, 'LRA ID', true)}
                        {returnCell(checkedColums?.tags, 'Tags', true)}
                    </Row>
                    </Head>
                    <Body>
                    {datasets && datasets.map((row: DatasetObj) => (
                        <Row key={row.id}>
                            {returnCell(checkedColums?.name, row.name)}
                            {returnCell(checkedColums?.sourceSystem, row.sourceSystem)}
                            {returnCell(checkedColums?.areaL2, row.areaL2)}
                            {returnCell(checkedColums?.areaL1, row.areaL1)}
                            {returnCell(checkedColums?.asset, row.asset)}
                            {returnCell(checkedColums?.baDataOwner, row.baDataOwner)}
                            {returnCell(checkedColums?.classification, row.classification)}
                            {returnCell(checkedColums?.countryOfOrigin, row.countryOfOrigin)}
                            {returnCell(checkedColums?.dataId, row.dataId)}
                            {returnCell(checkedColums?.lraId, row.lraId)}
                            {returnCell(checkedColums?.tags, row.tags)}
                        </Row>
                    ))}
                    </Body>
            </Table>
        </div>
    )
}

export default DatasetsOverviewTable;
