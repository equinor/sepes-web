import React from 'react';
import styled from 'styled-components';
import { Label } from '../../common/StyledComponents';

const Wrapper = styled.div`
    display:grid;
    grid-template-columns: 1fr 128px;
    grid-gap: 16px;
  `;

const SatusWrapper = styled.div<{ isVm: boolean }>`
  margin-Top: ${(props: any) => (props.isVm ? '8px' : '0px')};    
`;

type ResourceItemComponentProps = {
    name?: string;
    type: string;
    status: string;
};

const ResourceItemComponent: React.FC<ResourceItemComponentProps> = ({ type, status, name }) => {
    return (
        <Wrapper>
            <div>
                {type === 'Virtual Machine' ?
                <>
                    <Label>
                        {type}
                    </Label>
                    <div>
                        {name}
                    </div>
                </>:
                <div>{type}</div>
                }
            </div>
            <SatusWrapper isVm={type === 'Virtual Machine'}>
                {status}
            </SatusWrapper>
        </Wrapper>
    )
}

export default ResourceItemComponent;
