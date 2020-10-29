import React from 'react';
import styled from 'styled-components';
import { Label } from '../../common/StyledComponents';
import { resourceType } from '../../common/types';

const Wrapper = styled.div`
    display:flex;
    gap: 8px;
  `;

const SatusWrapper = styled.div<{ isVm: boolean }>`
  margin-Top: ${(props: any) => (props.isVm ? '8px' : '0px')};
  margin-Left: auto;    
`;

type ResourceItemComponentProps = {
    name?: string;
    linkToResource: string;
    type: string;
    status: string;
};

const ResourceItemComponent: React.FC<ResourceItemComponentProps> = ({ type, status, name, linkToResource }) => {
    return (
        <Wrapper>
            <div>
                {type === resourceType.virtualMachine ?
                <>
                    <Label>
                        {type}
                    </Label>
                    <div>
                        <a href={linkToResource} target="_blank" rel="noopener noreferrer">
                            {name}
                        </a>
                    </div>
                </>:
                <div>{type}</div>
                }
            </div>
            <SatusWrapper isVm={type === resourceType.virtualMachine}>
                {status}
            </SatusWrapper>
        </Wrapper>
    )
}

export default ResourceItemComponent;
