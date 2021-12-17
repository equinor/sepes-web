//import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const TestComponent = () => {
    return <h1>This is a test</h1>;
};

test('renders learn react link', () => {
    const { getByText } = render(<TestComponent />);
    const linkElement = getByText('This is a test');
    expect(linkElement).toBeInTheDocument();
});
