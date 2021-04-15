/*eslint-disable no-restricted-properties, react/no-array-index-key */
import React from 'react';
import { DatasetObj, SandboxCreateObj, StudyObj, VmObj } from './interfaces';

export const lineBreak = (text) => {
    return text
        ? text.split('\n').map((item: string, number: number) => {
              return (
                  <span key={item + number}>
                      {item}
                      <br />
                  </span>
              );
          })
        : '';
};

export const checkIfRequiredFieldsAreNull = (value: any, userPressedCreate?: boolean) => {
    if ((value === '' || value === undefined) && userPressedCreate) {
        return 'error';
    }
    return 'default';
};

export const bytesToSize = (bytes: any, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const ValidateEmail = (mail: string) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return true;
    }
    return false;
};

export const returnLimitMeta = (limit: number, value: string) => {
    if (value) {
        return value.length + '/' + limit;
    }
    return '0/' + limit;
};

export const truncate = (input: string, allowedLength: number) => {
    if (input.length > allowedLength) {
        return input.substring(0, allowedLength) + '...';
    }
    return input;
};

export const passwordValidate = (password: string): boolean => {
    //Upper case charachter
    const upper = /(?=.*[A-Z])/;
    //Atleast one number
    const number = /(?=.*[0-9])/;
    //Atleast one special character
    const special = /(?=.*[!@#$%^&*])/;
    //Between 8-123 long
    const limit = /(?=.{12,123})/;
    return upper.test(password) && number.test(password) && special.test(password) && limit.test(password);
};

export const roundUp = (num: number, precision: number): string => {
    if (!precision) return num.toLocaleString();
    return (Math.ceil(num / precision) * precision).toLocaleString();
};

export const checkIfValidIp = (ip: string) => {
    const ipValidate = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;
    return ipValidate.test(ip);
};

export const checkIfInputIsNumberWihoutCharacters = (number: string) => {
    const numberValidate = /^[0-9]*$/;
    return numberValidate.test(number);
};

export const validateResourceName = (name: string): boolean => {
    if (name === '' || name === undefined) {
        return false;
    }
    const nameWithoutSpaces = name.split(' ').join('');
    const onlyLettersAndNumbers = /^[a-zA-Z0-9]+$/;
    const limit = /(?=.{3,123})/;
    return onlyLettersAndNumbers.test(nameWithoutSpaces) && limit.test(nameWithoutSpaces);
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

export const checkForInputErrors = (dataset: DatasetObj) => {
    if (!dataset?.name?.length || !dataset?.classification?.length || !dataset?.location?.length) {
        return true;
    }
    if (dataset?.dataId && !checkIfInputIsNumberWihoutCharacters(dataset?.dataId.toString())) {
        return true;
    }
    return false;
};

export const validateUserInputSandbox = (sandbox: SandboxCreateObj, wbsCode: string) => {
    if (!sandbox.name || !sandbox.region || !validateResourceName(sandbox.name) || !wbsCode) {
        return false;
    }
    return true;
};

export const validateUserInputStudy = (study: StudyObj): boolean => {
    let result = true;
    if (!validateResourceName(study.name)) {
        result = false;
    }
    if (study.name === '' || study === undefined || study.vendor === '' || study.vendor === undefined) {
        result = false;
    }
    return result;
};
