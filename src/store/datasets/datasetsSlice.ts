import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DatasetObj } from '../../components/common/interfaces';

interface DatasetsState {
    dataset: DatasetObj;
}

const dataset: DatasetObj = {
    name: '',
    studyName: '',
    storageAccountLink: undefined,
    permissions: {
        deleteDataset: false,
        editDataset: false
    }
};

const initialState: DatasetsState = {
    dataset
};

export const datasetsSlice = createSlice({
    name: 'datasets',
    initialState,
    reducers: {
        setDatasetInStore: (state: DatasetsState, action: PayloadAction<any>) => {
            return { ...state, dataset: action.payload };
        },
        setDatasetToInitialState: (state: DatasetsState) => {
            return { ...state, dataset };
        }
    }
});

export const { setDatasetInStore, setDatasetToInitialState } = datasetsSlice.actions;

export default datasetsSlice.reducer;
