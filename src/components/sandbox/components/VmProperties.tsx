import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Typography } from '@equinor/eds-core-react';
import { EquinorIcon } from '../../common/StyledComponents';
import { VmObj } from '../../common/interfaces';
import { deleteVirtualMachine } from '../../../services/Api';
import DeleteResourceComponent from './DeleteResourceComponent';
import * as notify from '../../common/notify';
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
    margin-Top: 16px;
    display:grid;
    grid-template-columns: 0.5fr 2fr;
    grid-gap: 8px;
  `;

const BtnWrapper = styled.div`
    display:block;
  `;

const MoreActionsWrapper = styled.div`
  position: absolute;
  background-color: #ffffff;
  box-shadow: 0 0 4px 4px #E7E7E7;
  width: 240px;
  border-radius: 4px;
  margin-Top: 40px;
  display:grid;
  grid-template-rows: 1fr 1fr;
`;

const Item = styled.div<{color:string}>`
padding: 24px;
color: ${(props: any) => (props.color)};
z-index:99;
display: grid;
grid-template-columns: 24px 1fr;
text-align:left;
grid-gap: 16px;
cursor: pointer;
&:hover {
    background-color: #D5EAF4;
}
`;

const ItemText = styled.div`
  margin-top: 4px;
`;

type VmPropertiesProps = {
    vmProperties : VmObj;
    setVms:any;
    vms:any;
    setActiveTab:any;
};

const VmProperties: React.FC<VmPropertiesProps> = ({ vmProperties, setVms, vms, setActiveTab }) => {
    console.log(vmProperties.extendedInfo);
    const { disks, nics, osType, powerState, size, sizeName, privateIp, publicIp } = vmProperties.extendedInfo || {};
    const { maxDataDiskCount, memoryInMB, numberOfCores, osDiskSizeInMB, resourceDiskSizeInMB } = size || {};
    const [displayMoreActions, setDisplayMoreActions] = useState<boolean>(false);
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const history = useHistory();

    const handleToggle = () => {
        setDisplayMoreActions(!displayMoreActions);
    };
    useEffect(() => {

    }, [vmProperties.linkToExternalSystem]);

    const deleteVm = ():void => {
        setActiveTab(0);
        let currentVms:any = [...vms];
        currentVms.splice(vmProperties, 1);
        setVms(currentVms);
        deleteVirtualMachine(vmProperties.id).then((result: any) => {
            if (result && !result.Message) {
                console.log("resultStudy: ", result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
            }
        });
    };

    return (
        <div>
            <Typography variant="h2">Properties</Typography>
            <Wrapper>
                <div>
                    <div>OS</div>
                    <div>Public IP</div>
                    <div>Private IP</div>
                    {/*<div>DNS name</div>*/}
                    <div>Location</div>
                    <div style={{ marginTop: '16px' }}>Size</div>
                    <div>vCPUs</div>
                    <div>RAM</div>
                </div>
                <div>
                    <div>{vmProperties.operatingSystem || '-'}</div>
                    <div>{publicIp || '-'}</div>
                    <div>{privateIp || '-'}</div>
                    {/*<div>sb.env04-asdasdaas</div>*/}
                    <div>{vmProperties.region}</div>
                    <div style={{ marginTop: '16px' }}>{sizeName || '-'}</div>
                    <div>{numberOfCores || '-'}</div>
                    <div>{memoryInMB ? memoryInMB + 'MB' : '-'}</div>
                </div>
            </Wrapper>
            <BtnWrapper>
                <div>
                    <a href={vmProperties.linkToExternalSystem} target="_blank" rel="noopener noreferrer">
                    <Button
                        style={{ marginTop: '24px', width: '216px' }}
                        disabled={!vmProperties.linkToExternalSystem}
                    >
                        Open virtual machine
                        <div style={{ marginLeft: 'auto', display: 'block' }}>
                            {EquinorIcon('external_link', '#FFFFFF', 24, () => {}, true)}
                        </div>
                    </Button>
                    </a>
                </div>
                <Button
                    variant="outlined"
                    style={{ marginTop: '8px', width: '216px' }}
                    onClick={() => handleToggle()}
                >
                    More actions
                    <div style={{ marginLeft: 'auto', }}>
                        {EquinorIcon('arrow_drop_down', '#007079', 24, () => {}, true)}
                    </div>
                    {displayMoreActions &&
                        <MoreActionsWrapper>
                            <Item color="#000000">
                                {EquinorIcon('key', '#6F6F6F', 24, () => {}, true)}<ItemText>Reset password</ItemText>
                            </Item>
                            <Item color="#EB0000" onClick={() => { setUserClickedDelete(true); }}>
                                {EquinorIcon('delete_forever', '#EB0000', 24, () => {}, true)}<ItemText>Delete virtual machine</ItemText>
                            </Item>
                        </MoreActionsWrapper>}
                </Button>
            </BtnWrapper>
            {userClickedDelete && <DeleteResourceComponent
                ResourceName={vmProperties.name}
                setUserClickedDelete={setUserClickedDelete}
                onClick={deleteVm}
                type="virtul machine"
            />}
        </div>
    )
}

export default VmProperties;
