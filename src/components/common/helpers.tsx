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

export const ValidateEmail = (mail:string) => 
{
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
    {
        return (true);
     }
    return (false);
}