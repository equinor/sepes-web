import { TextField, Tooltip, Icon } from '@equinor/eds-core-react';
import React from 'react';
import {
    returnPasswordVariant,
} from '../helpers/sandboxHelpers';
import { checkColumDoesNotExceedInputLength, passwordValidate } from '../helpers/helpers';

const Password = ({ fieldValue, limit, onChange, helperText, dataCy }) => {
    const handleChange = (field: string, value: string) => {
        if (!checkColumDoesNotExceedInputLength(limit, value, field)) {
            return;
        }

        onChange(value);
    };

    const getHelperText = (password) => {
        if (password !== '' && !passwordValidate(password)) {
            return helperText;
        }

        return '';
    };

    return (
        <div style={{ marginTop: '24px' }}>
            <TextField
                id="passwordField"
                autoComplete="off"
                placeholder="Password"
                type="password"
                onChange={(e: any) => handleChange('password', e.target.value)}
                value={fieldValue}
                label="Password"
                meta="(required)"
                data-cy={dataCy}
                variant={returnPasswordVariant(fieldValue)}
                inputIcon={
                    <Tooltip title={helperText} placement="right">
                        <Icon name="info_circle" />
                    </Tooltip>
                }
                helperText={getHelperText(fieldValue)}
            />
        </div>
    );
};

export default Password;
