import React from 'react';
import styled from 'styled-components';

const Logo = styled.img`
  height: 125px;
  width: 125px;
`;

const Dot = styled.span`
    height: 125px;
    width: 125px;
    background-color: #EAEAEA;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    color: #FFFFFF;
    line-height: 125px;
    font-size:3em;
  `;

const CustomLogoComponent = (props: any) => {
    return (
        props.logoUrl ? <Logo src={props.logoUrl} alt='studyLogo' /> : <Dot>SP</Dot>
    )
}

export default CustomLogoComponent;
