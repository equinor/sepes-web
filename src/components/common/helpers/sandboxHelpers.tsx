import { SandboxCreateObj, VmObj } from '../interfaces';
import { passwordValidate, validateResourceName } from './helpers';

export const validateUserInputSandbox = (sandbox: SandboxCreateObj, wbsCode: string) => {
    if (!sandbox.name || !sandbox.region || !validateResourceName(sandbox.name) || !wbsCode) {
        return false;
    }
    return true;
};

export const validateUserInput = (
    vm: VmObj,
    loading: boolean,
    vmEstimatedCost: string,
    usernameIsValid: boolean | undefined
) => {
    if (loading || !vmEstimatedCost) {
        return false;
    }
    if (
        passwordValidate(vm.password) &&
        vm.name !== '' &&
        vm.operatingSystem !== '' &&
        vm.size !== '' &&
        vm.dataDisks.length > 0 &&
        usernameIsValid &&
        validateVmName(vm.name)
    ) {
        return true;
    }
    return false;
};

export const filterSizes = (_sizes: any, filter) => {
    if (!_sizes) {
        return [];
    }
    if (filter.length === 0) {
        return _sizes;
    }
    return _sizes.filter((size) => filter.includes(size.category));
};

export const returnPasswordVariant = (vmPassword: string) => {
    if (vmPassword === '') {
        return 'default';
    }
    if (passwordValidate(vmPassword)) {
        return 'success';
    }
    return 'error';
};

export const returnUsernameVariant = (vmUsername: string, usernameIsValid: boolean | undefined) => {
    if (vmUsername === '' || usernameIsValid === undefined) {
        return 'default';
    }
    if (usernameIsValid) {
        return 'success';
    }
    return 'error';
};

export const validateVmName = (vmName: string) => {
    if (vmName === '' || vmName === undefined) {
        return false;
    }
    const nameWithoutSpaces = vmName.split(' ').join('');
    const onlyLettersAndNumbersAndDashes = /^[a-zA-Z0-9-]+$/;
    const limit = /(?=.{3,123})/;
    return onlyLettersAndNumbersAndDashes.test(nameWithoutSpaces) && limit.test(nameWithoutSpaces);
};
