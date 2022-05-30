import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VirtualMachinesState {
    list: Array<any>;
}

const initialState: VirtualMachinesState = {
    list: []
};

export const virtualmachinesSlice = createSlice({
    name: 'virtualmachines',
    initialState,
    reducers: {
        setVirtualMachinesInStore: (state: VirtualMachinesState, action: PayloadAction<any>) => {
            return { ...state, list: action.payload };
        },
        setVirtualMachinesToInitialState: (state: VirtualMachinesState) => {
            return { ...state, list: [] };
        },
        updateVirtualMachineRules: (state: VirtualMachinesState, action: PayloadAction<any>) => {
            const { vmId, rules } = action.payload;
            const vms = state.list.map((vm) => {
                if (vm.id === vmId) {
                    return { ...vm, rules };
                }
                return vm;
            });

            return { ...state, list: vms };
        },
        updateVirtualMachineExtendedInfo: (state: VirtualMachinesState, action: PayloadAction<any>) => {
            const { vmId, extendedInfo } = action.payload;
            const vms = state.list.map((vm) => {
                if (vm.id === vmId) {
                    return { ...vm, extendedInfo };
                }
                return vm;
            });

            return { ...state, list: vms };
        },
        updateVirtualMachineLinkToExternalSystem: (state: VirtualMachinesState, action: PayloadAction<any>) => {
            const { vmId, linkToExternalSystem } = action.payload;
            const vms = state.list.map((item) => {
                if (item.id === vmId) {
                    return { ...item, linkToExternalSystem };
                }
                return item;
            });

            return { ...state, list: vms };
        }
    }
});

export const {
    setVirtualMachinesInStore,
    setVirtualMachinesToInitialState,
    updateVirtualMachineRules,
    updateVirtualMachineLinkToExternalSystem,
    updateVirtualMachineExtendedInfo
} = virtualmachinesSlice.actions;

export default virtualmachinesSlice.reducer;
