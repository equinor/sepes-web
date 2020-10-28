import React, { useState, useEffect } from 'react';
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
const { TabList, Tab } = Tabs;

let mockVms = [
    {
        id: 1,
        name: 'VM123'
    }
]
type DatasetProps = {
    showAddNewVm: boolean;
    sandbox: SandboxObj;
    setStep: any;
};

const VmConfig: React.FC<DatasetProps> = ({ showAddNewVm, sandbox, setStep }) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [vms, setVms] = useState<any>([]);
    const [sizes, setSizes] = useState<SizeObj |undefined>(undefined);
    const [disks, setDisks] = useState<DropdownObj | undefined>(undefined);
    const [os, setOs] = useState<OperatingSystemObj | undefined>(undefined);

    useEffect(() => {
        setIsSubscribed(true);
        getVms();
        getSizes();
        getDisks();
        getOSs();
        return () => { setIsSubscribed(false); };
    },[]);

    const getSizes = () => {
        getVirtualMachineSizes(sandbox.id).then((result: any) => {
            if (result && !result.Message && isSubscribed) {
                console.log("result: ", result);
                setSizes(result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
             }
        });
    }

    const getDisks = () => {
        getVirtualMachineDisks().then((result: any) => {
            if (result && !result.Message && isSubscribed) {
                console.log("result: ", result);
                setDisks(result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
             }
        });
    }

    const getVms = () => {
        getVirtualMachineForSandbox(sandbox.id).then((result: any) => {
            if (result && !result.Message && isSubscribed) {
                console.log("result: ", result);
                setVms(result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
             }
        });
    }

    const getOSs = () => {
        getVirtualMachineOperatingSystems(sandbox.id).then((result: any) => {
            if (result && !result.Message && isSubscribed) {
                console.log("result: ", result);
                setOs(result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
             }
        });
    }

    const onChange = (e:any) => {
        setActiveTab(e);
    }
    const returnStepComponent = () => {
        switch (activeTab) {
            case 0:
                return <AddNewVm sandbox={sandbox} setVms={setVms} vms={vms} sizes={sizes} disks={disks} setActiveTab={setActiveTab} os={os} />;
            default:
                return <VmDetails vm={vms[activeTab - 1]} setVms={setVms} vms={vms} setActiveTab={setActiveTab} index={activeTab - 1} />;
        }
    }

    return (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '4px' }}>
            <Tabs style={{ borderRadius: '4px' }} activeTab={activeTab} onChange={(e: any) => onChange(e)}>
                    <TabList>
                        {showAddNewVm ? <Tab key={1} style={{ borderRadius: '4px' }}>Add new vm</Tab> : <Tab style={{ display: 'none' }} /> }
                        {vms.length > 0 ? vms.map((vm: any) => {
                            return <Tab key={vm.id} style={{ borderRadius: '4px' }}>{vm.name}</Tab>;
                        }): <Tab key={2} disabled>Vms will be here</Tab>}
                    </TabList>
            </Tabs>
            {returnStepComponent()}
        </div>
    )
}

export default VmConfig;
