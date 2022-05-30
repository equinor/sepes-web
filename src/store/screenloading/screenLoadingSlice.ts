import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScreenLoadingState {
    showLoading: boolean;
}

const initialState: ScreenLoadingState = {
    showLoading: false
};

export const screenLoadingSlice = createSlice({
    name: 'screen-loading',
    initialState,
    reducers: {
        setScreenLoading: (state: ScreenLoadingState, action: PayloadAction<boolean>) => {
            return { ...state, showLoading: action.payload };
        }
    }
});

export const { setScreenLoading } = screenLoadingSlice.actions;

export default screenLoadingSlice.reducer;
