import React, { useState } from 'react';
import styled from 'styled-components';
import { Search } from '@equinor/eds-core-react';
import { Label } from '../StyledComponents';

const DatasetItem = styled.div`
    padding: 16px;
    z-index:99;
    cursor: pointer;
    &:hover {
        background-color: #D5EAF4;
    }
`;

const Wrapper = styled.div<{ isOpen: any }>`
    background-color: #ffffff;
    box-shadow: 2px 2px #E7E7E7;
    border-radius: 4px;
    z-index:99;
    max-height: 300px;
    overflow: auto;
    box-shadow: ${(props: any) => (props.isOpen ? "0 0 4px 4px #E7E7E7" : "")};
    
`;

const SearchWithDropdown = (props: any) => {
    const [searchValue, setSearchValue] = useState('');
    const handleOnSearchValueChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
    }
    return (
        <div>
            <Label style={{marginTop: '-16px'}}>{props.label}</Label>
            <Search onChange={handleOnSearchValueChange} value={props.text || searchValue} placeholder="Type to search" label="test" />
                    <Wrapper isOpen={props.isOpen}>
                    {(props.isOpen || searchValue)  && props.arrayList && props.arrayList.map((row: any) => (
                        row.name.toLowerCase().includes(searchValue.toLowerCase()) && !props.filter(row.id) ? <DatasetItem key={row.id} onClick={() => { props.handleOnClick(row); }}>{row.name}</DatasetItem> : null
                    ))}
                    </Wrapper>
        </div>
    )
}

export default SearchWithDropdown;
