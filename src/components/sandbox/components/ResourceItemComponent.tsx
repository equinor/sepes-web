import React from 'react';
import styled from 'styled-components';
import { Label, EquinorIcon } from '../../common/StyledComponents';
import { DotProgress, Tooltip, Button } from '@equinor/eds-core-react';
import { resourceStatus, resourceType } from '../../common/staticValues/types';
import { apiRequestWithToken } from '../../../auth/AuthFunctions';
import { SandboxPermissions } from 'components/common/interfaces';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 30px;
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
    setCallGetResources: any;
    permission: SandboxPermissions;
};

const ResourceItemComponent: React.FC<ResourceItemComponentProps> = ({
    type,
    status,
    name,
    linkToResource,
    retryLink,
    setCallGetResources,
    permission
}) => {
    const retryResource = () => {
        apiRequestWithToken(retryLink, 'PUT').then((result: any) => {
            if (result && result.message) {
                console.log('Err');
            } else {
                setCallGetResources(true);
            }
        });
    };

    const returnNotReadyIcon = (_status: string) => {
        if (retryLink) {
            return (
                <Button variant="ghost_icon" onClick={() => retryResource()} disabled={!permission.update}>
                    {EquinorIcon('refresh', '#007079', 24)}
                </Button>
            );
        }
        if (_status === resourceStatus.ok) {
            return EquinorIcon('check', '#007079', 24);
        }
        if (_status.includes(resourceStatus.queued)) {
            return EquinorIcon('hourglass_empty', '#007079', 24);
        }
        return <DotProgress color="primary" />;
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
                    {returnNotReadyIcon(status)}
                </Tooltip>
            </SatusWrapperCentered>
        </Wrapper>
    );
};

export default ResourceItemComponent;
