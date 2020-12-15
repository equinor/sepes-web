import React, { useEffect, useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import AddNewVm from './AddNewVm';
import {
    SandboxObj,
    VmObj,
    SizeObj,
    DropdownObj,
    OperatingSystemObj,
    SandboxPermissions
} from '../../common/interfaces';
import {
    getVirtualMachineDisks,
    getVirtualMachineSizes,
    getVirtualMachineOperatingSystems
} from '../../../services/Api';
import VmDetails from './VmDetails';
import * as notify from '../../common/notify';
import useFetchUrl from '../../common/hooks/useFetchUrl';
const { TabList, Tab } = Tabs;

type VmConfigProps = {
    showAddNewVm: boolean;
    sandbox: SandboxObj;
    resources: any;
    loadingSandbox: boolean;
    permissions: SandboxPermissions;
    setUpdateCache: any;
    updateCache: any;
};

const VmConfig: React.FC<VmConfigProps> = ({
    showAddNewVm,
    sandbox,
    resources,
    loadingSandbox,
    permissions,
    setUpdateCache,
    updateCache
}) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [vms, setVms] = useState<any>([]);
    const [sizes, setSizes] = useState<SizeObj | undefined>(undefined);
    const [disks, setDisks] = useState<DropdownObj | undefined>(undefined);
    const [os, setOs] = useState<OperatingSystemObj | undefined>(undefined);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const vmsReponse = useFetchUrl('virtualmachines/forsandbox/' + sandbox.id, setVms);

    useEffect(() => {
        if (vms.length > 0 && !showAddNewVm) {
            setActiveTab(1);
        }
    }, [vms]);

    useEffect(() => {
        setIsSubscribed(true);
        if (permissions && permissions.update && isSubscribed) {
            if (!sizes) getVmSizes();
            if (!disks) getVmDisks();
            if (!os) getVms();
        }
        return () => setIsSubscribed(false);
    }, [permissions]);

    const getVmSizes = () => {
        getVirtualMachineSizes(sandbox.id).then((result: any) => {
            if (result && !result.Message) {
                setSizes(result);
            } else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log('Err');
            }
        });
    };

    const getVmDisks = () => {
        getVirtualMachineDisks().then((result: any) => {
            if (result && !result.Message) {
                setDisks(result);
            } else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log('Err');
            }
        });
    };

    const getVms = () => {
        getVirtualMachineOperatingSystems(sandbox.id).then((result: any) => {
            if (result && !result.Message) {
                setOs(result);
            } else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log('Err');
            }
        });
    };

    const onChange = (e: any) => {
        setActiveTab(e);
    };
    const returnStepComponent = () => {
        switch (activeTab) {
            case 0:
                return showAddNewVm && !loadingSandbox ? (
                    <AddNewVm
                        sandbox={sandbox}
                        setVms={setVms}
                        vms={vms}
                        sizes={sizes}
                        disks={disks}
                        setActiveTab={setActiveTab}
                        os={os}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                    />
                ) : (
                    <div />
                );
            default:
                return (
                    <VmDetails
                        vm={vms[activeTab - 1]}
                        setVms={setVms}
                        vms={vms}
                        setActiveTab={setActiveTab}
                        index={activeTab - 1}
                        resources={resources}
                        permissions={permissions}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                    />
                );
        }
    };

    return (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '4px' }}>
            <Tabs style={{ borderRadius: '4px' }} activeTab={activeTab} onChange={(e: any) => onChange(e)}>
                <TabList>
                    {showAddNewVm && !loadingSandbox ? (
                        <Tab key={1} style={{ borderRadius: '4px' }}>
                            Add new vm
                        </Tab>
                    ) : (
                        <Tab style={{ display: 'none' }} />
                    )}
                    {vms.length > 0 ? (
                        vms.map((vm: any) => {
                            return (
                                <Tab key={vm.id} style={{ borderRadius: '4px' }}>
                                    {vm.name}
                                </Tab>
                            );
                        })
                    ) : (
                        <Tab key={2} disabled>
                            {vmsReponse.loading ? 'loading..' : 'No virtual machines yet..'}
                        </Tab>
                    )}
                </TabList>
            </Tabs>
            {returnStepComponent()}
        </div>
    );
};

export default VmConfig;
