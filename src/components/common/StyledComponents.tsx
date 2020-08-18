import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Divider } from '@equinor/eds-core-react';

export const EquinorLink = styled(Link)`
    font-size: 14px;
    color: #007079;
    text-decoration-line: underline;
`;

const StyledTitle = styled.div`
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.2px;
    color: #007079;
    font-weight: 500;
`;

const DividerWrapper = styled.div<{ width?: string }>`
    width: ${(props: any) => (props.width ? props.width : '90%')};
    margin: 0 auto;
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
    color: #6F6F6F;
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

export const Title = (props: any) => {
    let { title } = props;

    return (
        <div>
            <StyledTitle>{title}</StyledTitle>
            <Divider />
        </div>
    );
}

export const TextArea = (props: any) => {
    let { label, text, textStyle } = props;

    return (
        <StyledTextArea {...props}>
            <Label>{label}</Label>
            <Text style={textStyle}>{text}</Text>
        </StyledTextArea>
    );
}

export const TextAreaDescription = (props: any) => {
    let { label, text, textStyle } = props;

    return (
        <StyledTextArea {...props}>
            <Label>{label}</Label>
            <TextDescription style={textStyle}>{text}</TextDescription>
        </StyledTextArea>
    );
}
