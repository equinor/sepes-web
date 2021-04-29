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

test('test filterSizes', () => {
    const sizes = [{ category: 'category1' }, { category: 'category2' }];
    const filter = ['category1'];
    const expectedResult = [{ category: 'category1' }];
    expect(helpers.filterSizes(sizes, filter)).toEqual(expectedResult);
});

test('test filterSizes, no hits', () => {
    const sizes = [{ category: 'category1' }, { category: 'category2' }];
    const filter = ['category3'];
    const expectedResult = [];
    expect(helpers.filterSizes(sizes, filter)).toEqual(expectedResult);
});

test('test returnPasswordVariant', () => {
    const expectedResult = 'default';
    expect(helpers.returnPasswordVariant('')).toEqual(expectedResult);
});

test('test returnPasswordVariant, valid password', () => {
    const expectedResult = 'success';
    expect(helpers.returnPasswordVariant('aaaAAA!!!111111111')).toEqual(expectedResult);
});

test('test returnPasswordVariant, invalid password', () => {
    const expectedResult = 'error';
    expect(helpers.returnPasswordVariant('asdasd')).toEqual(expectedResult);
});

test('test returnUsernameVariant', () => {
    const expectedResult = 'default';
    expect(helpers.returnUsernameVariant('', true)).toEqual(expectedResult);
});

test('test returnUsernameVariant, valid username', () => {
    const expectedResult = 'success';
    expect(helpers.returnUsernameVariant('john5124253', true)).toEqual(expectedResult);
});

test('test returnUsernameVariant, invalid password', () => {
    const expectedResult = 'error';
    expect(helpers.returnUsernameVariant('admin', false)).toEqual(expectedResult);
});
