import React from 'react';
import styled from 'styled-components';

const Logo = styled.img`
    max-width: 125px;
    max-height: 125px;
`;

const Wrapper = styled.div`
    width: 125px;
    height: 125px;
`;
const Dot = styled.span`
    height: 125px;
    width: 125px;
    background-color: #eaeaea;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    color: #ffffff;
    line-height: 125px;
    font-size: 3em;
`;

const CustomLogoComponent = (props: any) => {
    return props.logoUrl ? (
        <Wrapper>
            <Logo src={props.logoUrl} alt="studyLogo" />
        </Wrapper>
    ) : (
        <Dot>SP</Dot>
    );
};

export default CustomLogoComponent;
