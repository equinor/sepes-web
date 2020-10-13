import React, { useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import AddNewVm from './AddNewVm';
import VmDetails from './VmDetails';
const { TabList, Tab } = Tabs;

let mockVms = [
    {
        id: 1,
        name: 'VM123'
    },
    {
        id: 2,
        name: 'VM321'
    }
]
type DatasetProps = {
    showAddNewVm: boolean;
};

const Dataset: React.FC<DatasetProps> = ({ showAddNewVm }) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const onChange = (e:any) => {
        setActiveTab(e);
    }
    const returnStepComponent = () => {
        switch (activeTab) {
            case mockVms.length:
                return <AddNewVm />;
            default:
                return <VmDetails vm={mockVms[activeTab - 1]} />;
        }
    }

    return (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '4px' }}>
            <Tabs style={{ borderRadius: '4px' }} activeTab={activeTab} onChange={(e: any) => onChange(e)}>
                    <TabList>
                        {mockVms.map((vm: any) => {
                            return <Tab style={{ borderRadius: '4px' }}>{vm.name}</Tab>;
                        })}
                        {showAddNewVm ? <Tab style={{ borderRadius: '4px' }}>Add new vm</Tab> : <Tab style={{ display: 'none' }} /> }
                    </TabList>
            </Tabs>
            {returnStepComponent()}
        </div>
    )
}

export default Dataset;
