import sandboxesReducer from '../../store/sandboxes/sandboxesSlice';
import resourcesReducer from '../../store/resources/resourcesSlice';
import studiesReducer from '../../store/studies/studiesSlice';
import datasetsReducer from '../../store/datasets/datasetsSlice';
import userSettingsReducer from '../../store/usersettings/userSettingsSlice';
import screenLoadingReducer from '../../store/screenloading/screenLoadingSlice';
import { configureStore } from '@reduxjs/toolkit';

export const mockStore = (state: any) => {
    return configureStore({
        reducer: {
            sandboxes: sandboxesReducer,
            resources: resourcesReducer,
            studies: studiesReducer,
            datasets: datasetsReducer,
            userSettings: userSettingsReducer,
            screenLoading: screenLoadingReducer
        },
        preloadedState: state
    });
};

export default mockStore;
