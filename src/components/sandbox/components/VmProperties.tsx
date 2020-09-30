import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Typography } from '@equinor/eds-core-react';
import { StyledTitle } from '../../common/StyledComponents';

const Wrapper = styled.div`
    margin-Top: 16px;
    display:grid;
    grid-template-columns: 0.5fr 2fr;
    grid-gap: 8px;
  `;

type VmPropertiesProps = {
    vmProperties : any;
};

const VmProperties: React.FC<VmPropertiesProps> = ({ vmProperties }) => {
    return (
        <div>
            <Typography variant="h2">Properties</Typography>
            <Wrapper>
                <div>
                    <div>OS</div>
                    <div>Public IP</div>
                    <div>Private IP</div>
                    <div>DNS name</div>
                    <div>Location</div>
                    <div style={{ marginTop: '16px' }}>Private IP</div>
                    <div>DNS name</div>
                    <div>Location</div>
                </div>
                <div>
                    <div>Linus</div>
                    <div>127</div>
                    <div>255.255.255.255</div>
                    <div>sb.env04-asdasdaas</div>
                    <div>North Europe</div>
                    <div style={{ marginTop: '16px' }}>Standard E16as</div>
                    <div>16</div>
                    <div>128GB</div>
                </div>
            </Wrapper>
            <Button variant="outlined" style={{ marginTop: '24px' }}>Password reset</Button>
        </div>
    )
}

export default VmProperties;
