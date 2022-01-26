import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudyObj } from '../../components/common/interfaces';

interface StudiesState {
    study: StudyObj;
}

const study: StudyObj = {
    name: '',
    vendor: '',
    wbsCode: '',
    restricted: false,
    description: '',
    logoUrl: '',
    id: '',
    resultsAndLearnings: '',
    datasets: [],
    participants: [],
    wbsCodeValid: false,
    sandboxes: [],
    permissions: {
        addRemoveDataset: false,
        addRemoveParticipant: false,
        addRemoveSandbox: false,
        closeStudy: false,
        deleteStudy: false,
        readResulsAndLearnings: false,
        updateMetadata: false,
        updateResulsAndLearnings: false
    }
};

const initialState: StudiesState = {
    study
};

export const studiesSlice = createSlice({
    name: 'studies',
    initialState,
    reducers: {
        setStudyInStore: (state: StudiesState, action: PayloadAction<any>) => {
            return { ...state, study: action.payload };
        }
    }
});

export const { setStudyInStore } = studiesSlice.actions;

export default studiesSlice.reducer;
