import React from 'react';
import { render } from '@testing-library/react';
import Overview from '../../../components/studyDetails/Overview';
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

const mockFunc = () => {};
const resultsAndLearnings = { resultsAndLearnings: 'this is a good study' };
// const resultsAndLearningsResponse = { cache: { 'studies/1/resultsandlearnings': 'this is a good study' } };

test('renders StudyComponent full component with invalid study name', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router history={history}>
            <Overview
                study={study}
                setHasChanged={mockFunc}
                setResultsAndLearnings={mockFunc}
                resultsAndLearnings={resultsAndLearnings}
                controller={new AbortController()}
            />
        </Router>
    );

    let linkElement = getByText('sandbox1');
    expect(linkElement).toBeInTheDocument();

    linkElement = getByText('dataset1');
    expect(linkElement).toBeInTheDocument();

    linkElement = getByText('participant1');
    expect(linkElement).toBeInTheDocument();

    linkElement = getByText('this is a good study');
    expect(linkElement).toBeInTheDocument();
    // Clicks the Edit button
    linkElement = getByText('Edit results and learnings');
    expect(linkElement).toBeInTheDocument();
    linkElement.click();

    linkElement = getByText('Cancel');
    expect(linkElement).toBeInTheDocument();

    linkElement = getByText('Save');
    expect(linkElement).toBeInTheDocument();
    linkElement.click();

    linkElement = getByText('this is a good study');
    expect(linkElement).toBeInTheDocument();
});
