import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const datasetFolderViewSettingsName = 'is_dataset_folder_view';

interface UserSettingsState {
    isDatasetFolderView: boolean;
}

//TODO: move to seperate file to handle all local-storage functions
const getBooleanValue = (key: string) => {
    const value = localStorage.getItem(key);

    if (value === 'true') {
        return true;
    }

    return false;
};

const initialState: UserSettingsState = {
    isDatasetFolderView: getBooleanValue(datasetFolderViewSettingsName)
};

export const userSettingsSlice = createSlice({
    name: 'user-settings',
    initialState,
    reducers: {
        toggleDatasetFolderView: (state: UserSettingsState, action: PayloadAction<boolean>) => {
            localStorage.setItem(datasetFolderViewSettingsName, action.payload ? 'true' : 'false');
            return { ...state, isDatasetFolderView: action.payload };
        }
    }
});

export const { toggleDatasetFolderView } = userSettingsSlice.actions;

export default userSettingsSlice.reducer;
