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
    const [filterActive, setFilterActive] = useState<boolean>(true);
    //const [filter, setFilter]
    const handleOnSearchValueChange = (event) => {
        const value = event.target.value;
        setFilter({...filter, [column]: value });
    }

    return (
        <div>
            {filterActive ? 
            <>
            <Search onChange= {handleOnSearchValueChange} />
            {/*<Button onClick={() => setFilterActive(false)}>Apply</Button>
            <Button variant='outlined'>Clear</Button>*/}</> 
        : <TextField
            onClick={() => setFilterActive(true)}
            placeholder="Filter"
            name={column}
            value={filter[column]}
            />}
        </div>
    )
}

export default DatasetSearchFilter;
