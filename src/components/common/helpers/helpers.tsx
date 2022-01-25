/*eslint-disable no-restricted-properties, react/no-array-index-key */
import React from 'react';
import truncateLength from '../staticValues/lenghts';

/**Add html linebreaks if the string contains \n */
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

export const returnTextfieldTypeBasedOninput = (
    value: any,
    dashAllowed = true,
    limit = 50,
    specialCaseError = false
) => {
    if ((!validateResourceName(value, dashAllowed) && value !== '' && value !== undefined) || specialCaseError) {
        return 'error';
    }
    if (value && value.length > limit) {
        return 'warning';
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

export const truncate = (input: string, allowedLength = truncateLength) => {
    if (input && input.length > allowedLength) {
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

export const roundDown = (num: number, precision: number): number => {
    if (!precision) return num;
    return Math.floor(num / precision) * precision;
};

export const round = (num: number, precision: number): number => {
    if (!precision) return num;
    return Math.round(num / precision) * precision;
};

export const checkIfValidIp = (ip: string) => {
    const ipValidate = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;
    return ipValidate.test(ip);
};

export const checkIfInputIsNumberWihoutCharacters = (number: string) => {
    const numberValidate = /^[0-9]*$/;
    return numberValidate.test(number);
};

export const validateResourceName = (name: string, dashAllowed = false): boolean => {
    if (name === '' || name === undefined) {
        return false;
    }
    const nameWithoutSpaces = name.split(' ').join('');
    let onlyLettersAndNumbers = /^[a-zA-Z0-9]+$/;
    if (dashAllowed) {
        onlyLettersAndNumbers = /^[a-zA-Z0-9-]+$/;
    }
    const limit = /(?=.{3,123})/;
    return onlyLettersAndNumbers.test(nameWithoutSpaces) && limit.test(nameWithoutSpaces);
};

export const isIterable = (obj) => {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
};

export const checkColumDoesNotExceedInputLength = (limits: any, value: string, columnName: string) => {
    if (limits[columnName] < value.length) {
        return false;
    }
    return true;
};

export const returnAllowedLengthOfString = (limits: any, value: string, columnName: string) => {
    if (!checkColumDoesNotExceedInputLength(limits, value, columnName)) {
        return value.substr(0, limits[columnName]);
    }
    return value;
};

export const returnHelperText = (inputLength: number, limit: number, type: string) => {
    if (inputLength === undefined || inputLength <= limit) {
        return '';
    }
    return `ProTip! Good ${type} names contain fewer than ${limit} characters.`;
};

export const removeAllSpecialCharachtersExceptDashes = (input: string) => {
    return input.toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
};

export const returnObjectInArrayThatMatchValue = (array: any, columnToCheck, valueToFind): number => {
    const arrayObject = array.find((x: any) => x[columnToCheck] === valueToFind);
    return arrayObject;
};

export const returnIndexOfObjectArray = (array: any, columnToCheck, valueToFind): number => {
    const arrayObject = returnObjectInArrayThatMatchValue(array, columnToCheck, valueToFind);
    if (arrayObject) {
        return array.indexOf(arrayObject);
    }
    return -1;
};

export const getEnvironment = () => {
    const { hostname } = window.location;

    if (localStorage.getItem('cyToken')?.length) {
        return 'MOCKUSER';
    }
    if (hostname === 'localhost') return 'LOCALHOST';
    if (hostname === 'frontend-sepes-web-dev.radix.equinor.com') return 'DEV';
    if (hostname === 'frontend-sepes-web-qa.radix.equinor.com') return 'QA';
    if (hostname === 'frontend-sepes-web-prod.radix.equinor.com' || hostname === 'sepes.equinor.com') {
        return 'PROD';
    }

    return '';
};
