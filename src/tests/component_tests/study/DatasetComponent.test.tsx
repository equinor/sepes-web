import React from 'react';
import { render } from '@testing-library/react';
import DataSetComponent from '../../../components/studyDetails/DataSet';
import { StudyObj } from '../../../components/common/interfaces';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

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
        <Router history={history}>
            <DataSetComponent
                study={study}
                setStudy={mockFunc}
                setUpdateCache={mockFunc}
                updateCache={mockFunc}
                wbsIsValid
                studySaveInProgress={false}
                onFallAddressBackChange={mockFunc}
            />
        </Router>
    );

    let linkElement = getByText('Create study specific data set');
    expect(linkElement).toBeInTheDocument();

    expect(getByText('Create study specific data set').hasAttribute('disabled')).toEqual(false);
});

test('renders dataset component with permission to add dataset', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
        <Router history={history}>
            <DataSetComponent
                study={studyWithoutPermissionToAddDataset}
                setStudy={mockFunc}
                setUpdateCache={mockFunc}
                updateCache={mockFunc}
                wbsIsValid
                studySaveInProgress={false}
                onFallAddressBackChange={mockFunc}
            />
        </Router>
    );

    let linkElement = getByText('Create study specific data set');
    expect(linkElement).toBeInTheDocument();

    expect(getByTestId('study_add_dataset').hasAttribute('disabled')).toEqual(true);
});
