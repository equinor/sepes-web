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

const UnstyledList = styled.ul`
  margin-Top: 8px;
  padding: 0 24px 0 24px;
  z-index:99;
  position:absolute;
  background-color:white;
  border-radius:4px;
  box-shadow: 0 0 4px 4px #E7E7E7
`;

const ButtonWrapper = styled.div`
  display:grid;
  grid-template-columns: 200px 200px;
  float:right;
  grid-gap:32px;
  padding:24px;
`;

interface checkedColumns {
    name: boolean;
    sourceSystem: boolean;
    areaL2: boolean;
    areaL1: boolean;
    asset: boolean;
    baDataOwner: boolean;
    classification: boolean;
    countryOfOrigin: boolean;
    dataId: boolean;
    lraId: boolean;
    tags: boolean;
}


const DatasetsOverviewTable = (props: any) => {
    const { datasets } = props;
    const [checkedColums, setCheckedColumns] = useState<checkedColumns>({
        name: true,
        sourceSystem: true,
        areaL2: true,
        areaL1: true,
        asset: true,
        baDataOwner: true,
        classification: true,
        countryOfOrigin: true,
        dataId: true,
        lraId: true,
        tags: true
    });
    const [showColumnsPicker, setShowColumnsPicker] = useState<boolean>(false);
    const handleColumnsChange = (evt) => {
        setCheckedColumns({ ...checkedColums, [evt.target.name]: evt.target.checked });
    }

    const returnCell = (checker: any, fieldName?:string | number, header?:boolean) => {
        if (header) {
            return checker ? <Cell as="th" scope="col">{fieldName}</Cell> : null;
        }
        return checker ? <Cell>{fieldName}</Cell> : null;
    }

    const returnCheckbox = (checked: boolean, label: string, name: string) => {
        return (
            <Checkbox
                checked={checked}
                label={label}
                name={name}
                value={checked}
                onChange={handleColumnsChange}
                defaultChecked
            />
        )
    }

    const redirectToCreateDataset = (): void => {
        window.location.pathname = 'datasets/new';
    }

    return (
        <div style={{ padding: '0 16px 600px 16px' }}>
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
                    {returnCheckbox(checkedColums.name, 'Name', 'name')}
                    {returnCheckbox(checkedColums.sourceSystem, 'Source system', 'sourceSystem')}
                    {returnCheckbox(checkedColums.areaL2, 'Area L2', 'areaL2')}
                    {returnCheckbox(checkedColums.areaL1, 'Area L1', 'areaL1')}
                    {returnCheckbox(checkedColums.asset, 'Asset', 'asset')}
                    {returnCheckbox(checkedColums.baDataOwner, 'BA data owner', 'baDataOwner')}
                    {returnCheckbox(checkedColums.classification, 'Classification', 'classification')}
                    {returnCheckbox(checkedColums.countryOfOrigin, 'Country of origin', 'countryOfOrigin')}
                    {returnCheckbox(checkedColums.dataId, 'Data ID', 'dataId')}
                    {returnCheckbox(checkedColums.lraId, 'LRA ID', 'lraId')}
                    {returnCheckbox(checkedColums.tags, 'Tags', 'tags')}
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
