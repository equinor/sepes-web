import React, { useState, useEffect, useRef } from 'react';
import { Table, Icon, Button, Checkbox, SideSheet, Search } from '@equinor/eds-core-react';
import { checkbox } from '@equinor/eds-icons';
import styled from 'styled-components';
//import { close } from '@equinor/eds-icons';
import { DatasetObj, GeneralPermissions } from '../common/interfaces';
import { Link, useHistory } from 'react-router-dom';
import DatasetSearchFilter from '../common/customComponents/DatasetSearchFilter';
import DatasetSidesheetView from './DatasetSidesheetView';
import DropdownFilter from '../common/customComponents/DropdownFilter';
import useClickOutside from '../common/customComponents/useClickOutside';
import Cookies from 'js-cookie';

const { Body, Row, Cell, Head } = Table;
const icons = {
    checkbox
};
Icon.add(icons);

const UnstyledList = styled.ul`
    margin-top: 8px;
    right: 48px;
    padding: 0 24px 0 24px;
    z-index: 99;
    position: absolute;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0 4px 4px #e7e7e7;
`;

const ButtonWrapper = styled.div`
    display: inline-block;
    margin-left: auto;
    padding: 24px 0px 16px 0;
    float: right;
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
    sepesApproved: boolean;
}

interface filter {
    name: string;
    sourceSystem: string;
    areaL2: string;
    areaL1: string;
    asset: string;
    baDataOwner: string;
    classification: [];
    countryOfOrigin: string;
    dataId: string;
    lraId: string;
    tags: string;
    sepesApproved: string;
}

type DatasetsOverviewTableProps = {
    datasets: any;
    permissions: GeneralPermissions;
};

const DatasetsOverviewTable: React.FC<DatasetsOverviewTableProps> = ({ datasets, permissions }) => {
    const history = useHistory();
    const [toggle, setToggle] = useState(false);
    const [selectedDataset, setSelectedDataset] = useState<DatasetObj>({ name: '' });
    const [checkedColums, setCheckedColumns] = useState<checkedColumns>(
        Cookies.get('checkedColumns')
            ? JSON.parse(Cookies.get('checkedColumns'))
            : {
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
                  tags: false,
                  sepesApproved: false
              }
    );

    const [filter, setFilter] = useState<filter>({
        name: '',
        sourceSystem: '',
        areaL2: '',
        areaL1: '',
        asset: '',
        baDataOwner: '',
        classification: [],
        countryOfOrigin: '',
        dataId: '',
        lraId: '',
        tags: '',
        sepesApproved: ''
    });
    const [showColumnsPicker, setShowColumnsPicker] = useState<boolean>(false);
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, setShowColumnsPicker);

    useEffect(() => {
        document.addEventListener('keydown', listener, false);
        return () => {
            document.removeEventListener('keydown', listener, false);
        };
    }, []);
    const listener = (e: any) => {
        if (e.key === 'Escape') {
            setShowColumnsPicker(false);
        }
    };

    const handleColumnsChange = (evt) => {
        const _columns = { ...checkedColums, [evt.target.name]: evt.target.checked };
        setCheckedColumns({ ...checkedColums, [evt.target.name]: evt.target.checked });
        Cookies.set('checkedColumns', _columns, { expires: 365 });
    };

    const returnCell = (checker: any, fieldName?: string | number, header?: boolean) => {
        if (header) {
            return checker ? (
                <Cell as="th" scope="col">
                    {fieldName || ''}
                </Cell>
            ) : null;
        }
        return checker ? <Cell>{fieldName || '-'}</Cell> : null;
    };

    const returnCheckbox = (checked: boolean, label: string, name: string) => {
        return (
            <Checkbox
                checked={checked}
                label={label}
                name={name}
                value={checked.toString()}
                onChange={handleColumnsChange}
            />
        );
    };

    const returnFilter = (column: string, checker: boolean) => {
        if (checker) {
            return (
                <Cell>
                    <DatasetSearchFilter setFilter={setFilter} filter={filter} column={column} />
                </Cell>
            );
        }
    };

    const returnDropwdownFilter = (column: string, checker: boolean) => {
        if (checker) {
            return (
                <Cell>
                    <DropdownFilter setFilter={setFilter} filter={filter} column={column} />
                </Cell>
            );
        }
    };

    const redirectToCreateDataset = (): void => {
        history.push('datasets/new');
    };

    const filterList = (column: string, filterColumn: any, resDataset): Array<any> => {
        if (filterColumn !== '') {
            return resDataset.filter((dataset) => {
                if (dataset[column]) {
                    return dataset[column].toString().toLowerCase().includes(filterColumn.toString().toLowerCase());
                }
            });
        }
        return resDataset;
    };

    const filterListOptions = (column: string, filterColumn: any, resDataset) => {
        if (filterColumn.length > 0) {
            let res = resDataset;
            return combineArray(
                filterColumn.map((row: any) => {
                    return filterList(column, row, res);
                })
            );
        }
        return resDataset;
    };

    function combineArray(array: any) {
        let newArray: any = [];
        array.map((res: any, i: number) => {
            res.map((dataset: any, j: number) => {
                newArray.push(dataset);
            });
        });
        return newArray;
    }

    const applyFilter = () => {
        let retDatasets = datasets;
        retDatasets = filterList('name', filter.name, retDatasets);
        retDatasets = filterList('sourceSystem', filter.sourceSystem, retDatasets);
        retDatasets = filterList('areaL1', filter.areaL1, retDatasets);
        retDatasets = filterList('areaL2', filter.areaL2, retDatasets);
        retDatasets = filterList('asset', filter.asset, retDatasets);
        retDatasets = filterList('baDataOwner', filter.baDataOwner, retDatasets);
        retDatasets = filterListOptions('classification', filter.classification, retDatasets);
        retDatasets = filterList('countryOfOrigin', filter.countryOfOrigin, retDatasets);
        retDatasets = filterList('dataId', filter.dataId, retDatasets);
        retDatasets = filterList('lraId', filter.lraId, retDatasets);
        retDatasets = filterList('tags', filter.tags, retDatasets);
        return retDatasets;
    };

    const handleOnclick = (row: DatasetObj): void => {
        setToggle(true);
        setSelectedDataset(row);
    };

    return (
        <div style={{ padding: '0 16px 16px 16px', backgroundColor: '#ffffff' }}>
            <SideSheet
                variant="large"
                title={selectedDataset.name}
                open={toggle}
                onClose={() => setToggle(!toggle)}
                style={{ zIndex: 9999, height: 'auto', paddingBottom: '8px', position: 'fixed' }}
            >
                <DatasetSidesheetView dataset={selectedDataset} setToggle={setToggle} />
            </SideSheet>
            <ButtonWrapper>
                <Button
                    variant="outlined"
                    style={{ display: 'inline-block', marginRight: '24px' }}
                    onClick={redirectToCreateDataset}
                    data-cy="create_dataset"
                    disabled={!permissions.canEdit_PreApproved_Datasets}
                >
                    Create data set
                </Button>
                <div style={{ display: 'inline-block' }}>
                    <Button variant="outlined" onClick={() => setShowColumnsPicker(!showColumnsPicker)}>
                        Add / remove columns
                    </Button>
                    {showColumnsPicker ? (
                        <UnstyledList ref={wrapperRef}>
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
                                {returnCheckbox(checkedColums.sepesApproved, 'Sepes approved', 'sepesApproved')}
                            </li>
                        </UnstyledList>
                    ) : null}
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
                        {returnDropwdownFilter('classification', checkedColums.classification)}
                        {returnFilter('countryOfOrigin', checkedColums.countryOfOrigin)}
                        {returnFilter('dataId', checkedColums.dataId)}
                        {returnFilter('lraId', checkedColums.lraId)}
                        {returnFilter('tags', checkedColums.tags)}
                    </Row>
                    {datasets &&
                        applyFilter().map((row: DatasetObj) => (
                            <Row key={row.id} onClick={() => handleOnclick(row)} style={{ cursor: 'pointer' }}>
                                {returnCell(checkedColums.name, row.name)}
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
    );
};

export default DatasetsOverviewTable;
