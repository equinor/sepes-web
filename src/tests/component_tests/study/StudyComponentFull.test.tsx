import React from 'react';
import { render } from '@testing-library/react';
import StudyComponentFull from '../../../components/studyDetails/StudyComponentFull';
import { StudyObj } from '../../../components/common/interfaces';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const permissions = {
    addRemoveDataset: true,
    addRemoveParticipant: true,
    addRemoveSandbox: true,
    closeStudy: true,
    deleteStudy: true,
    readResulsAndLearnings: true,
    updateMetadata: true,
    updateResulsAndLearnings: true
};

const permissionsAllFalse = {
    addRemoveDataset: false,
    addRemoveParticipant: false,
    addRemoveSandbox: false,
    closeStudy: false,
    deleteStudy: false,
    readResulsAndLearnings: false,
    updateMetadata: false,
    updateResulsAndLearnings: false
};

const permissionsDeleteNotAllowed = {
    addRemoveDataset: true,
    addRemoveParticipant: true,
    addRemoveSandbox: true,
    closeStudy: true,
    deleteStudy: false,
    readResulsAndLearnings: true,
    updateMetadata: true,
    updateResulsAndLearnings: true
};

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
    sandboxes: [],
    permissions
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
    sandboxes: [],
    permissions
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
    sandboxes: [],
    permissions
};

const studyWithNoPermissions: StudyObj = {
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
    sandboxes: [],
    permissions: permissionsAllFalse
};

const studyWithNoDelete: StudyObj = {
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
    sandboxes: [],
    permissions: permissionsDeleteNotAllowed
};

const studyWithSandboxes: StudyObj = {
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
    sandboxes: [
        {
            id: 1,
            name: 'sandbox1'
        }
    ],
    permissions
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

test('renders StudyComponent full component with no permission to edit', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router history={history}>
            <StudyComponentFull
                study={studyWithNoPermissions}
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

    expect(getByText('Edit').closest('button').disabled).toBeTruthy();
});

test('renders StudyComponent full component with  permission to delete', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
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
    let linkElement = getByText('Edit');
    expect(linkElement).toBeInTheDocument();
    // Clicks the Edit button
    linkElement.click();

    linkElement = getByTestId('study_delete');
    expect(linkElement).toBeInTheDocument();
    // Clicks the Edit button
    linkElement.click();

    linkElement = getByText('Delete study');
    expect(linkElement).toBeInTheDocument();
    expect(getByTestId('study_delete').hasAttribute('disabled')).toEqual(false);

    linkElement.click();

    expect(getByText('Delete').closest('button').disabled).toBeTruthy();
});

test('renders StudyComponent full component with no permission to delete', () => {
    const history = createMemoryHistory();
    const { getByText, container, getByTestId } = render(
        <Router history={history}>
            <StudyComponentFull
                study={studyWithNoDelete}
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

    linkElement = getByTestId('study_delete_settings');
    expect(linkElement).toBeInTheDocument();
    // Clicks the Edit button
    linkElement.click();

    expect(getByText('Delete study')).toBeInTheDocument();

    expect(getByTestId('study_delete').hasAttribute('disabled')).toEqual(true);

    linkElement = getByTestId('study_delete');
    linkElement.click();
});

test('renders StudyComponent full component with sandbox in study', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
        <Router history={history}>
            <StudyComponentFull
                study={studyWithSandboxes}
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

    linkElement = getByTestId('study_delete_settings');
    expect(linkElement).toBeInTheDocument();
    // Clicks the Edit button
    linkElement.click();

    expect(getByText('Delete study')).toBeInTheDocument();

    expect(getByTestId('study_delete').hasAttribute('disabled')).toEqual(true);

    linkElement = getByTestId('study_delete');
    linkElement.click();
});

// test('dummy', () => {
//     expect(2+2).toBe(4);
// });
