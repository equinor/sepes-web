import React from 'react';
import { render } from '@testing-library/react';
import DatasetsTable from '../../../components/studyDetails/Tables/DatasetsTable';

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
test('renders dropdown component', () => {
    const mockCallBack = jest.fn();
    const { getByText } = render(
        <DatasetsTable
            datasets={datasetsList}
            removeDataset={checkIfDatasetIsAlreadyAdded}
            editMode={true}
            studyId={1}
        />
    );
    let linkElement = getByText('test1');
    expect(linkElement).toBeInTheDocument();
});
