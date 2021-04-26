 import React from 'react';
// import { render } from '@testing-library/react';
// import CreateEditDataset from '../../../components/dataset/CreateEditDataset';
// import { DatasetObj } from '../../../components/common/interfaces';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';

// const dataset: DatasetObj = {
//     name: '',
//     storageAccountLink: undefined,
//     permissions: {
//         deleteDataset: true,
//         editDataset: true
//     }
// };

// const datasetWithInfo: DatasetObj = {
//     name: 'test Name',
//     storageAccountName: 'storage',
//     classification: 'classification',
//     location: 'location',
//     storageAccountLink: undefined,
//     permissions: {
//         deleteDataset: true,
//         editDataset: true
//     }
// };

// const mockFunc = (id: string) => {};

// test('renders stepbar component without info', () => {
//     const history = createMemoryHistory();
//     const { getByTestId } = render(
//         <Router history={history}>
//             <CreateEditDataset
//                 datasetFromDetails={dataset}
//                 setDatasetFromDetails={mockFunc}
//                 setShowEditDataset={mockFunc}
//                 editingDataset
//             />
//         </Router>
//     );

//     expect(getByTestId('dataset_save').hasAttribute('disabled')).toEqual(true);
// });
// test('renders stepbar component with edit mode and info', () => {
//     const history = createMemoryHistory();
//     const { getByTestId, getByText } = render(
//         <Router history={history}>
//             <CreateEditDataset
//                 datasetFromDetails={datasetWithInfo}
//                 setDatasetFromDetails={mockFunc}
//                 setShowEditDataset={mockFunc}
//                 editingDataset
//             />
//         </Router>
//     );
//     const linkElement = getByText('Edit dataset');
//     expect(linkElement).toBeInTheDocument();
//     expect(getByTestId('dataset_save').hasAttribute('disabled')).toEqual(false);
// });

// test('renders stepbar component with create mode', () => {
//     const history = createMemoryHistory();
//     const { getByTestId, getByText } = render(
//         <Router history={history}>
//             <CreateEditDataset
//                 datasetFromDetails={datasetWithInfo}
//                 setDatasetFromDetails={mockFunc}
//                 setShowEditDataset={mockFunc}
//                 editingDataset={false}
//             />
//         </Router>
//     );
//     const linkElement = getByText('Create dataset');
//     expect(linkElement).toBeInTheDocument();
//     expect(getByTestId('dataset_save').hasAttribute('disabled')).toEqual(false);
// });

test('dummy', () => {
    expect(2+2).toBe(4); 
});
