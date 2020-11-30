
import React from 'react';
import { render } from '@testing-library/react';
import SandboxTable from './SandboxTable';
import { BrowserRouter as Router } from 'react-router-dom';

const sandboxList = [{
    name: 'test1',
    id: '1'
},
{
    name: 'test2',
    id: '2'
}];
test('renders Sandbox table component', () => {
  const mockCallBack = jest.fn();
  const {getByText} = render(
    <Router>
    <SandboxTable
        sandboxes={sandboxList}
    />
    </Router>);
  let linkElement = getByText('test1');
  expect(linkElement).toBeInTheDocument();
});
