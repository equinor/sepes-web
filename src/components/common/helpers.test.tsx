import * as helpers from './helpers';

test('test requiredFields', () => {
    expect(helpers.checkIfRequiredFieldsAreNull('', false)).toContain('default');
    expect(helpers.checkIfRequiredFieldsAreNull('abc', false)).toContain('default');
    expect(helpers.checkIfRequiredFieldsAreNull('', true)).toContain('error');
    expect(helpers.checkIfRequiredFieldsAreNull('abc', true)).toContain('default');
});

test('test requiredFields', () => {
    expect(helpers.passwordValidate('password')).toBeFalsy;
    expect(helpers.passwordValidate('Passwo!!aAA321')).toBeTruthy;
});

test('test validate email', () => {
    expect(helpers.passwordValidate('test@')).toBeFalsy;
    expect(helpers.passwordValidate('test@mail.com')).toBeTruthy;
});
