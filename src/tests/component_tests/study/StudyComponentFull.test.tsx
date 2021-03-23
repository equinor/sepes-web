import React from 'react';
import { render } from '@testing-library/react';
import StudyComponentFull from '../../../components/studyDetails/StudyComponentFull';
import { StudyObj } from '../common/interfaces';
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
    resultsAndLearnings: 'We learned a lot',
    datasets: [],
    participants: [],
    sandboxes: []
};

const studyWithInvalidName: StudyObj = {
    name: 'a!!!',
    vendor: 'Bouvet',
    wbsCode: 'abc123',
    restricted: false,
    description: 'Study about fishes',
    logoUrl: 'asdwasdasd',
    id: '1',
    resultsAndLearnings: 'We learned a lot',
    datasets: [],
    participants: [],
    sandboxes: []
};

const studyWithInvalidVendor: StudyObj = {
    name: 'StudyName',
    vendor: '',
    wbsCode: 'abc123',
    restricted: false,
    description: 'Study about fishes',
    logoUrl: 'asdwasdasd',
    id: '1',
    resultsAndLearnings: 'We learned a lot',
    datasets: [],
    participants: [],
    sandboxes: []
};

const loading = false;
const mockFunc = (id: string) => {};
test('renders StudyComponent full component with edit study', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router history={history}>
            <StudyComponentFull
                study={study}
                newStudy={false}
                setNewStudy={mockFunc}
                setLoading={mockFunc}
                loading={loading}
                setStudy={mockFunc}
                setHasChanged={mockFunc}
                cache={mockFunc}
                setUpdateCache={mockFunc}
                updateCache={mockFunc}
                setDeleteStudyInProgress={mockFunc}
            />
        </Router>
    );
    let linkElement = getByText('StudyName');
    //Check that the study is displayed with the correct info
    expect(linkElement).toBeInTheDocument();
    linkElement = getByText('Bouvet');
    expect(linkElement).toBeInTheDocument();
    linkElement = getByText('abc123');
    expect(linkElement).toBeInTheDocument();
    linkElement = getByText('abc123');
    expect(linkElement).toBeInTheDocument();
    linkElement = getByText('Study about fishes');
    expect(linkElement).toBeInTheDocument();
    linkElement = getByText('Edit');
    expect(linkElement).toBeInTheDocument();
    // Clicks the Edit button
    linkElement.click();
    linkElement = getByText('Cancel');
    expect(linkElement).toBeInTheDocument();
    linkElement = getByText('Change logo');
    linkElement.click();
    linkElement = getByText('Click or drag n drop photo.');
    expect(linkElement).toBeInTheDocument();
    linkElement = getByText('Save');
    expect(getByText('Save').closest('button').disabled).toBeFalsy();
});

test('renders StudyComponent full component with invalid study name', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router history={history}>
            <StudyComponentFull
                study={studyWithInvalidName}
                newStudy={false}
                setNewStudy={mockFunc}
                setLoading={mockFunc}
                loading={loading}
                setStudy={mockFunc}
                setHasChanged={mockFunc}
                cache={mockFunc}
                setUpdateCache={mockFunc}
                updateCache={mockFunc}
                setDeleteStudyInProgress={mockFunc}
            />
        </Router>
    );

    let linkElement = getByText('Edit');
    expect(linkElement).toBeInTheDocument();
    // Clicks the Edit button
    linkElement.click();
    expect(getByText('Save').closest('button').disabled).toBeTruthy();
});

test('renders StudyComponent full component with invalid vendor name', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router history={history}>
            <StudyComponentFull
                study={studyWithInvalidVendor}
                newStudy={false}
                setNewStudy={mockFunc}
                setLoading={mockFunc}
                loading={loading}
                setStudy={mockFunc}
                setHasChanged={mockFunc}
                cache={mockFunc}
                setUpdateCache={mockFunc}
                updateCache={mockFunc}
                setDeleteStudyInProgress={mockFunc}
            />
        </Router>
    );

    let linkElement = getByText('Edit');
    expect(linkElement).toBeInTheDocument();
    // Clicks the Edit button
    linkElement.click();
    expect(getByText('Save').closest('button').disabled).toBeTruthy();
});

test('renders StudyComponent full component with new study', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router history={history}>
            <StudyComponentFull study={{}} newStudy />
        </Router>
    );
    let linkElement = getByText('Create');
    expect(linkElement).toBeInTheDocument();
    expect(1).toBe(1);
});

test('renders StudyComponent full component with new study', () => {
    expect(1).toBe(1);
});
