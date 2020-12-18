import React from 'react';
import AsyncSelect from 'react-select/async';
import { Label, RequiredLabel } from '../StyledComponents';
import './styles.scss';

type AsynchSelectProps = {
    label: string;
    selectedOption: any;
    placeholder: string;
    onChange: any;
    onInputChange: any;
    style?: any;
    dataType?: string;
    isRequired?: boolean;
    disabled?: boolean;
    loadOptions?: any;
};

export const equinorTheme = (theme: any) => ({
    ...theme,
    borderRadius: 0,
    padding: '20px',
    border: 'none',
    width: '300px',
    colors: {
        ...theme.colors,
        primary25: '#E6FAEC',
        primary: '#007079',
        primary50: '#E6FAEC',
        neutral0: '#F7F7F7'
    }
});

const AsynchSelect: React.FC<AsynchSelectProps> = ({
    label,
    placeholder,
    onChange,
    selectedOption,
    onInputChange,
    style,
    dataType,
    isRequired,
    disabled,
    loadOptions
}) => {
    return (
        <span style={style}>
            {isRequired ? <RequiredLabel label={label} /> : <Label>{label}</Label>}
            <AsyncSelect
                defaultOptions
                loadOptions={loadOptions}
                placeholder={placeholder}
                value={selectedOption}
                onChange={onChange}
                theme={(theme) => equinorTheme(theme)}
                onInputChange={onInputChange}
                isDisabled={disabled}
            />
        </span>
    );
};

export default AsynchSelect;
