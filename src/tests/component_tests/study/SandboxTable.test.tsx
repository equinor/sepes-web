//import React from 'react';
import { render } from '@testing-library/react';
import SandboxTable from '../../../components/studyDetails/Tables/SandboxTable';
import { BrowserRouter as Router } from 'react-router-dom';
import mockStore from 'tests/mocks/mockStore';
import { Provider } from 'react-redux';
import { studyWithSandboxes } from 'tests/mocks/study/study-mocs';

const mockFunc = (id: string) => {};
const sandboxList = [
    {
        name: 'test1',
        id: '1'
    },
    {
        name: 'test2',
        id: '2'
    }
];

/* eslint-disable no-undef */
test('renders Sandbox table component', () => {
    const { getByText } = render(
        <Provider store={mockStore({ studies: { study: studyWithSandboxes } })}>
            <Router>
                <SandboxTable onFallBackAddressChange={mockFunc} editMode />
            </Router>
        </Provider>
    );
    let linkElement = getByText('test1');
    expect(linkElement).toBeInTheDocument();
});
