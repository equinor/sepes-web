import React from 'react';
import { TextField } from '@equinor/eds-core-react';

export const lineBreak = (text: string) => {
    return text
        ? text.split(`\n`).map(function (item: string, idx: number) {
              return (
                  <span key={idx}>
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

export const bytesToMB = (sizeInBytes: number) => {
    return (sizeInBytes / (1024 * 1024)).toFixed(2);
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

export const returnTextField = (
    name: string,
    placeholder: string,
    value: string,
    label: string,
    meta: string,
    datacy: string,
    handleChange: any,
    userPressedCreate?: any,
    style?: any,
    multiline?: boolean
) => {
    if (meta !== 'Required') {
        userPressedCreate = false;
    }
    if (meta === 'limit') {
        if (!value) {
            meta = '0/500';
        } else {
            meta = value.length + '/500';
        }
    }
    return (
        <TextField
            id="textfield1"
            name={name}
            placeholder={placeholder}
            variant={checkIfRequiredFieldsAreNull(value, userPressedCreate)}
            onChange={handleChange}
            label={label}
            meta={meta}
            style={style}
            value={value}
            data-cy={datacy}
            multiline={multiline}
            autoComplete="off"
        />
    );
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
    const limit = /(?=.{8,123})/;
    return upper.test(password) && number.test(password) && special.test(password) && limit.test(password);
};

export const roundUp = (num: number, precision: number): string => {
    if (!precision) return num.toLocaleString();
    return (Math.ceil(num / precision) * precision).toLocaleString();
};
