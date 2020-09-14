
import React from 'react';
import { render } from '@testing-library/react';
import * as helpers from './helpers';

test('renders learn react link', () => {

  expect(helpers.checkIfRequiredFieldsAreNull('',false)).toContain('default');
  expect(helpers.checkIfRequiredFieldsAreNull('abc',false)).toContain('default');
  expect(helpers.checkIfRequiredFieldsAreNull('',true)).toContain('error');
  expect(helpers.checkIfRequiredFieldsAreNull('abc',true)).toContain('default');

});
