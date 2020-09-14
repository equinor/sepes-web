import React, { useState } from 'react';
import styled from 'styled-components';
import Dataset from './components/Dataset';
import PolicyComponent from './components/PolicyComponent';
import ResourcesComponent from './components/ResourcesComponent';
import VmConfig from './components/VmConfig';
import { EquinorIcon } from '../common/StyledComponents';

const Wrapper = styled.div`
  display:grid;
  grid-template-rows: auto auto;
  grid-gap: 32px;
  border-radius: 4px;
`;

type ExecutionProps = {

};

const Execution: React.FC<ExecutionProps> = ({  }) => {

    return (
        <Wrapper>
            <div style={{backgroundColor: '#FFFFFF', padding: '16px' }}>
                <span>{EquinorIcon('mood_very_happy', '#007079', 24)} Data is now available in storage account</span>
                <div style={{float: 'right' , minWidth:'400px'}}>
                    <ResourcesComponent />
                </div>
            </div>
            <VmConfig showAddNewVm={false} />
        </Wrapper>
    )
}

export default Execution;
