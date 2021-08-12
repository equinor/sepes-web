/*eslint-disable consistent-return */
import { getSandboxCostAnalysis, validateVmUsername } from 'services/Api';
import { OperatingSystemObj, SandboxCreateObj, SandboxObj, VmObj, VmUsernameObj } from '../interfaces';
import { resourceStatus, resourceType } from '../staticValues/types';
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
        usernameIsValid &&
        validateVmName(vm.name)
    ) {
        return true;
    }
    return false;
};

export const filterList = (_list: any, filter) => {
    if (!_list) {
        return [];
    }
    if (filter.length === 0) {
        return _list;
    }
    return _list.filter((size) => filter.includes(size.category));
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

export const arrayObjectsToArrayString = (array: any): string[] => {
    if (!array) {
        return [];
    }
    const returnArray: string[] = [];
    array.forEach((element: any) => {
        returnArray.push(element.displayValue);
    });
    return returnArray;
};

export const returnKeyOfDisplayValue = (displayValue: string | null | undefined, array: any): string => {
    if (displayValue === '') {
        return '';
    }
    let key = '';
    array.forEach((element: any) => {
        if (element.displayValue === displayValue) {
            key = element.key;
        }
    });
    return key;
};

export const returnToolTipForMakeAvailable = (
    sandbox: SandboxObj,
    sandboxHasVm: boolean,
    anyVmWithOpenInternet: boolean,
    allResourcesOk: boolean
): string => {
    if (sandbox.permissions && !sandbox.permissions.increasePhase) {
        return 'You do not have permission to make this sandbox Available';
    }
    if (!sandboxHasVm) {
        return 'You need atleast one VM in the sandbox';
    }
    if (anyVmWithOpenInternet) {
        return 'One or more vms have open internet. Close before making sandbox available';
    }
    if (sandbox.datasets.length === 0) {
        return 'No datasets in the sandbox';
    }
    if (!allResourcesOk) {
        return 'All resources must have status OK';
    }
    return '';
};

export const allResourcesStatusOkAndAtleastOneVm = (
    resourcesIn,
    setAnyVmWithOpenInternet,
    setSandboxHasVm,
    setAllResourcesOk,
    sandbox,
    setNewCostanalysisLink,
    setSandbox
) => {
    let res = true;
    if (!resourcesIn || !Array.isArray(resourcesIn)) {
        return res;
    }
    let hasVm = false;
    let noOpenInternet = true;
    resourcesIn.map((resource: any) => {
        if (resource.status !== resourceStatus.ok) {
            res = false;
        }
        if (resource.type === resourceType.virtualMachine) {
            hasVm = true;
            if (resource.additionalProperties && resource.additionalProperties.InternetIsOpen) {
                noOpenInternet = false;
            }
        }
        if (resource.type === resourceType.resourceGroup && sandbox.linkToCostAnalysis === null) {
            getCostAnalysisLinkToSandbox(sandbox, setNewCostanalysisLink, setSandbox);
        }
    });
    setAnyVmWithOpenInternet(!noOpenInternet);
    setSandboxHasVm(hasVm);
    setAllResourcesOk(res && hasVm && noOpenInternet);
};

const getCostAnalysisLinkToSandbox = (sandbox: SandboxObj, setNewCostanalysisLink: any, setSandbox: any) => {
    getSandboxCostAnalysis(sandbox.id).then((result: any) => {
        if (result && !result.message) {
            setNewCostanalysisLink(result);
            setSandbox({ ...sandbox, linkToCostAnalysis: result });
        }
    });
};

export const validateUsername = (
    vm: VmObj,
    os: any,
    setUsernameIsValid: any,
    setValidatingUsername: any,
    setUsernameHelpText
) => {
    if (vm.username === '') {
        setUsernameIsValid(false);
        return;
    }

    let operatingSystemType = '';
    os.forEach((operatingSystem: OperatingSystemObj) => {
        if (operatingSystem.key === vm.operatingSystem) {
            operatingSystemType = operatingSystem.category;
        }
    });
    const username: VmUsernameObj = { username: vm.username, operativeSystemType: operatingSystemType };
    setValidatingUsername(true);
    validateVmUsername(username).then((result: any) => {
        setValidatingUsername(false);
        if (result) {
            setUsernameIsValid(result.isValid);
            if (!result.isValid) {
                setUsernameHelpText(result.errorMessage);
                //notify.show('danger', '500', result.errorMessage);
            } else {
                setUsernameHelpText('');
            }
        } else {
            setUsernameIsValid(false);
        }
    });
};
