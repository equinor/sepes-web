import { render, act } from '@testing-library/react';
import StepBar from '../../../components/sandbox/StepBar';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { sandboxWithAllPermissions, sandboxWithNoPermissions } from '../../mocks/sandbox/sandbox-mocks';
import sandboxesReducer from '../../../store/sandboxes/sandboxesSlice';
import resourcesReducer from '../../../store/resources/resourcesSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { mockStore } from '../../mocks/mockStore';

const mockFunc = (id: string) => {};

const initialStateWithPermissions = { sandboxes: { sandbox: sandboxWithAllPermissions, callGetResources: false } };
const initialStateWithoutPermissions = { sandboxes: { sandbox: sandboxWithNoPermissions, callGetResources: false } };

// const mockStore = (state: any) => {
//     return configureStore({
//         reducer: {
//             sandboxes: sandboxesReducer,
//             resources: resourcesReducer
//         },
//         preloadedState: state
//     });
// };

test('renders stepbar component without permissions', async () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
        <Provider store={mockStore(initialStateWithoutPermissions)}>
            <Router history={history}>
                <StepBar
                    sandboxId="1"
                    step={0}
                    studyId="1"
                    setStep={mockFunc}
                    setLoading={mockFunc}
                    setNewPhase={mockFunc}
                    setDeleteSandboxInProgress={mockFunc}
                    setNewCostanalysisLink={mockFunc}
                    controller={new AbortController()}
                    vmsWithOpenInternet={mockFunc}
                    setMakeAvailableInProgress={mockFunc}
                    makeAvailableInProgress={false}
                    setHasChanged={mockFunc}
                    updateCache={mockFunc}
                    setUpdateCache={mockFunc}
                />
            </Router>
        </Provider>
    );

    await act(async () => {
        expect(getByTestId('make_available').hasAttribute('disabled')).toEqual(true);
        let linkElement = getByText('More options');
        expect(linkElement).toBeInTheDocument();
        linkElement.click();

        expect(getByTestId('delete_sandbox').hasAttribute('disabled')).toEqual(true);
    });
});

test('renders stepbar component with permissions', async () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
        <Provider store={mockStore(initialStateWithPermissions)}>
            <Router history={history}>
                <StepBar
                    sandboxId="1"
                    step={0}
                    studyId="1"
                    setStep={mockFunc}
                    setLoading={mockFunc}
                    setNewPhase={mockFunc}
                    setDeleteSandboxInProgress={mockFunc}
                    setNewCostanalysisLink={mockFunc}
                    controller={new AbortController()}
                    vmsWithOpenInternet={mockFunc}
                    setMakeAvailableInProgress={mockFunc}
                    makeAvailableInProgress={false}
                    setHasChanged={mockFunc}
                    updateCache={mockFunc}
                    setUpdateCache={mockFunc}
                />
            </Router>
        </Provider>
    );
    await act(async () => {
        expect(getByTestId('make_available').hasAttribute('disabled')).toEqual(true);
        let linkElement = getByText('More options');
        expect(linkElement).toBeInTheDocument();
        linkElement.click();

        expect(getByTestId('delete_sandbox').hasAttribute('disabled')).toEqual(false);
    });
});
