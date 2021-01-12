import React from 'react';
import { render } from '@testing-library/react';
import SearchWithDropdown from './SearchWithDropdown';

const checkIfDatasetIsAlreadyAdded = (id: string) => {};

const datasetsList = [
    {
        name: 'test1',
        id: '1'
    },
    {
        name: 'test2',
        id: '2'
    }
];
/* eslint-disable no-undef */
const isOpen = true;

test('renders learn react link', () => {
    const mockCallBack = jest.fn();
    const { getByText } = render(
        <SearchWithDropdown
            handleOnClick={mockCallBack}
            arrayList={datasetsList}
            isOpen={isOpen}
            filter={checkIfDatasetIsAlreadyAdded}
        />
    );
    let linkElement = getByText('test1');
    expect(linkElement).toBeInTheDocument();
    getByText('test1').click();
    expect(mockCallBack.mock.calls.length).toEqual(1);
});
