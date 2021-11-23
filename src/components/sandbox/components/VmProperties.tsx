/*eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Typography, Tooltip, Menu } from '@equinor/eds-core-react';
import { EquinorIcon } from '../../common/StyledComponents';
import { SandboxPermissions, VmObj } from '../../common/interfaces';
import { deleteVirtualMachine } from '../../../services/Api';
import DeleteResourceComponent from '../../common/customComponents/DeleteResourceComponent';
import { getVmsForSandboxUrl } from '../../../services/ApiCallStrings';
import { useDispatch } from 'react-redux';
import { SETCALLRESOURCESTRUE } from 'store/actions/sandbox';

const Wrapper = styled.div`
    margin-top: 16px;
    display: grid;
    grid-template-columns: 80px 2fr;
    grid-gap: 8px;
`;

const BtnWrapper = styled.div`
    display: block;
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
};

const VmProperties: React.FC<VmPropertiesProps> = ({
    vmProperties,
    setVms,
    vms,
    setActiveTab,
    permissions,
    setUpdateCache,
    updateCache
}) => {
    const sandboxId = window.location.pathname.split('/')[4];
    const { size, sizeName, privateIp, publicIp } = vmProperties.extendedInfo || {};
    const { MemoryGB, numberOfCores } = size || {};
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const dispatch = useDispatch();

    const [state, setState] = React.useState<{
        buttonEl: any;
        focus: 'first' | 'last';
    }>({
        focus: 'first',
        buttonEl: null
    });

    const { buttonEl, focus } = state;
    const isOpen = Boolean(buttonEl);

    const openMenu = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>,
        focus: 'first' | 'last'
    ) => {
        const target = e.target as HTMLButtonElement;
        setState({ ...state, buttonEl: target, focus });
    };

    const closeMenu = () => {
        setState({ ...state, buttonEl: null, focus });
    };

    useEffect(() => {}, [vmProperties.linkToExternalSystem, setVms]);

    const deleteVm = (): void => {
        setUpdateCache({ ...updateCache, [getVmsForSandboxUrl(sandboxId)]: true });
        setActiveTab(0);
        deleteVirtualMachine(vmProperties.id).then((result: any) => {
            if (result && !result.message) {
                dispatch({ type: SETCALLRESOURCESTRUE });
                const currentVms: any = [...vms];
                currentVms.splice(vms.indexOf(vmProperties), 1);
                setVms(currentVms);
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
        if (vmProperties.linkToExternalSystem == null) {
            return 'VM has to be ready before changing password';
        }

        return '';
    };

    const optionsTemplate = (
        <>
            <Tooltip title={returnResetpasswordTooltip()} placement="right">
                <Menu.Item
                    onClick={redirectToChangePassword}
                    disabled={!(permissions.update && vmProperties.linkToExternalSystem !== null)}
                    className="reset_password"
                >
                    {EquinorIcon('key', '#6F6F6F', 24, () => {}, true)}
                    <ItemText>Reset password</ItemText>
                </Menu.Item>
            </Tooltip>
            <Tooltip title={permissions.update ? '' : 'You do not have access to delete VMs'} placement="right">
                <Menu.Item
                    onClick={() => {
                        setUserClickedDelete(true);
                    }}
                    disabled={!permissions.update}
                    data-cy="vm_delete"
                >
                    {EquinorIcon('delete_forever', '#EB0000', 24, () => {}, true)}
                    <ItemText style={{ color: '#EB0000' }}>Delete virtual machine</ItemText>
                </Menu.Item>
            </Tooltip>
        </>
    );

    return (
        <>
            <Menu
                id="menuButton1"
                aria-labelledby="menuButton1"
                open={isOpen}
                onClose={closeMenu}
                anchorEl={buttonEl}
                focus={focus}
                placement="bottom-end"
                style={{ width: '284px' }}
            >
                {optionsTemplate}
            </Menu>
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
                                    vmProperties.linkToExternalSystem
                                        ? ''
                                        : 'This will be disabled until VM has status OK'
                                }
                                placement="top"
                            >
                                <Button
                                    style={{ width: '296px', textAlign: 'end' }}
                                    disabled={!vmProperties.linkToExternalSystem}
                                >
                                    Connect to virtual machine
                                    <div style={{ marginLeft: 'auto' }}>
                                        {EquinorIcon('external_link', '#FFFFFF', 24, () => {}, true)}
                                    </div>
                                </Button>
                            </Tooltip>
                        </a>
                    </div>

                    <Button
                        variant="outlined"
                        id="menuButton1"
                        aria-controls="menu-on-button"
                        aria-haspopup="true"
                        style={{ width: '296px', textAlign: 'end', marginTop: '8px' }}
                        aria-expanded={isOpen}
                        onClick={(e) => (isOpen ? closeMenu() : openMenu(e, 'first'))}
                        data-cy="vm_more_actions"
                    >
                        More actions
                        <div style={{ marginLeft: 'auto' }}>
                            {EquinorIcon('arrow_drop_down', '#007079', 24, () => {}, true)}
                        </div>
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
        </>
    );
};

export default VmProperties;
