import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, Typography, Tooltip } from '@equinor/eds-core-react';
import { EquinorIcon } from '../../common/StyledComponents';
import { SandboxPermissions, VmObj } from '../../common/interfaces';
import { deleteVirtualMachine } from '../../../services/Api';
import DeleteResourceComponent from '../../common/customComponents/DeleteResourceComponent';
import useClickOutside from '../../common/customComponents/useClickOutside';
import { getVmsForSandboxUrl } from '../../../services/ApiCallStrings';

const Wrapper = styled.div`
    margin-top: 16px;
    display: grid;
    grid-template-columns: 80px 2fr;
    grid-gap: 8px;
`;

const BtnWrapper = styled.div`
    display: block;
`;

const MoreActionsWrapper = styled.div`
    position: absolute;
    background-color: #ffffff;
    box-shadow: 0 0 4px 4px #e7e7e7;
    border-radius: 4px;
    margin-top: 196px;
    display: grid;
    grid-template-rows: 1fr 1fr;
`;

const Item = styled.div<{ color: string }>`
    padding: 24px;
    color: ${(props: any) => props.color};
    z-index: 99;
    display: grid;
    grid-template-columns: 24px 1fr;
    text-align: left;
    grid-gap: 16px;
    cursor: pointer;
    &:hover {
        background-color: #d5eaf4;
    }
`;

const ItemText = styled.div`
    margin-top: 4px;
`;

type VmPropertiesProps = {
    vmProperties: VmObj;
    setVms: any;
    vms: any;
    setActiveTab: any;
    permissions: SandboxPermissions;
    setUpdateCache: any;
    updateCache: any;
    getResources: any;
};

const VmProperties: React.FC<VmPropertiesProps> = ({
    vmProperties,
    setVms,
    vms,
    setActiveTab,
    permissions,
    setUpdateCache,
    updateCache,
    getResources
}) => {
    const sandboxId = window.location.pathname.split('/')[4];
    const { size, sizeName, privateIp, publicIp } = vmProperties.extendedInfo || {};
    const { MemoryGB, numberOfCores } = size || {};
    const [displayMoreActions, setDisplayMoreActions] = useState<boolean>(false);
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, setDisplayMoreActions);

    const handleToggle = () => {
        setDisplayMoreActions(!displayMoreActions);
    };
    useEffect(() => {}, [vmProperties.linkToExternalSystem, setVms]);

    const deleteVm = (): void => {
        setUpdateCache({ ...updateCache, [getVmsForSandboxUrl(sandboxId)]: true });
        setActiveTab(0);
        const currentVms: any = [...vms];
        currentVms.splice(vms.indexOf(vmProperties), 1);
        setVms(currentVms);
        deleteVirtualMachine(vmProperties.id).then((result: any) => {
            if (result && !result.Message) {
                getResources();
            }
        });
    };

    const redirectToChangePassword = (): void => {
        if (vmProperties.linkToExternalSystem) {
            window.open(vmProperties.linkToExternalSystem + '/resetpassword', '_blank');
        }
    };

    const returnResetpasswordTooltip = () => {
        if (!permissions.update) {
            return 'You do not have permission to reset password';
        }
        if (!vmProperties.linkToExternalSystem) {
            return 'VM has to be ready before changing password';
        }
        return '';
    };

    return (
        <div>
            <Typography variant="h2">Properties</Typography>
            <Wrapper>
                <div>
                    <Typography variant="body_short">OS</Typography>
                    <Typography variant="body_short">Public IP</Typography>
                    <Typography variant="body_short">Private IP</Typography>
                    {/*<div>DNS name</div>*/}
                    <Typography variant="body_short">Location</Typography>
                    <Typography variant="body_short" style={{ marginTop: '16px' }}>
                        Size
                    </Typography>
                    <Typography variant="body_short">vCPUs</Typography>
                    <Typography variant="body_short">RAM</Typography>
                </div>

                <div>
                    <Typography variant="body_short">{vmProperties.operatingSystem || '-'}</Typography>
                    <Typography variant="body_short">{publicIp || '-'}</Typography>
                    <Typography variant="body_short">{privateIp || '-'}</Typography>
                    {/*<div>sb.env04-asdasdaas</div>*/}
                    <Typography variant="body_short">{vmProperties.region}</Typography>
                    <Typography variant="body_short" style={{ marginTop: '16px' }}>
                        {sizeName || '-'}
                    </Typography>
                    <Typography variant="body_short">{numberOfCores || '-'}</Typography>
                    <Typography variant="body_short">{MemoryGB ? MemoryGB + 'MB' : '-'}</Typography>
                </div>
            </Wrapper>
            <BtnWrapper>
                <div style={{ marginTop: '24px' }}>
                    <a href={vmProperties.linkToExternalSystem} target="_blank" rel="noopener noreferrer">
                        <Tooltip
                            title={
                                vmProperties.linkToExternalSystem ? '' : 'This will be disabled until VM has status OK'
                            }
                            placement="top"
                        >
                            <Button style={{ width: '296px' }} disabled={!vmProperties.linkToExternalSystem}>
                                Connect to virtual machine
                                <div style={{ marginLeft: 'auto', paddingLeft: '39px' }}>
                                    {EquinorIcon('external_link', '#FFFFFF', 24, () => {}, true)}
                                </div>
                            </Button>
                        </Tooltip>
                    </a>
                </div>

                <Button
                    variant="outlined"
                    style={{ marginTop: '8px', width: '296px' }}
                    onClick={() => handleToggle()}
                    data-cy="vm_more_actions"
                >
                    More actions
                    <div style={{ marginLeft: 'auto', paddingLeft: '39px' }}>
                        {EquinorIcon('arrow_drop_down', '#007079', 24, () => {}, true)}
                    </div>
                    {displayMoreActions && (
                        <MoreActionsWrapper ref={wrapperRef}>
                            <Tooltip
                                title={
                                    permissions.update && vmProperties.linkToExternalSystem
                                        ? ''
                                        : returnResetpasswordTooltip()
                                }
                                placement="right"
                            >
                                <Item
                                    color="#000000"
                                    style={{
                                        opacity: permissions.update && vmProperties.linkToExternalSystem ? 1 : 0.5,
                                        pointerEvents:
                                            permissions.update && vmProperties.linkToExternalSystem
                                                ? 'initial'
                                                : 'none',
                                        width: '296px'
                                    }}
                                    onClick={redirectToChangePassword}
                                >
                                    {EquinorIcon('key', '#6F6F6F', 24, () => {}, true)}
                                    <ItemText>Reset password</ItemText>
                                </Item>
                            </Tooltip>
                            <Tooltip
                                title={permissions.update ? '' : 'You do not have access to delete VMs'}
                                placement="right"
                                open={!permissions.update}
                            >
                                <Item
                                    color="#EB0000"
                                    style={{
                                        opacity: permissions.update ? 1 : 0.5,
                                        pointerEvents: permissions.update ? 'initial' : 'none',
                                        width: '296px'
                                    }}
                                    onClick={() => {
                                        setUserClickedDelete(true);
                                    }}
                                    data-cy="vm_delete"
                                >
                                    {EquinorIcon('delete_forever', '#EB0000', 24, () => {}, true)}
                                    <ItemText>Delete virtual machine</ItemText>
                                </Item>
                            </Tooltip>
                        </MoreActionsWrapper>
                    )}
                </Button>
            </BtnWrapper>
            {userClickedDelete && (
                <DeleteResourceComponent
                    ResourceName={vmProperties.name}
                    setUserClickedDelete={setUserClickedDelete}
                    onClick={deleteVm}
                    type="virtul machine"
                />
            )}
        </div>
    );
};

export default VmProperties;
