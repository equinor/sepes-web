import React, { useState } from 'react';
import { Search, Button, TextField} from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';

type DatasetSearchFilterProps = {
    setFilter: (value:any) => void;
    filter: any;
    column: string;
};

const DatasetSearchFilter: React.FC<DatasetSearchFilterProps> = ({ setFilter, filter, column }) => {
    const handleOnSearchValueChange = (event) => {
        const value = event.target.value;
        setFilter({ ...filter, [column]: value });
    }

    return (
        <Search onChange = {handleOnSearchValueChange} />
    )
}

export default DatasetSearchFilter;
