import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SandboxObj } from 'components/common/interfaces';

interface SandboxesState {
    callGetResources: boolean;
    sandbox: SandboxObj;
}

const sandbox: SandboxObj = {
    deleted: false,
    region: '',
    resources: [],
    datasets: [],
    studyId: '',
    technicalContactEmail: '',
    technicalContactName: '',
    name: '',
    template: '',
    id: '',
    currentPhase: undefined,
    linkToCostAnalysis: '',
    studyName: '',
    restrictionDisplayText: '',
    permissions: {
        delete: false,
        editInboundRules: false,
        openInternet: false,
        update: false,
        increasePhase: false
    }
};

const initialState: SandboxesState = {
    callGetResources: false,
    sandbox
};

export const sandboxesSlice = createSlice({
    name: 'sandboxes',
    initialState,
    reducers: {
        setCallResources: (state: SandboxesState, action: PayloadAction<boolean>) => {
            return { ...state, callGetResources: action.payload };
        },
        setSandboxInStore: (state: SandboxesState, action: PayloadAction<any>) => {
            return { ...state, sandbox: action.payload };
        }
    }
});

export const { setCallResources, setSandboxInStore } = sandboxesSlice.actions;

export default sandboxesSlice.reducer;
