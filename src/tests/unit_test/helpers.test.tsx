import React from 'react';
import * as helpers from '../../components/common/helpers';

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

test('test checkIfInputIsNumberWihoutCharacters', () => {
    expect(helpers.checkIfInputIsNumberWihoutCharacters('test@')).toBeFalsy;
    expect(helpers.checkIfInputIsNumberWihoutCharacters('123')).toBeTruthy;
});

test('test bytesToSize', () => {
    expect(helpers.bytesToSize(10)).toBe('10 B');
    expect(helpers.bytesToSize(100)).toBe('100 B');
    expect(helpers.bytesToSize(1000)).toBe('1000 B');
    expect(helpers.bytesToSize(10000)).toBe('9.77 KB');
    expect(helpers.bytesToSize(100000)).toBe('97.66 KB');
    expect(helpers.bytesToSize(1000000)).toBe('976.56 KB');
    expect(helpers.bytesToSize(10000000)).toBe('9.54 MB');
    expect(helpers.bytesToSize(1000000000)).toBe('953.67 MB');
    expect(helpers.bytesToSize(100000000000)).toBe('93.13 GB');
});

test('test returnLimitMeta', () => {
    expect(helpers.returnLimitMeta(10, 'test')).toBe('4/10');
});

test('test truncate', () => {
    expect(helpers.truncate('test', 3)).toBe('tes...');
});

test('test truncate', () => {
    expect(helpers.roundUp(89, 2)).toBe('90');
});

test('test validateResourceName', () => {
    expect(helpers.validateResourceName('abcdD123124')).toBeTruthy();
    expect(helpers.validateResourceName('')).toBeFalsy();
    expect(helpers.validateResourceName('aaaaaAAA!!11111##!"!!')).toBeFalsy();
});

test('test validateUserInput', () => {
    expect(
        helpers.validateUserInput(
            {
                id: '1',
                name: 'test name',
                region: 'norwayeast',
                size: 'test size',
                operatingSystem: 'windows',
                distro: 'win2019datacenter',
                username: 'test username',
                password: 'PaSsWord!!!123421',
                linkToExternalSystem: '',
                dataDisks: [{ name: 'test' }, { name: 'test2' }]
            },
            false,
            '100',
            true
        )
    ).toBeTruthy();

    expect(
        helpers.validateUserInput(
            {
                id: '1',
                name: '',
                region: 'norwayeast',
                size: 'test size',
                operatingSystem: 'windows',
                distro: 'win2019datacenter',
                username: 'test username',
                password: 'PaSsWord!!!123421',
                linkToExternalSystem: '',
                dataDisks: [{ name: 'test' }, { name: 'test2' }]
            },
            false,
            '100',
            true
        )
    ).toBeFalsy();

    expect(
        helpers.validateUserInput(
            {
                id: '1',
                name: 'asdas',
                region: 'test region',
                size: 'test size',
                operatingSystem: 'windows',
                distro: 'win2019datacenter',
                username: 'test username',
                password: '',
                linkToExternalSystem: '',
                dataDisks: [{ name: 'test' }, { name: 'test2' }]
            },
            false,
            '100',
            true
        )
    ).toBeFalsy();

    expect(
        helpers.validateUserInput(
            {
                id: '1',
                name: 'asdas',
                region: 'test region',
                size: '',
                operatingSystem: 'windows',
                distro: 'win2019datacenter',
                username: 'test username',
                password: 'PaSsWord!!!123421',
                linkToExternalSystem: '',
                dataDisks: [{ name: 'test' }, { name: 'test2' }]
            },
            false,
            '100',
            true
        )
    ).toBeFalsy();

    expect(
        helpers.validateUserInput(
            {
                id: '1',
                name: 'asdas',
                region: 'test region',
                size: '',
                operatingSystem: 'windows',
                distro: 'win2019datacenter',
                username: '',
                password: 'PaSsWord!!!123421',
                linkToExternalSystem: '',
                dataDisks: [{ name: 'test' }, { name: 'test2' }]
            },
            false,
            '100',
            true
        )
    ).toBeFalsy();
});
