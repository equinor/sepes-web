import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResourcesState {
    list: Array<ResourceItem>;
}

interface ResourceItem {
    additionalProperties: any;
    linkToExternalSystem: string;
    name: string;
    retryLink: string;
    status: string;
    type: string;
}

const initialState: ResourcesState = {
    list: []
};

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        setResourcesInStore: (state: ResourcesState, action: PayloadAction<Array<ResourceItem>>) => {
            return { ...state, list: action.payload };
        },
        setResourcesToInitialState: (state: ResourcesState) => {
            return { ...state, list: [] };
        }
    }
});

export const { setResourcesInStore, setResourcesToInitialState } = resourcesSlice.actions;

export default resourcesSlice.reducer;
