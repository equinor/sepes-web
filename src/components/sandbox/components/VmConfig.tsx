import React, { useState, useEffect } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import AddNewVm from './AddNewVm';
import { SandboxObj, VmObj } from '../../common/interfaces';
import { getVirtualMachineForSandbox } from '../../../services/Api';
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
};

const VmConfig: React.FC<DatasetProps> = ({ showAddNewVm, sandbox }) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [vms, setVms] = useState<any>([]);

    useEffect(() => {
        setIsSubscribed(true);
        getVms();
        return () => {setIsSubscribed(false)};
    },[]);

    const getVms = () => {
        getVirtualMachineForSandbox(sandbox.id).then((result: any) => {
            if (result && !result.Message && isSubscribed) {
                console.log("result: ", result);
                console.log(mockVms);
                setVms(result);
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
                return <AddNewVm sandbox={sandbox} setVms={setVms} vms={vms} />;
            default:
                return <VmDetails vm={vms[activeTab - 1]} />;
        }
    }

    return (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '4px' }}>
            <Tabs style={{ borderRadius: '4px' }} activeTab={activeTab} onChange={(e: any) => onChange(e)}>
                    <TabList>
                        {showAddNewVm ? <Tab style={{ borderRadius: '4px' }}>Add new vm</Tab> : <Tab style={{ display: 'none' }} /> }
                        {vms.length > 0 ? vms.map((vm: any) => {
                            return <Tab style={{ borderRadius: '4px' }}>{vm.name}</Tab>;
                        }): <Tab disabled>Vms will be here</Tab>}
                    </TabList>
            </Tabs>
            {returnStepComponent()}
        </div>
    )
}

export default VmConfig;
