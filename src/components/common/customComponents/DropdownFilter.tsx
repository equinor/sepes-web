import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Checkbox } from '@equinor/eds-core-react';

const Wrapper = styled.div`
    background-color: #ffffff;
    box-shadow: 2px 2px #E7E7E7;
    padding: 16px;
    border-radius: 4px;
    z-index:99;
    max-height: 300px;
    overflow: auto;
    position: absolute;
    width: 300px
    display: block;
    
`;

const options = [
    { displayValue: 'Open', key: 'Open' },
    { displayValue: 'Internal', key: 'Internal' },
    { displayValue: 'Restricted', key: 'Restricted' }
];

type DatasetSearchFilterProps = {
    setFilter: (value: any) => void;
    filter: any;
    column: string;
};
let filterList: any = [];
const DropdownFilter: React.FC<DatasetSearchFilterProps> = ({ setFilter, filter, column }) => {
    const [searchValue, setSearchValue] = useState('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOnSearchValueChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
    };

    const handleColumnsChange = (event) => {
        setSearchValue('');
        const value = event.target.name;
        if (!filterList.includes(value)) {
            filterList.push(value);
        } else {
            let indexOfElement = filterList.indexOf(value);
            filterList.splice(indexOfElement, 1);
        }
        setFilter({ ...filter, [column]: filterList });
    };

    const printItemsInArray = () => {
        if (!isOpen) {
            let stringBuilder = '';
            filterList.forEach((element) => {
                stringBuilder += element + ', ';
            });
            return stringBuilder;
        } else {
            return searchValue;
        }
    };

    const isCheckboxChecked = (name: any) => {
        if (filterList.includes(name)) {
            return true;
        }
        return false;
    };
    return (
        <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <Search onChange={handleOnSearchValueChange} value={printItemsInArray()} />
            {isOpen && (
                <Wrapper>
                    {(searchValue || isOpen) &&
                        options &&
                        options.map(
                            (row: any) =>
                                row.displayValue.includes(searchValue) && (
                                    <div key={row.key}>
                                        <Checkbox
                                            label={row.displayValue}
                                            name={row.displayValue}
                                            onChange={handleColumnsChange}
                                            checked={isCheckboxChecked(row.displayValue)}
                                        />
                                    </div>
                                )
                        )}
                </Wrapper>
            )}
        </div>
    );
};

export default DropdownFilter;
