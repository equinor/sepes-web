import React from 'react';
import styled from 'styled-components';

const Logo = styled.img`
    max-width: 125px;
    max-height: 125px;
`;

const Wrapper = styled.div<{ center: boolean }>`
    width: 125px;
    height: 125px;
    text-align: ${(props: any) => (props.center ? 'center' : 'end')};
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

type CustomLogoComponentProps = {
    logoUrl: string;
    center: boolean;
};

const CustomLogoComponent: React.FC<CustomLogoComponentProps> = ({ logoUrl, center }) => {
    return logoUrl !== '' && logoUrl !== null ? (
        <Wrapper center={center}>
            <Logo src={logoUrl} alt="studyLogo" />
        </Wrapper>
    ) : (
        <Dot>SP</Dot>
    );
};

export default CustomLogoComponent;
