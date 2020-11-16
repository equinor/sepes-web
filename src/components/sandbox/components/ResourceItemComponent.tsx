import React from 'react';
import styled from 'styled-components';
import { Label } from '../../common/StyledComponents';
import { DotProgress, Tooltip } from '@equinor/eds-core-react';
import { resourceType } from '../../common/types';
import { EquinorIcon } from '../../common/StyledComponents';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 30px;
`;

const SatusWrapper = styled.div<{ isVm: boolean }>`
    margin-top: ${(props: any) => (props.isVm ? '8px' : '0px')};
    margin-left: auto;
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
                {type === resourceType.virtualMachine ? (
                    <>
                        <Label>{type}</Label>
                        <div>
                            <a href={linkToResource} target="_blank" rel="noopener noreferrer">
                                {name}
                            </a>
                        </div>
                    </>
                ) : (
                    <div>{type}</div>
                )}
            </div>
            <SatusWrapper isVm={type === resourceType.virtualMachine}>
                <Tooltip title={status} placement={'top'}>
                    {status !== 'Ok' ? <DotProgress variant="green" /> : EquinorIcon('check', '#007079', 24)}
                </Tooltip>
            </SatusWrapper>
        </Wrapper>
    );
};

export default ResourceItemComponent;
