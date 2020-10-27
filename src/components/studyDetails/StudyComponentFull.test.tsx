
import React from 'react';
import { render } from '@testing-library/react';
import StudyComponentFull from './StudyComponentFull';
import { StudyObj } from '../common/interfaces';
import { useHistory } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';
const study:StudyObj = {
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
};
let loading = false;
const mockFunc = (id:string) => {
}
test('renders StudyComponent full component with edit study', () => {
  const mockCallBack = jest.fn();
  const history = createMemoryHistory()
  const {getByText} = render(
      <Router history={history}>
    <StudyComponentFull
        study={study}
        newStudy={false}
        setNewStudy={mockFunc}
        setLoading={mockFunc}
        loading={loading}
        setStudy={mockFunc}
/>
</Router>);
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
  expect(linkElement).toBeInTheDocument();

});

test('renders StudyComponent full component with new study', () => {
    const mockCallBack = jest.fn();
    const history = createMemoryHistory()
    const {getByText} = render(
        <Router history={history}>
      <StudyComponentFull
          study={{}}
          newStudy={true}
  />
  </Router>);
    let linkElement = getByText('Create');
    expect(linkElement).toBeInTheDocument();
  });