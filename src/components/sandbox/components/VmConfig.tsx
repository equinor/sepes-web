import React, { useEffect, useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import AddNewVm from './AddNewVm';
import {
    SandboxObj,
    SizeObj,
    DropdownObj,
    OperatingSystemObj,
    SandboxPermissions,
    VmObj
} from '../../common/interfaces';
import {
    getVirtualMachineDisks,
    getVirtualMachineSizes,
    getVirtualMachineOperatingSystems
} from '../../../services/Api';
import VmDetails from './VmDetails';
import * as notify from '../../common/notify';
import useFetchUrl from '../../common/hooks/useFetchUrl';
import { getVmsForSandboxUrl } from '../../../services/ApiCallStrings';

const { TabList, Tab } = Tabs;

type VmConfigProps = {
    showAddNewVm: boolean;
    sandbox: SandboxObj;
    resources: any;
    getResources: any;
    loadingSandbox: boolean;
    permissions: SandboxPermissions;
    setUpdateCache: any;
    updateCache: any;
    controller: AbortController;
    setVmsWithOpenInternet: any;
};

const VmConfig: React.FC<VmConfigProps> = ({
    showAddNewVm,
    sandbox,
    resources,
    getResources,
    loadingSandbox,
    permissions,
    setUpdateCache,
    updateCache,
    controller,
    setVmsWithOpenInternet
}) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [vms, setVms] = useState<any>([]);
    const [sizes, setSizes] = useState<SizeObj | undefined>(undefined);
    const [disks, setDisks] = useState<DropdownObj | undefined>(undefined);
    const [os, setOs] = useState<OperatingSystemObj | undefined>(undefined);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const vmsReponse = useFetchUrl(getVmsForSandboxUrl(sandbox.id), setVms);
    const [vmSaved, setVmSaved] = useState<Boolean>(false);

    useEffect(() => {
        if (vms.length > 0 && !showAddNewVm) {
            setActiveTab(1);
        }
    }, [vms]);

    useEffect(() => {
        if (vmSaved) {
            checkIfAnyVmsHasOpenInternet();
            setVmSaved(false);
        }
    }, [vmSaved, vms]);

    useEffect(() => {
        setIsSubscribed(true);
        if (permissions && permissions.update && isSubscribed) {
            if (!sizes) getVmSizes();
            if (!disks) getVmDisks();
            if (!os) getVms();
        }
        return () => setIsSubscribed(false);
    }, [permissions]);

    const checkIfAnyVmsHasOpenInternet = () => {
        let result = false;
        vms.forEach((vm: VmObj) => {
            if (vm.rules) {
                vm.rules.forEach((rule: any) => {
                    if (rule.action === 0 && rule.direction === 1) {
                        result = true;
                    }
                });
            }
        });
        setVmsWithOpenInternet(result);
        return result;
    };

    const getVmSizes = () => {
        getVirtualMachineSizes(sandbox.id, controller.signal).then((result: any) => {
            if (result && result.Message) {
                //notify.show('danger', '500', result);
                console.log('Err');
            } else if (result) {
                setSizes(result);
            }
        });
    };

    const getVmDisks = () => {
        getVirtualMachineDisks(sandbox.id, controller.signal).then((result: any) => {
            if (result && result.Message) {
                //notify.show('danger', '500', result);
                console.log('Err');
            } else if (result) {
                setDisks(result);
            }
        });
    };

    const getVms = () => {
        getVirtualMachineOperatingSystems(sandbox.id, controller.signal).then((result: any) => {
            if (result && result.Message) {
                //notify.show('danger', '500', result);
                console.log('Err');
            } else if (result) {
                setOs(result);
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
                        getResources={getResources}
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
                        getResources={getResources}
                        permissions={permissions}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                        setVmSaved={setVmSaved}
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
