import React from 'react';
import { render } from '@testing-library/react';
import CreateEditDataset from '../../../components/dataset/CreateEditDataset';
import { DatasetObj } from '../../../components/common/interfaces';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import mockStore from 'tests/mocks/mockStore';
jest.mock('react-keyed-file-browser', () => jest.fn(() => {}));

const dataset: DatasetObj = {
    name: '',
    storageAccountLink: undefined,
    permissions: {
        deleteDataset: true,
        editDataset: true
    },
    studyName: ''
};

const datasetWithInfo: DatasetObj = {
    name: 'test Name',
    storageAccountName: 'storage',
    classification: 'classification',
    location: 'location',
    storageAccountLink: undefined,
    permissions: {
        deleteDataset: true,
        editDataset: true
    },
    studyName: ''
};

const mockFunc = (id: string) => {};

test('renders stepbar component without info', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
        <Provider store={mockStore({ datasets: { dataset: dataset } })}>
            <Router history={history}>
                <CreateEditDataset setShowEditDataset={mockFunc} editingDataset isStandardDataset={false} />
            </Router>
        </Provider>
    );

    expect(getByTestId('dataset_save').hasAttribute('disabled')).toEqual(true);
});
test('renders stepbar component with edit mode and info', () => {
    const history = createMemoryHistory();
    const { getByTestId, getByText } = render(
        <Provider store={mockStore({ datasets: { dataset: datasetWithInfo } })}>
            <Router history={history}>
                <CreateEditDataset setShowEditDataset={mockFunc} editingDataset isStandardDataset={false} />
            </Router>
        </Provider>
    );
    const linkElement = getByText('Edit dataset');
    expect(linkElement).toBeInTheDocument();
    expect(getByTestId('dataset_save').hasAttribute('disabled')).toEqual(false);
});

test('renders stepbar component with create mode', () => {
    const history = createMemoryHistory();
    const { getByTestId, getByText } = render(
        <Provider store={mockStore({ datasets: { dataset: datasetWithInfo } })}>
            <Router history={history}>
                <CreateEditDataset setShowEditDataset={mockFunc} editingDataset={false} isStandardDataset={false} />
            </Router>
        </Provider>
    );
    const linkElement = getByText('Create dataset');
    expect(linkElement).toBeInTheDocument();
    expect(getByTestId('dataset_save').hasAttribute('disabled')).toEqual(false);
});
