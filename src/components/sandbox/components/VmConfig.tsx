import React, { useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import AddNewVm from './AddNewVm';
import { SandboxObj, VmObj, SizeObj, DropdownObj, OperatingSystemObj } from '../../common/interfaces';
import {
    getVirtualMachineForSandbox,
    getVirtualMachineDisks,
    getVirtualMachineSizes,
    getVirtualMachineOperatingSystems
} from '../../../services/Api';
import VmDetails from './VmDetails';
import * as notify from '../../common/notify';
import useFetch from '../../common/hooks/useFetch';
const { TabList, Tab } = Tabs;

type VmConfigProps = {
    showAddNewVm: boolean;
    sandbox: SandboxObj;
    resources: any;
};

const VmConfig: React.FC<VmConfigProps> = ({ showAddNewVm, sandbox, resources }) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [vms, setVms] = useState<any>([]);
    const [sizes, setSizes] = useState<SizeObj | undefined>(undefined);
    const [disks, setDisks] = useState<DropdownObj | undefined>(undefined);
    const [os, setOs] = useState<OperatingSystemObj | undefined>(undefined);
    useFetch(getVirtualMachineSizes, setSizes, null, sandbox.id);
    useFetch(getVirtualMachineDisks, setDisks);
    useFetch(getVirtualMachineForSandbox, setVms, null, sandbox.id);
    useFetch(getVirtualMachineOperatingSystems, setOs, null, sandbox.id);

    const getVms = () => {
        getVirtualMachineForSandbox(sandbox.id).then((result: any) => {
            if (result && !result.Message) {
                setVms(result);
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
                return (
                    <AddNewVm
                        sandbox={sandbox}
                        setVms={setVms}
                        vms={vms}
                        sizes={sizes}
                        disks={disks}
                        setActiveTab={setActiveTab}
                        os={os}
                    />
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
                        getVms={getVms}
                    />
                );
        }
    };

    return (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '4px' }}>
            <Tabs style={{ borderRadius: '4px' }} activeTab={activeTab} onChange={(e: any) => onChange(e)}>
                <TabList>
                    {showAddNewVm ? (
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
                            Vms will be here
                        </Tab>
                    )}
                </TabList>
            </Tabs>
            {returnStepComponent()}
        </div>
    );
};

export default VmConfig;
