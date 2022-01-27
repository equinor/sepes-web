import sandboxesReducer from '../../store/sandboxes/sandboxesSlice';
import resourcesReducer from '../../store/resources/resourcesSlice';
import studiesReducer from '../../store/studies/studiesSlice';
import { configureStore } from '@reduxjs/toolkit';

export const mockStore = (state: any) => {
    return configureStore({
        reducer: {
            sandboxes: sandboxesReducer,
            resources: resourcesReducer,
            studies: studiesReducer
        },
        preloadedState: state
    });
};

export default mockStore;
