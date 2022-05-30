/*eslint-disable no-shadow */
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Button, Typography, Tooltip, Menu } from '@equinor/eds-core-react';
import { EquinorIcon } from '../../common/StyledComponents';
import { SandboxPermissions, VmObj } from '../../common/interfaces';
import { deleteVirtualMachine } from '../../../services/Api';
import DeleteResourceComponent from '../../common/customComponents/DeleteResource';
import { getVmsForSandboxUrl } from '../../../services/ApiCallStrings';
import { useDispatch, useSelector } from 'react-redux';
import { setCallResources } from 'store/sandboxes/sandboxesSlice';
import getVirtualMachinesFromStore from 'store/virtualmachines/virtualMachinesSelector';
import { setVirtualMachinesInStore } from 'store/virtualmachines/virtualMachinesSlice';

const Wrapper = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
`;

const TextWrapper = styled.div`
display: flex;                                                                                                                                                                                
flex-direction: row;
flex-wrap: wrap;
align-items: center;
padding: 1px 0;
p:nth-child(1){
    flex-basis: 33%;
}
p:nth-child(2){
    flex-basis: 66%;
}
`;

const BtnWrapper = styled.div`
    display: block;
`;

const ItemText = styled.div`
    margin-top: 4px;
`;

type VmPropertiesProps = {
    vmProperties: VmObj;
    setActiveTab: any;
    permissions: SandboxPermissions;
    setUpdateCache: any;
    updateCache: any;
};

const VmProperties: React.FC<VmPropertiesProps> = ({
    vmProperties,
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
    const vms = useSelector(getVirtualMachinesFromStore());

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

    //useEffect(() => {}, [vmProperties.linkToExternalSystem, setVms]);

    const deleteVm = (): void => {
        setUpdateCache({ ...updateCache, [getVmsForSandboxUrl(sandboxId)]: true });
        setActiveTab(0);
        deleteVirtualMachine(vmProperties.id).then((result: any) => {
            if (result && !result.message) {
                dispatch(setCallResources(true));
                const currentVms: any = [...vms];
                currentVms.splice(vms.indexOf(vmProperties), 1);
                dispatch(setVirtualMachinesInStore(currentVms));
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
                    {EquinorIcon('key', '#6F6F6F', 24, () => { }, true)}
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
                    {EquinorIcon('delete_forever', '#EB0000', 24, () => { }, true)}
                    <ItemText style={{ color: '#EB0000' }}>Delete virtual machine</ItemText>
                </Menu.Item>
            </Tooltip>
        </>
    );

    const PropertiesContainer = ({ title, value, style = {} }): ReactElement<HTMLDivElement> | null =>
    (
        <TextWrapper style={style}>
            <Typography variant="body_short">{title}</Typography>
            <Typography variant="body_short">{value || '-'}</Typography>
        </TextWrapper>
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
                    <PropertiesContainer title="OS" value={vmProperties.operatingSystem} />
                    <PropertiesContainer title="Public IP" value={publicIp} />
                    <PropertiesContainer title="Private IP" value={privateIp} />
                    <PropertiesContainer title="Location" value={vmProperties.region} />
                    <PropertiesContainer title="Size" value={sizeName} style={{ marginTop: '16px' }} />
                    <PropertiesContainer title="vCPUs" value={numberOfCores} />
                    <PropertiesContainer title="RAM" value={MemoryGB ? MemoryGB + 'MB' : '-'} />
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
                                        {EquinorIcon('external_link', '#FFFFFF', 24, () => { }, true)}
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
                            {EquinorIcon('arrow_drop_down', '#007079', 24, () => { }, true)}
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
