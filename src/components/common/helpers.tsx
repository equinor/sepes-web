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