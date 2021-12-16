import {
    availableDataset,
    availableDatasetLongName,
    listWithVms,
    sandbox,
    sandboxPermissions,
    sandboxPermissionsNoPermissions,
    sandboxWithNoDatasets,
    sandboxWithNoPermissions,
    vm,
    vmWithEqualRules,
    vmWithIncorrectIpRule,
    vmWithIncorrectPortRule,
    vmWithOpenInternet,
    vmWithUnfinishedRule
} from 'tests/mocks/sandbox/sandbox-mocks';
import { study, studyWithNoWbsCode } from 'tests/mocks/study/study-mocs';
import * as helpers from '../../components/common/helpers/sandboxHelpers';
import expect from 'expect';
import { inputErrorsVmRules } from 'components/common/staticValues/types';
import { SandboxObj } from 'components/common/interfaces';

test('test validateUserInputSandbox', () => {
    expect(
        helpers.validateUserInputSandbox(
            {
                name: 'test name',
                region: 'test size',
                template: 'location',
                id: '1'
            },
            study
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
            study
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
            study
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
            studyWithNoWbsCode
        )
    ).toBeFalsy();
});

test('test validateUserInput', () => {
    expect(
        helpers.validateUserInputVm(
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
                dataDisks: ['test', 'test2']
            },
            false,
            '100',
            true,
            listWithVms,
            sandbox
        )
    ).toBeTruthy();

    expect(
        helpers.validateUserInputVm(
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
                dataDisks: ['test', 'test2']
            },
            false,
            '100',
            true,
            listWithVms,
            sandbox
        )
    ).toBeFalsy();

    expect(
        helpers.validateUserInputVm(
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
                dataDisks: ['test', 'test2']
            },
            false,
            '100',
            true,
            listWithVms,
            sandbox
        )
    ).toBeFalsy();

    expect(
        helpers.validateUserInputVm(
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
                dataDisks: ['test', 'test2']
            },
            false,
            '100',
            true,
            listWithVms,
            sandbox
        )
    ).toBeFalsy();

    expect(
        helpers.validateUserInputVm(
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
                dataDisks: ['test', 'test2']
            },
            false,
            '100',
            true,
            listWithVms,
            sandbox
        )
    ).toBeFalsy();
});

test('test filterSizes', () => {
    const sizes = [{ category: 'category1' }, { category: 'category2' }];
    const filter = ['category1'];
    const expectedResult = [{ category: 'category1' }];
    expect(helpers.filterList(sizes, filter)).toEqual(expectedResult);
});

test('test filterSizes, no hits', () => {
    const sizes = [{ category: 'category1' }, { category: 'category2' }];
    const filter = ['category3'];
    const expectedResult = [];
    expect(helpers.filterList(sizes, filter)).toEqual(expectedResult);
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

test('test arrayObjectsToArrayString, check output', () => {
    const expectedResult = ['banana', 'orange'];
    expect(
        helpers.arrayObjectsToArrayString([
            { displayValue: 'banana', id: 1 },
            { displayValue: 'orange', id: 2 }
        ])
    ).toEqual(expectedResult);
});

test('test returnToolTipForMakeAvailable, check output', () => {
    expect(helpers.returnToolTipForMakeAvailable(sandbox, true, false, true)).toEqual('');
    // Without vm
    expect(helpers.returnToolTipForMakeAvailable(sandbox, false, false, true)).toEqual(
        'You need atleast one VM in the sandbox'
    );
    //With open internet
    expect(helpers.returnToolTipForMakeAvailable(sandbox, true, true, true)).toEqual(
        'One or more vms have open internet. Close before making sandbox available'
    );
    //Without permission to make data available
    expect(helpers.returnToolTipForMakeAvailable(sandboxWithNoPermissions, true, false, true)).toEqual(
        'You do not have permission to make this sandbox Available'
    );
    //Resources in progress
    expect(helpers.returnToolTipForMakeAvailable(sandbox, true, false, false)).toEqual(
        'All resources must have status OK'
    );
    //No datasets in sandbox
    expect(helpers.returnToolTipForMakeAvailable(sandboxWithNoDatasets, true, false, true)).toEqual(
        'No datasets in the sandbox'
    );
});

test('test returnTooltipTextDataset, check output', () => {
    expect(helpers.returnTooltipTextDataset(availableDataset, sandboxPermissions)).toEqual('');
    expect(helpers.returnTooltipTextDataset(availableDatasetLongName, sandboxPermissions)).toEqual(
        availableDatasetLongName.name
    );
    expect(helpers.returnTooltipTextDataset(availableDataset, sandboxPermissionsNoPermissions)).toEqual(
        'You do not have access to update data sets in sandbox'
    );
});

test('test checkIfEqualRules, check output', () => {
    expect(helpers.checkIfEqualRules(vm)).toEqual(false);
    expect(helpers.checkIfEqualRules(vmWithEqualRules)).toEqual(true);
});

test('test checkIfAnyVmsHasOpenInternet, check output', () => {
    const vms: any = [];
    vms.push(vm);
    expect(helpers.checkIfAnyVmsHasOpenInternet(vms)).toEqual(false);
    vms.push(vmWithOpenInternet);
    expect(helpers.checkIfAnyVmsHasOpenInternet(vms)).toEqual(true);
});

test('test filterOs, check output', () => {
    const osList = [
        { category: 'category1', recommended: true },
        { category: 'category2', recommended: false }
    ];
    let filter = ['category1'];
    const expectedResult = [{ category: 'category1', recommended: true }];
    expect(helpers.filterOs(osList, filter, true)).toEqual(expectedResult);
});

test('test filterOs, check output', () => {
    const osList = [
        { category: 'category1', recommended: true },
        { category: 'category2', recommended: false }
    ];
    let filter = [''];
    const expectedResult = [{ category: 'category1', recommended: true }];
    expect(helpers.filterOs(osList, filter, true)).toEqual(expectedResult);
});

test('test filterOs, check output', () => {
    const osList = [
        { category: 'category1', recommended: true },
        { category: 'category2', recommended: false }
    ];
    let filter = [''];
    expect(helpers.filterOs(osList, filter, false)).toEqual([]);
});

test('test filterOs, check output', () => {
    const osList = [
        { category: 'category1', recommended: true },
        { category: 'category2', recommended: false }
    ];
    let filter = ['recommended', 'category2'];
    expect(helpers.filterOs(osList, filter, true)).toEqual([]);
});

test('test checkIfSaveIsEnabled, check output', () => {
    const hasChangedVms = [
        { vmId: '1', hasChanged: true },
        { vmId: '2', hasChanged: false }
    ];
    let expectedResult = { enabled: true, error: '' };
    expect(helpers.checkIfSaveIsEnabled(hasChangedVms, vm, '')).toEqual(expectedResult);
});

test('test checkIfSaveIsEnabled, check output', () => {
    const hasChangedVms = [
        { vmId: '1', hasChanged: false },
        { vmId: '2', hasChanged: false }
    ];
    let expectedResult = { enabled: false, error: '' };
    expect(helpers.checkIfSaveIsEnabled(hasChangedVms, vm, '')).toEqual(expectedResult);
});

test('test checkIfSaveIsEnabled, check output', () => {
    const hasChangedVms = [
        { vmId: '1', hasChanged: true },
        { vmId: '2', hasChanged: false }
    ];
    let expectedResult = { enabled: false, error: inputErrorsVmRules.equalRules };
    expect(helpers.checkIfSaveIsEnabled(hasChangedVms, vmWithEqualRules, '')).toEqual(expectedResult);
});

test('test checkIfSaveIsEnabled, check output', () => {
    const hasChangedVms = [
        { vmId: '1', hasChanged: true },
        { vmId: '2', hasChanged: false }
    ];
    let expectedResult = { enabled: false, error: inputErrorsVmRules.notAllFieldsFilled };
    expect(helpers.checkIfSaveIsEnabled(hasChangedVms, vmWithUnfinishedRule, '')).toEqual(expectedResult);
});

test('test checkIfSaveIsEnabled, check output', () => {
    const hasChangedVms = [
        { vmId: '1', hasChanged: true },
        { vmId: '2', hasChanged: false }
    ];
    let expectedResult = { enabled: false, error: '' };
    expect(helpers.checkIfSaveIsEnabled(hasChangedVms, vmWithIncorrectIpRule, '')).toEqual(expectedResult);
});

test('test checkIfSaveIsEnabled, check output', () => {
    const hasChangedVms = [
        { vmId: '1', hasChanged: true },
        { vmId: '2', hasChanged: false }
    ];
    let expectedResult = { enabled: false, error: '' };
    expect(helpers.checkIfSaveIsEnabled(hasChangedVms, vmWithIncorrectPortRule, '')).toEqual(expectedResult);
});

test('test checkIfSaveIsEnabled, check output', () => {
    const hasChangedVms = [
        { vmId: '3', hasChanged: true },
        { vmId: '4', hasChanged: false }
    ];
    let expectedResult = { enabled: false, error: '' };
    expect(helpers.checkIfSaveIsEnabled(hasChangedVms, vm, '')).toEqual(expectedResult);
});

test('test checkIfSandboxNameAlreadyExists, check output', () => {
    const sandboxes = [{ name: 'sandbox1' }, { name: 'sandbox2' }];
    expect(helpers.checkIfSandboxNameAlreadyExists(sandboxes, 'sandbox1')).toBeTruthy();
    expect(helpers.checkIfSandboxNameAlreadyExists(sandboxes, 'sandbox43')).toBeFalsy();
});

test('test getActualVmName, check output', () => {
    expect(helpers.getActualVmName(sandbox, 'vmname43')).toBe('vm-mockstudy-mocksandbox-vmname43');
    expect(helpers.getActualVmName(sandbox, 'vmname 43')).toBe('vm-mockstudy-mocksandbox-vmname43');
    expect(helpers.getActualVmName(sandbox, 'vmname @43@@')).toBe('vm-mockstudy-mocksandbox-vmname43');
});

test('test checkIfVmNameAlreadyExists, check output', () => {
    const vms = [{ name: 'vm-mockstudy-mocksandbox-vmname1' }, { name: 'vm-mockstudy-mocksandbox-vmname2' }];
    expect(helpers.checkIfVmNameAlreadyExists(vms, 'vmname1', sandbox)).toBeTruthy();
    expect(helpers.checkIfVmNameAlreadyExists(vms, 'vmname43', sandbox)).toBeFalsy();
});
