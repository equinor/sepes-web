/* eslint-disable prefer-destructuring */
import React from 'react';
import { Search } from '@equinor/eds-core-react';

type DatasetSearchFilterProps = {
    setFilter: any;
    filter: any;
    column: string;
};

const DatasetSearchFilter: React.FC<DatasetSearchFilterProps> = ({ setFilter, filter, column }) => {
    const handleOnSearchValueChange = (event) => {
        const value = event.target.value;
        setFilter({ ...filter, [column]: value });
    };

    return <Search onChange={handleOnSearchValueChange} />;
};

export default DatasetSearchFilter;
