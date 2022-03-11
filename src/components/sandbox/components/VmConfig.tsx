import React, { useEffect, useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import AddNewVm from './AddNewVm';
import { SizeObj, DropdownObj, OperatingSystemObj, VmObj } from '../../common/interfaces';
import {
    getVirtualMachineDisks,
    getVirtualMachineSizes,
    getVirtualMachineOperatingSystems
} from '../../../services/Api';
import VmDetails from './VmDetails';
import useFetchUrl from '../../common/hooks/useFetchUrl';
import { getVmsForSandboxUrl } from '../../../services/ApiCallStrings';
import { checkIfAnyVmsHasOpenInternet } from 'components/common/helpers/sandboxHelpers';
import { useSelector } from 'react-redux';
import { getSandboxFromStore } from 'store/sandboxes/sanboxesSelectors';

type VmConfigProps = {
    setUpdateCache: any;
    updateCache: any;
    controller: AbortController;
    setVmsWithOpenInternet: any;
};

const VmConfig: React.FC<VmConfigProps> = ({ setUpdateCache, updateCache, controller, setVmsWithOpenInternet }) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const sandbox = useSelector(getSandboxFromStore());
    const [vms, setVms] = useState<any>([]);
    const [sizes, setSizes] = useState<SizeObj | undefined>(undefined);
    const [disks, setDisks] = useState<DropdownObj | undefined>(undefined);
    const [os, setOs] = useState<OperatingSystemObj | undefined>(undefined);
    const [hasChangedVmRules, setHasChangedVmRules] = useState<any>([]);
    const [vm, setVm] = useState<VmObj>({
        id: '',
        name: '',
        region: 'norwayeast',
        size: '',
        operatingSystem: '',
        distro: 'win2019datacenter',
        username: '',
        password: '',
        linkToExternalSystem: '',
        dataDisks: []
    });
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const vmsReponse = useFetchUrl(getVmsForSandboxUrl(sandbox.id), setVms, undefined, undefined, false);
    const [vmSaved, setVmSaved] = useState<Boolean>(false);
    const [sizeFilter, setSizeFilter] = useState<any>([]);
    const [osFilter, setOsFilter] = useState<any>([]);
    const showAddNewVm = sandbox.permissions && sandbox.permissions.update;

    useEffect(() => {
        if (vms.length > 0 && !showAddNewVm) {
            setActiveTab(1);
        }
    }, [vms]);

    useEffect(() => {
        if (vmSaved) {
            setVmsWithOpenInternet(checkIfAnyVmsHasOpenInternet(vms));
            setVmSaved(false);
        }
    }, [vmSaved, vms]);

    useEffect(() => {
        setIsSubscribed(true);
        if (sandbox.permissions && sandbox.permissions.update && isSubscribed) {
            if (!sizes) getVmSizes();
            if (!disks) getVmDisks();
            if (!os) getVms();
        }
        return () => setIsSubscribed(false);
    }, [sandbox.permissions]);

    const getVmSizes = () => {
        getVirtualMachineSizes(sandbox.id, controller.signal).then((result: any) => {
            if (result && result.message) {
                console.log('Err');
            } else if (result) {
                setSizes(result);
            }
        });
    };

    const getVmDisks = () => {
        getVirtualMachineDisks(sandbox.id, controller.signal).then((result: any) => {
            if (result && result.message) {
                console.log('Err');
            } else if (result) {
                setDisks(result);
            }
        });
    };

    const getVms = () => {
        getVirtualMachineOperatingSystems(sandbox.id, controller.signal).then((result: any) => {
            if (result && result.message) {
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
                return showAddNewVm ? (
                    <AddNewVm
                        setVms={setVms}
                        vms={vms}
                        sizes={sizes}
                        disks={disks}
                        setActiveTab={setActiveTab}
                        os={os}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                        setVm={setVm}
                        vm={vm}
                        setSizeFilter={setSizeFilter}
                        sizeFilter={sizeFilter}
                        setOsFilter={setOsFilter}
                        osFilter={osFilter}
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
                        permissions={sandbox.permissions}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                        setVmSaved={setVmSaved}
                        hasChangedVmRules={hasChangedVmRules}
                        setHasChangedVmRules={setHasChangedVmRules}
                    />
                );
        }
    };

    return (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '4px' }}>
            <Tabs style={{ borderRadius: '4px' }} activeTab={activeTab} onChange={(e: any) => onChange(e)}>
                <Tabs.List>
                    {showAddNewVm ? (
                        <Tabs.Tab key={1} style={{ borderRadius: '4px' }}>
                            Add new vm
                        </Tabs.Tab>
                    ) : (
                        <Tabs.Tab style={{ display: 'none' }} />
                    )}
                    {vms.length > 0 ? (
                        vms.map((_vm: any) => {
                            return (
                                <Tabs.Tab key={_vm.id} style={{ borderRadius: '4px' }} data-cy="vm_tab">
                                    {_vm.name}
                                </Tabs.Tab>
                            );
                        })
                    ) : (
                        <Tabs.Tab key={2} disabled>
                            {vmsReponse.loading ? 'loading..' : 'No virtual machines yet..'}
                        </Tabs.Tab>
                    )}
                </Tabs.List>
            </Tabs>
            {returnStepComponent()}
        </div>
    );
};

export default VmConfig;
