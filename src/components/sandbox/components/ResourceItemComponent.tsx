import React, { useState } from 'react';
import styled from 'styled-components';
import { Label } from '../../common/StyledComponents';
import { DotProgress, Tooltip, Button } from '@equinor/eds-core-react';
import { resourceType } from '../../common/staticValues/types';
import { EquinorIcon } from '../../common/StyledComponents';
import { apiRequestWithToken } from '../../../auth/AuthFunctions';
import * as notify from '../../common/notify';

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
    retryLink: string;
    getResources: any;
};

const ResourceItemComponent: React.FC<ResourceItemComponentProps> = ({
    type,
    status,
    name,
    linkToResource,
    retryLink,
    getResources
}) => {
    const retryResource = () => {
        apiRequestWithToken(retryLink, 'PUT').then((result: any) => {
            if (result && result.Message) {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log('Err');
            } else {
                getResources();
            }
        });
    };

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
                <Tooltip title={retryLink ? 'Try Again' : status} placement={'top'}>
                    {' '}
                    {retryLink ? (
                        <Button variant="ghost_icon" onClick={() => retryResource()}>
                            {EquinorIcon('refresh', '#007079', 24)}
                        </Button>
                    ) : status !== 'Ok' ? (
                        <DotProgress variant="green" />
                    ) : (
                        EquinorIcon('check', '#007079', 24)
                    )}
                </Tooltip>
            </SatusWrapper>
        </Wrapper>
    );
};

export default ResourceItemComponent;
