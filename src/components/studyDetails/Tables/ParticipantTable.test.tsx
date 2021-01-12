import React from 'react';
import { render } from '@testing-library/react';
import ParticipantTable from './ParticipantTable';
/* eslint-disable no-undef */
const mockFunc = (id: string) => {};

const participantsList = [
    {
        fullName: 'test1',
        emailAddress: 'test1@test.com',
        role: 'admin',
        id: '1'
    },
    {
        fullName: 'test2',
        emailAddress: 'test2@test.com',
        role: 'viewer',
        id: '2'
    }
];
test('renders dropdown component', () => {
    const { getByText } = render(
        <ParticipantTable participants={participantsList} removeParticipant={mockFunc} editMode />
    );
    let linkElement = getByText('test1');
    expect(linkElement).toBeInTheDocument();
    linkElement = getByText('test2@test.com');
    expect(linkElement).toBeInTheDocument();
    linkElement = getByText('viewer');
    expect(linkElement).toBeInTheDocument();
});
