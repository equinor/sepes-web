import React from 'react';
import styled from 'styled-components';
import { Label, EquinorIcon } from '../../common/StyledComponents';
import { DotProgress, Tooltip, Button } from '@equinor/eds-core-react';
import { resourceType } from '../../common/staticValues/types';
import { apiRequestWithToken } from '../../../auth/AuthFunctions';
import * as notify from '../../common/notify';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 30px;
`;

const SatusWrapper = styled.div`
    margin-left: auto;
`;

const SatusWrapper2 = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
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
                notify.show('danger', '500', result);
                console.log('Err');
            } else {
                getResources();
            }
        });
    };

    return (
        <Wrapper>
            <SatusWrapper2>
                {type === resourceType.virtualMachine ? (
                    <div>
                        <a style={{ color: '#007079' }} href={linkToResource} target="_blank" rel="noopener noreferrer">
                            {name}
                        </a>
                    </div>
                ) : (
                    <div style={{ marginTop: '4px' }}>{type}</div>
                )}
            </SatusWrapper2>
            <SatusWrapper>
                <Tooltip title={retryLink ? 'Try Again' : status} placement="top">
                    {' '}
                    {retryLink ? (
                        <Button variant="ghost_icon" onClick={() => retryResource()}>
                            {EquinorIcon('refresh', '#007079', 24)}
                        </Button>
                    ) : status !== 'Ok' ? (
                        <DotProgress color="primary" />
                    ) : (
                        EquinorIcon('check', '#007079', 24)
                    )}
                </Tooltip>
            </SatusWrapper>
        </Wrapper>
    );
};

export default ResourceItemComponent;
