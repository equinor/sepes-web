import React from 'react';
import { render } from '@testing-library/react';
import Sandbox from '../../../components/studyDetails/Sandbox';
import { StudyObj } from '../../../components/common/interfaces';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
jest.mock('react-keyed-file-browser', () => jest.fn(() => {}));

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
    sandboxes: [],
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
    sandboxes: [],
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
    const { getByText, getByTestId } = render(
        <Router history={history}>
            <Sandbox
                study={study}
                setStudy={mockFunc}
                setHasChanged={mockFunc}
                setUpdateCache={mockFunc}
                updateCache={mockFunc}
                disabled={false}
                setLoading={mockFunc}
                wbsIsValid
                onFallAddressBackChange={mockFunc}
            />
        </Router>
    );

    let linkElement = getByText('Create sandbox');
    expect(linkElement).toBeInTheDocument();

    expect(getByTestId('study_add_sandbox').hasAttribute('disabled')).toEqual(false);
});

test('renders dataset component with permission to add dataset', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
        <Router history={history}>
            <Sandbox
                study={studyWithoutPermissionToAddDataset}
                setStudy={mockFunc}
                setHasChanged={mockFunc}
                setUpdateCache={mockFunc}
                updateCache={mockFunc}
                disabled={true}
                setLoading={mockFunc}
                wbsIsValid
                onFallAddressBackChange={mockFunc}
            />
        </Router>
    );

    let linkElement = getByText('Create sandbox');
    expect(linkElement).toBeInTheDocument();

    expect(getByTestId('study_add_sandbox').hasAttribute('disabled')).toEqual(true);
});
