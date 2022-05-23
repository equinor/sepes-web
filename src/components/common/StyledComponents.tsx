import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon, Divider } from '@equinor/eds-core-react';
import {
    cloud_upload,
    delete_forever,
    arrow_drop_down,
    arrow_drop_up,
    arrow_back,
    clear,
    mood_very_happy,
    warning_outlined,
    arrow_forward,
    external_link,
    key,
    check,
    error_outlined,
    more_vertical,
    refresh,
    hourglass_empty,
    folder,
    file,
    folder_open,
    visibility,
    visibility_off,
    info_circle,
    dollar,
    business,
    settings,
    warning_filled,
    close,
    chevron_right,
    chevron_left,
    account_circle,
    report_bug,
    exit_to_app,
    copy,
    checkbox
} from '@equinor/eds-icons';

const icons = {
    cloud_upload,
    delete_forever,
    arrow_drop_down,
    arrow_drop_up,
    arrow_back,
    clear,
    mood_very_happy,
    warning_outlined,
    arrow_forward,
    external_link,
    key,
    check,
    error_outlined,
    more_vertical,
    refresh,
    hourglass_empty,
    folder,
    file,
    folder_open,
    visibility,
    visibility_off,
    info_circle,
    dollar,
    business,
    settings,
    warning_filled,
    close,
    chevron_right,
    chevron_left,
    account_circle,
    report_bug,
    exit_to_app,
    copy,
    checkbox
};
Icon.add(icons);

export const EquinorIcon = (
    name: keyof typeof icons,
    color: string,
    size: 24 | 16 | 32 | 40 | 48 | undefined,
    onClick?: any,
    clickAble?: boolean
) => {
    if (clickAble && onClick) {
        return (
            <Icon onClick={onClick} color={color} name={name} size={size} style={{ cursor: 'pointer' }} title={name} />
        );
    }

    return <Icon color={color} name={name} size={size} title={name} />;
};

export const EquinorLink = styled(Link)`
    font-size: 14px;
    color: #007079;
    text-decoration-line: underline;
`;

export const StyledTitle = styled.div`
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.2px;
    color: #007079;
    font-weight: 500;
`;

export const Dot = styled.span<{ color?: string }>`
    height: 14px;
    width: 14px;
    background-color: ${(props: any) => (props.color ? props.color : '#bbb')};
    border-radius: 50%;
    display: inline-block;
`;

export const StyledTextArea = styled.div`
    /*margin-bottom: 32px;*/
`;

export const Label = styled.div`
    height: 16px;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: #6f6f6f;
`;

const Text = styled.div`
    height: minmax(24px, auto);
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.4px;
`;

const TextDescription = styled.div`
    height: minmax(24px, auto);
    font-size: 16px;
    line-height: 24px;
    display: block;
    align-items: center;
    letter-spacing: 0.4px;
`;

export const Inline = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
`;

const StyledRequiredLabel = styled.span`
    display: inline-flex;
    width: 100%;
    justify-content: space-between;
`;

export const Title = (props: any) => {
    const { title } = props;

    return (
        <div>
            <StyledTitle>{title}</StyledTitle>
            <Divider />
        </div>
    );
};

export const TextArea = (props: any) => {
    const { label, text, textStyle } = props;

    return (
        <StyledTextArea {...props}>
            <Label>{label}</Label>
            <Text style={textStyle}>{text}</Text>
        </StyledTextArea>
    );
};

export const TextAreaDescription = (props: any) => {
    const { label, text, textStyle } = props;

    return (
        <StyledTextArea {...props}>
            <Label>{label}</Label>
            <TextDescription style={textStyle}>{text}</TextDescription>
        </StyledTextArea>
    );
};

export const RequiredLabel = (props: any) => {
    const { label } = props;

    return (
        <StyledRequiredLabel {...props}>
            <Label>{label}</Label>
            <Label>*Required</Label>
        </StyledRequiredLabel>
    );
};
