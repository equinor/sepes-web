import sandboxesReducer from '../../store/sandboxes/sandboxesSlice';
import studiesReducer from '../../store/studies/studiesSlice';
import datasetsReducer from '../../store/datasets/datasetsSlice';
import userSettingsReducer from '../../store/usersettings/userSettingsSlice';
import screenLoadingReducer from '../../store/screenloading/screenLoadingSlice';
import { configureStore } from '@reduxjs/toolkit';
import apiSlice from 'services/apiSlice';

export const mockStore = (state: any) => {
    return configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            sandboxes: sandboxesReducer,
            studies: studiesReducer,
            datasets: datasetsReducer,
            userSettings: userSettingsReducer,
            screenLoading: screenLoadingReducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
        preloadedState: state
    });
};

export default mockStore;
