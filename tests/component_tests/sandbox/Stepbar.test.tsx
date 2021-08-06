import React from 'react';
import { render } from '@testing-library/react';
import StepBar from '../../../components/sandbox/StepBar';
import { SandboxObj } from '../../../components/common/interfaces';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const sandboxWithNoPermissions: SandboxObj = {
    deleted: false,
    region: '',
    resources: [],
    datasets: [],
    studyId: '',
    technicalContactEmail: '',
    technicalContactName: '',
    name: '',
    template: '',
    id: '1',
    currentPhase: undefined,
    linkToCostAnalysis: '',
    studyName: '',
    restrictionDisplayText: '',
    permissions: {
        delete: false,
        editInboundRules: false,
        openInternet: false,
        update: false,
        increasePhase: false
    }
};

const sandboxWithAllPermissions: SandboxObj = {
    deleted: false,
    region: '',
    resources: [],
    datasets: [],
    studyId: '',
    technicalContactEmail: '',
    technicalContactName: '',
    name: '',
    template: '',
    id: '1',
    currentPhase: undefined,
    linkToCostAnalysis: '',
    studyName: '',
    restrictionDisplayText: '',
    permissions: {
        delete: true,
        editInboundRules: true,
        openInternet: true,
        update: true,
        increasePhase: true
    }
};

const mockFunc = (id: string) => {};

test('renders stepbar component without permissions', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
        <Router history={history}>
            <StepBar
                sandbox={sandboxWithNoPermissions}
                sandboxId="1"
                step={0}
                studyId="1"
                setStep={mockFunc}
                setSandbox={mockFunc}
                updateCache={mockFunc}
                setUpdateCache={mockFunc}
                userClickedDelete={mockFunc}
                setUserClickedDelete={mockFunc}
                setResources={mockFunc}
                setLoading={mockFunc}
                setNewPhase={mockFunc}
                setDeleteSandboxInProgress={mockFunc}
                setNewCostanalysisLink={mockFunc}
                controller={new AbortController()}
                vmsWithOpenInternet={mockFunc}
            />
        </Router>
    );

    expect(getByTestId('make_available').hasAttribute('disabled')).toEqual(true);
    let linkElement = getByText('More options');
    expect(linkElement).toBeInTheDocument();
    linkElement.click();

    expect(getByTestId('delete_sandbox').hasAttribute('disabled')).toEqual(true);
});

test('renders stepbar component with permissions', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
        <Router history={history}>
            <StepBar
                sandbox={sandboxWithAllPermissions}
                sandboxId="1"
                step={0}
                studyId="1"
                setStep={mockFunc}
                setSandbox={mockFunc}
                updateCache={mockFunc}
                setUpdateCache={mockFunc}
                userClickedDelete={mockFunc}
                setUserClickedDelete={mockFunc}
                setResources={mockFunc}
                setLoading={mockFunc}
                setNewPhase={mockFunc}
                setDeleteSandboxInProgress={mockFunc}
                setNewCostanalysisLink={mockFunc}
                controller={new AbortController()}
                vmsWithOpenInternet={mockFunc}
            />
        </Router>
    );

    expect(getByTestId('make_available').hasAttribute('disabled')).toEqual(true);
    let linkElement = getByText('More options');
    expect(linkElement).toBeInTheDocument();
    linkElement.click();

    expect(getByTestId('delete_sandbox').hasAttribute('disabled')).toEqual(false);
});
