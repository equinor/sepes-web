import * as helpers from '../../components/common/helpers/sandboxHelpers';

test('test validateUserInputSandbox', () => {
    expect(
        helpers.validateUserInputSandbox(
            {
                name: 'test name',
                region: 'test size',
                template: 'location',
                id: '1'
            },
            '123'
        )
    ).toBeTruthy();

    expect(
        helpers.validateUserInputSandbox(
            {
                name: '',
                region: 'test size',
                template: 'location',
                id: '1'
            },
            '123'
        )
    ).toBeFalsy();

    expect(
        helpers.validateUserInputSandbox(
            {
                name: 'test name',
                region: '',
                template: 'location',
                id: '1'
            },
            '123'
        )
    ).toBeFalsy();
    expect(
        helpers.validateUserInputSandbox(
            {
                name: 'test name',
                region: 'test size',
                template: 'location',
                id: '1'
            },
            ''
        )
    ).toBeFalsy();
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
