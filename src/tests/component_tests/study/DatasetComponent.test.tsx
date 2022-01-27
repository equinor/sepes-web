import React from 'react';
import { render } from '@testing-library/react';
import DataSetComponent from '../../../components/studyDetails/DataSet';
import { StudyObj } from '../../../components/common/interfaces';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import mockStore from 'tests/mocks/mockStore';
import { Provider } from 'react-redux';

const study: StudyObj = {
    name: 'StudyName',
    vendor: 'Bouvet',
    wbsCode: 'abc123',
    restricted: false,
    description: 'Study about fishes',
    logoUrl: 'asdwasdasd',
    id: '1',
    datasets: [
        {
            id: 1,
            name: 'dataset1'
        }
    ],
    participants: [
        {
            id: 1,
            fullName: 'participant1'
        }
    ],
    sandboxes: [
        {
            id: 1,
            name: 'sandbox1'
        }
    ],
    resultsAndLearnings: 'this is a good study',
    permissions: {
        addRemoveDataset: true,
        addRemoveParticipant: true,
        addRemoveSandbox: true,
        closeStudy: true,
        deleteStudy: true,
        readResulsAndLearnings: true,
        updateMetadata: true,
        updateResulsAndLearnings: true
    },
    wbsCodeValid: true
};

const studyWithoutPermissionToAddDataset: StudyObj = {
    name: 'StudyName',
    vendor: 'Bouvet',
    wbsCode: 'abc123',
    restricted: false,
    description: 'Study about fishes',
    logoUrl: 'asdwasdasd',
    id: '1',
    datasets: [
        {
            id: 1,
            name: 'dataset1'
        }
    ],
    participants: [
        {
            id: 1,
            fullName: 'participant1'
        }
    ],
    sandboxes: [
        {
            id: 1,
            name: 'sandbox1'
        }
    ],
    resultsAndLearnings: 'this is a good study',
    permissions: {
        addRemoveDataset: false,
        addRemoveParticipant: true,
        addRemoveSandbox: true,
        closeStudy: true,
        deleteStudy: true,
        readResulsAndLearnings: true,
        updateMetadata: true,
        updateResulsAndLearnings: true
    },
    wbsCodeValid: true
};

const mockFunc = (id: string) => {};

test('renders dataset component without permission to add dataset', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Provider store={mockStore({ studies: { study: study } })}>
            <Router history={history}>
                <DataSetComponent
                    setUpdateCache={mockFunc}
                    updateCache={mockFunc}
                    wbsIsValid
                    studySaveInProgress={false}
                    onFallBackAddressChange={mockFunc}
                />
            </Router>
        </Provider>
    );

    let linkElement = getByText('Create study specific data set');
    expect(linkElement).toBeInTheDocument();

    expect(getByText('Create study specific data set').hasAttribute('disabled')).toEqual(false);
});

test('renders dataset component with permission to add dataset', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
        <Provider store={mockStore({ studies: { study: studyWithoutPermissionToAddDataset } })}>
            <Router history={history}>
                <DataSetComponent
                    setUpdateCache={mockFunc}
                    updateCache={mockFunc}
                    wbsIsValid
                    studySaveInProgress={false}
                    onFallBackAddressChange={mockFunc}
                />
            </Router>
        </Provider>
    );

    let linkElement = getByText('Create study specific data set');
    expect(linkElement).toBeInTheDocument();

    expect(getByTestId('study_add_dataset').hasAttribute('disabled')).toEqual(true);
});
