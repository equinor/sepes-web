import React from 'react';

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

export const checkIfRequiredFieldsAreNull = (value:any, userPressedCreate?:boolean) => {
    if ((value === '' || value === undefined) && userPressedCreate) {
        return 'error';
    }
    return 'default';

}

export const bytesToMB = (sizeInBytes: number) => {
    return (sizeInBytes / (1024*1024)).toFixed(2);
}