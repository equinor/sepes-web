import React, { useState } from 'react';
import { Table, Icon, Button, Checkbox, SideSheet } from '@equinor/eds-core-react';
import { checkbox } from '@equinor/eds-icons';
import styled from 'styled-components';
//import { close } from '@equinor/eds-icons';
import { DatasetObj } from '../common/interfaces'
import { Link, useHistory } from 'react-router-dom';
import DatasetSearchFilter from '../common/customComponents/DatasetSearchFilter';
import DatasetSidesheetView from './DatasetSidesheetView';

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

interface filter {
    name: string;
    sourceSystem: string;
    areaL2: string;
    areaL1: string;
    asset: string;
    baDataOwner: string;
    classification: string;
    countryOfOrigin: string;
    dataId: string;
    lraId: string;
    tags: string;
}

const DatasetsOverviewTable = (props: any) => {
    const history = useHistory();
    const [toggle, setToggle] = useState(false);
    const { datasets } = props;
    const [selectedDataset, setSelectedDataset] = useState<DatasetObj>({});
    const [checkedColums, setCheckedColumns] = useState<checkedColumns>({
        name: true,
        sourceSystem: true,
        areaL2: true,
        areaL1: true,
        asset: true,
        baDataOwner: false,
        classification: false,
        countryOfOrigin: false,
        dataId: false,
        lraId: false,
        tags: false
    });

    const [filter, setFilter] = useState<filter>({
        name: '',
        sourceSystem: '',
        areaL2: '',
        areaL1: '',
        asset: '',
        baDataOwner: '',
        classification: '',
        countryOfOrigin: '',
        dataId: '',
        lraId: '',
        tags: ''
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

    const returnFilter = (column: string, checker: boolean) => {
        if (checker) {
            return <Cell><DatasetSearchFilter setFilter={setFilter} filter={filter} column={column} /></Cell>
        }
    }

    const redirectToCreateDataset = (): void => {
        history.push('datasets/new');
    }

    const filterList = ( column: string, filterColumn: string, resDataset) => {
        if (filterColumn !== '') {
            return resDataset.filter(dataset => {
                if (dataset[column]) {
                    return dataset[column].toString().toLowerCase().includes(filterColumn.toString().toLowerCase());
                }
            });
        }
        else {
            return resDataset;
        }
    }

    const applyFilter = () => {
        let retDatasets = datasets;
        retDatasets = filterList('name', filter.name, retDatasets);
        retDatasets = filterList('sourceSystem', filter.sourceSystem, retDatasets);
        retDatasets = filterList('areaL1', filter.areaL1, retDatasets);
        retDatasets = filterList('areaL2', filter.areaL2, retDatasets);
        retDatasets = filterList('asset', filter.asset, retDatasets);
        retDatasets = filterList('baDataOwner', filter.baDataOwner, retDatasets);
        retDatasets = filterList('classification', filter.classification, retDatasets);
        retDatasets = filterList('countryOfOrigin', filter.countryOfOrigin, retDatasets);
        retDatasets = filterList('dataId', filter.dataId, retDatasets);
        retDatasets = filterList('lraId', filter.lraId, retDatasets);
        retDatasets = filterList('tags', filter.tags, retDatasets);
        return retDatasets;
    }

    const handleOnclick = (row:DatasetObj):void => {
        setToggle(true);
        setSelectedDataset(row);
    }

    return (
        <div style={{ padding: '0 16px 16px 16px' }}>
            <SideSheet
                variant="large"
                title={selectedDataset.name}
                open={toggle}
                onClose={() => setToggle(!toggle)}
                style={{ zIndex: '9999', height: 'auto', paddingBottom: '32px' }}
            >
                <DatasetSidesheetView dataset={selectedDataset} />
            </SideSheet>
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
                <li style={{ display: 'grid' }}>
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
                        {returnCell(checkedColums.name, 'Dataset', true)}
                        {returnCell(checkedColums.sourceSystem, 'Source system', true)}
                        {returnCell(checkedColums.areaL2, 'Area L2', true)}
                        {returnCell(checkedColums.areaL1, 'Area L1', true)}
                        {returnCell(checkedColums.asset, 'Asset', true)}
                        {returnCell(checkedColums.baDataOwner, 'BA data owner', true)}
                        {returnCell(checkedColums.classification, 'Classification', true)}
                        {returnCell(checkedColums.countryOfOrigin, 'Country of origin', true)}
                        {returnCell(checkedColums.dataId, 'Data ID', true)}
                        {returnCell(checkedColums.lraId, 'LRA ID', true)}
                        {returnCell(checkedColums.tags, 'Tags', true)}
                    </Row>
                    </Head>
                    <Body>
                        <Row key={1}>
                            {returnFilter('name', checkedColums.name)}
                            {returnFilter('sourceSystem', checkedColums.sourceSystem)}
                            {returnFilter('areaL2', checkedColums.areaL2)}
                            {returnFilter('areaL1', checkedColums.areaL1)}
                            {returnFilter('asset', checkedColums.asset)}
                            {returnFilter('baDataOwner', checkedColums.baDataOwner)}
                            {returnFilter('classification', checkedColums.classification)}
                            {returnFilter('countryOfOrigin', checkedColums.countryOfOrigin)}
                            {returnFilter('dataId', checkedColums.dataId)}
                            {returnFilter('lraId', checkedColums.lraId)}
                            {returnFilter('tags', checkedColums.tags)}
                        </Row>
                    {datasets && applyFilter().map((row: DatasetObj, i: number) => (
                        <Row
                            key={row.id}
                            onClick={() => handleOnclick(row)}
                            style={{ cursor: 'pointer' }}
                        >
                            {checkedColums.name && 
                            <Cell component="th" scope="row">
                            <div onClick={() => handleOnclick(row)}>{row.name}</div>
                            </Cell>}
                            {returnCell(checkedColums.sourceSystem, row.sourceSystem)}
                            {returnCell(checkedColums.areaL2, row.areaL2)}
                            {returnCell(checkedColums.areaL1, row.areaL1)}
                            {returnCell(checkedColums.asset, row.asset)}
                            {returnCell(checkedColums.baDataOwner, row.baDataOwner)}
                            {returnCell(checkedColums.classification, row.classification)}
                            {returnCell(checkedColums.countryOfOrigin, row.countryOfOrigin)}
                            {returnCell(checkedColums.dataId, row.dataId)}
                            {returnCell(checkedColums.lraId, row.lraId)}
                            {returnCell(checkedColums.tags, row.tags)}
                        </Row>
                    ))}
                    </Body>
            </Table>
        </div>
    )
}

export default DatasetsOverviewTable;
