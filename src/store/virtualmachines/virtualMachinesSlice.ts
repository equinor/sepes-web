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
        }
    }
});

export const { setVirtualMachinesInStore, setVirtualMachinesToInitialState } = virtualmachinesSlice.actions;

export default virtualmachinesSlice.reducer;
