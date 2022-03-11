/*eslint-disable consistent-return */
import { getSandboxCostAnalysis, validateVmUsername } from 'services/Api';
import {
    AvailableDatasetObj,
    ButtonEnabledObj,
    OperatingSystemObj,
    SandboxCreateObj,
    SandboxObj,
    SandboxPermissions,
    StudyObj,
    VmObj,
    VmUsernameObj
} from '../interfaces';
import { inputErrorsVmRules, resourceStatus, resourceType } from '../staticValues/types';
import {
    checkIfInputIsNumberWihoutCharacters,
    checkIfValidIp,
    passwordValidate,
    removeAllSpecialCharachtersExceptDashes,
    validateResourceName
} from './helpers';

export const validateUserInputSandbox = (sandbox: SandboxCreateObj, study: StudyObj) => {
    if (
        !sandbox.name ||
        !sandbox.region ||
        !validateResourceName(sandbox.name) ||
        !study.wbsCode ||
        checkIfSandboxNameAlreadyExists(study.sandboxes, sandbox.name)
    ) {
        return false;
    }
    return true;
};

export const checkIfSandboxNameAlreadyExists = (sandboxes, sandboxName: string): boolean => {
    const sandboxesWithSameName = sandboxes.filter((_sandbox: SandboxObj) => sandboxName === _sandbox.name);
    if (sandboxesWithSameName.length) {
        return true;
    }
    return false;
};

export const checkIfVmNameAlreadyExists = (vms, vmName: string, sandbox: any): boolean => {
    const actualVmName = getActualVmName(sandbox, vmName);
    const vmsWithSameName = vms.filter((_vm: SandboxObj) => actualVmName === _vm.name);
    if (vmsWithSameName.length) {
        return true;
    }
    return false;
};

export const validateUserInputVm = (
    vm: VmObj,
    loading: boolean,
    vmEstimatedCost: string,
    usernameIsValid: boolean | undefined,
    vms: VmObj[],
    sandbox: SandboxObj
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
        validateVmName(vm.name) &&
        !checkIfVmNameAlreadyExists(vms, vm.name, sandbox)
    ) {
        return true;
    }
    return false;
};

export const getActualVmName = (sandbox: SandboxObj, vmName: string): string => {
    if (!sandbox || !vmName) {
        return '';
    }
    return (
        'vm-' +
        removeAllSpecialCharachtersExceptDashes(sandbox.studyName) +
        '-' +
        removeAllSpecialCharachtersExceptDashes(sandbox.name) +
        '-' +
        removeAllSpecialCharachtersExceptDashes(vmName)
    );
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

export const filterOs = (_list: any, filter, recommended: boolean) => {
    if (!_list) {
        return [];
    }
    if (filter.length === 0) {
        return _list;
    }
    // TO DO: See if this logic can be made easier
    if (filter.length === 1 && recommended) {
        return _list.filter((size) => recommended && size.recommended);
    }
    if (recommended) {
        return _list.filter((size) => filter.includes(size.category) && recommended && size.recommended);
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

export const returnVMnameVariant = (vmName: string, vms: VmObj[], sandbox: SandboxObj) => {
    if (vmName === '' || vmName === undefined) {
        return 'default';
    }
    if (validateVmName(vmName) && !checkIfVmNameAlreadyExists(vms, vmName, sandbox)) {
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
    dispatch: any,
    setSandboxInStore: any
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
            getCostAnalysisLinkToSandbox(sandbox, dispatch, setSandboxInStore);
        }
    });
    setAnyVmWithOpenInternet(!noOpenInternet);
    setSandboxHasVm(hasVm);
    setAllResourcesOk(res && hasVm && noOpenInternet);
};

const getCostAnalysisLinkToSandbox = (sandbox: SandboxObj, dispatch: any, setSandboxInStore: any) => {
    getSandboxCostAnalysis(sandbox.id).then((result: any) => {
        if (result && !result.message) {
            dispatch(setSandboxInStore({ sandbox, linkToCostAnalysis: result }));
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

export const returnTooltipTextDataset = (dataset: AvailableDatasetObj, permissions: SandboxPermissions) => {
    if (permissions && !permissions.update) {
        return 'You do not have access to update data sets in sandbox';
    }
    if (dataset.name.length > 50) {
        return dataset.name;
    }
    return '';
};

export const returnDisplayName = (list: any, key: string): string => {
    if (!list || !key) {
        return '';
    }
    const displayName = list.find((item) => item.key === key);
    if (displayName) {
        return displayName.displayValue;
    }
    return '';
};

export const checkIfAnyVmRulesHasChanged = (hasChangedVmRules): boolean => {
    const indexHasChanged = hasChangedVmRules.filter((x: any) => x.hasChanged === true);
    if (indexHasChanged.length > 0) {
        return true;
    }
    return false;
};

export const checkIfEqualRules = (vm: VmObj): boolean => {
    if (!vm.rules || vm.rules.length < 2) {
        return false;
    }
    for (let i = 1; i < vm.rules.length; i++) {
        for (let j = i + 1; j < vm.rules.length; j++) {
            if (vm.rules[i].ip === vm.rules[j].ip && vm.rules[i].port.toString() === vm.rules[j].port.toString()) {
                return true;
            }
        }
    }
    return false;
};

export const checkIfSaveIsEnabled = (hasChangedVmRules, vm: VmObj, inputError: string): ButtonEnabledObj => {
    const hasChangedIndex = hasChangedVmRules.findIndex((x: any) => x.vmId === vm.id);
    const returnObject: ButtonEnabledObj = { enabled: true, error: '' };
    if (hasChangedIndex === -1) {
        returnObject.enabled = false;
        return returnObject;
    }
    if (!vm.rules || !hasChangedVmRules[hasChangedIndex].hasChanged) {
        returnObject.enabled = false;
        return returnObject;
    }

    if (checkIfEqualRules(vm)) {
        if (inputError !== inputErrorsVmRules.equalRules) {
            returnObject.error = inputErrorsVmRules.equalRules;
        }
        returnObject.enabled = false;
        return returnObject;
    }

    vm.rules.forEach((rule) => {
        if (!checkIfValidIp(rule.ip) && rule.direction === 0) {
            returnObject.enabled = false;
            return returnObject;
        }
        if (rule.direction === 0 && !checkIfInputIsNumberWihoutCharacters(rule.port)) {
            returnObject.enabled = false;
            return returnObject;
        }
        if (rule.description === '' || rule.ip === '' || rule.protocol === '' || rule.port === '') {
            returnObject.enabled = false;
            if (inputError !== inputErrorsVmRules.notAllFieldsFilled) {
                returnObject.error = inputErrorsVmRules.notAllFieldsFilled;
            }
        }
    });
    return returnObject;
};

export const checkIfAddNewVmHasUnsavedChanges = (vm: VmObj) => {
    if (
        vm.name !== '' ||
        vm.operatingSystem !== '' ||
        vm.operatingSystem !== '' ||
        vm.password !== '' ||
        vm.size !== '' ||
        vm.dataDisks.length > 0
    ) {
        return true;
    }
    return false;
};

export const checkIfAnyVmsHasOpenInternet = (vms): boolean => {
    let result = false;
    vms.forEach((_vm: VmObj) => {
        if (_vm.rules) {
            _vm.rules.forEach((rule: any) => {
                if (rule.action === 0 && rule.direction === 1) {
                    result = true;
                }
            });
        }
    });
    return result;
};

export const returnOpenClosedOutboundRule = (type: 'text' | 'button', vm: VmObj) => {
    if (!vm.rules) {
        return;
    }
    const actionRule = vm.rules.find((rule: any) => rule.direction === 1);
    if (actionRule) {
        if (actionRule.action === 0) {
            return type === 'text' ? ' open' : 'Close internet';
        }
        return type === 'text' ? ' closed' : 'Open internet';
    }
};
