import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SandboxesState {
    callGetResources: boolean;
}

const initialState: SandboxesState = {
    callGetResources: false
};

export const sandboxesSlice = createSlice({
    name: 'sandboxes',
    initialState,
    reducers: {
        setCallResources: (state: SandboxesState, action: PayloadAction<boolean>) => {
            return { ...state, callGetResources: action.payload };
        }
    }
});

export const { setCallResources } = sandboxesSlice.actions;

export default sandboxesSlice.reducer;
