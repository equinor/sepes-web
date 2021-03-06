import React from 'react';
import styled from 'styled-components';
import { Label, EquinorIcon } from '../../common/StyledComponents';
import { DotProgress, Tooltip, Button } from '@equinor/eds-core-react';
import { resourceType } from '../../common/staticValues/types';
import { apiRequestWithToken } from '../../../auth/AuthFunctions';
import { SandboxPermissions } from 'components/common/interfaces';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 30px;
`;

const SatusWrapper = styled.div`
    margin-left: auto;
    display: flex;
    justify-content: center;
    margin-top: 4px;
`;

const SatusWrapperCentered = styled.div`
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
    permission: SandboxPermissions;
};

const ResourceItemComponent: React.FC<ResourceItemComponentProps> = ({
    type,
    status,
    name,
    linkToResource,
    retryLink,
    getResources,
    permission
}) => {
    const retryResource = () => {
        apiRequestWithToken(retryLink, 'PUT').then((result: any) => {
            if (result && result.message) {
                console.log('Err');
            } else {
                getResources();
            }
        });
    };

    return (
        <Wrapper>
            <SatusWrapperCentered>
                {type === resourceType.virtualMachine ? (
                    <div>
                        <Label style={{ marginBottom: '-24px' }}>{type}</Label> <br />
                        <div>
                            <Tooltip
                                title={linkToResource ? '' : 'Link will be active when VM is ready'}
                                placement="top"
                                enterDelay={500}
                            >
                                <a
                                    style={{ color: '#007079' }}
                                    href={linkToResource}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {name}
                                </a>
                            </Tooltip>
                        </div>
                    </div>
                ) : (
                    <div>{type}</div>
                )}
            </SatusWrapperCentered>
            <SatusWrapperCentered>
                <Tooltip title={retryLink ? 'Try Again' : status} placement="top">
                    {retryLink ? (
                        <Button variant="ghost_icon" onClick={() => retryResource()} disabled={!permission.update}>
                            {EquinorIcon('refresh', '#007079', 24)}
                        </Button>
                    ) : status !== 'Ok' ? (
                        <DotProgress color="primary" />
                    ) : (
                        EquinorIcon('check', '#007079', 24)
                    )}
                </Tooltip>
            </SatusWrapperCentered>
        </Wrapper>
    );
};

export default ResourceItemComponent;
