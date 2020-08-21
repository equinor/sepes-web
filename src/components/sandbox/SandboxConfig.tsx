import React, { useState } from 'react';
import { Search, Button, TextField} from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display:grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 32px;
  border-radius: 4px;
  padding: 16px;
  background-color: #ffffff;
`;
type SandboxConfigProps = {

};

const SandboxConfig: React.FC<SandboxConfigProps> = ({  }) => {

    return (
        <Wrapper>
            <div>This is the sandbox config page</div>
        </Wrapper>
    )
}

export default SandboxConfig;
