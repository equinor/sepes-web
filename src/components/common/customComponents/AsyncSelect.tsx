import React, { useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { Label, RequiredLabel } from '../StyledComponents';
import { getParticipantList } from '../../../services/Api';
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
    isRequired
}) => {
    const getParticipants = (inputValue: string, callback: any): void => {
        getParticipantList(inputValue || 'a').then((result: any) => {
            if (!result.Message) {
                let temp = result.map((user) => {
                    return {
                        label: `${user.fullName} (${user.emailAddress})`,
                        value: user.objectId,
                        emailAddress: user.emailAddress,
                        source: user.source,
                        objectId: user.objectId,
                        name: user.fullName,
                        databaseId: user.databaseId
                    };
                });
                callback(temp);
            } else {
                console.log('err');
                //notify.show('danger', '500');
            }
        });
    };

    return (
        <span style={style}>
            {isRequired ? <RequiredLabel label={label} /> : <Label>{label}</Label>}
            <AsyncSelect
                defaultOptions
                loadOptions={getParticipants}
                placeholder={placeholder}
                value={selectedOption}
                onChange={onChange}
                theme={(theme) => equinorTheme(theme)}
                onInputChange={onInputChange}
            />
        </span>
    );
};

export default AsynchSelect;
