import React from 'react';
import { render } from '@testing-library/react';
import CoreDevDropdown from '../../../components/common/customComponents/Dropdown';
// /* eslint-disable no-undef */
const checkIfDatasetIsAlreadyAdded = (id: string) => {};

const options = [
    { displayValue: 'test1', key: '1' },
    { displayValue: '2', key: '2' },
    { displayValue: '3', key: '3' },
    { displayValue: '4', key: '4' }
];
test('renders dropdown component', () => {
    //const mockCallBack = jest.fn();
    const { getByText } = render(
        <CoreDevDropdown
            label="Template"
            options={options}
            onChange={checkIfDatasetIsAlreadyAdded}
            name="template"
            meta="testMeta"
            defaultOpen
        />
    );
    let linkElement = getByText('test1');
    expect(linkElement).toBeInTheDocument();
    linkElement = getByText('testMeta');
    expect(linkElement).toBeInTheDocument();

    /*
  linkElement = getByText('test1').click();
  expect(mockCallBack.mock.calls.length).toEqual(1);
  */
});
