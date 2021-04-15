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
        validateResourceName(vm.name)
    ) {
        return true;
    }
    return false;
};
