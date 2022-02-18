import sandboxesReducer from '../../store/sandboxes/sandboxesSlice';
import resourcesReducer from '../../store/resources/resourcesSlice';
import studiesReducer from '../../store/studies/studiesSlice';
import datasetsReducer from '../../store/datasets/datasetsSlice';
import { configureStore } from '@reduxjs/toolkit';

export const mockStore = (state: any) => {
    return configureStore({
        reducer: {
            sandboxes: sandboxesReducer,
            resources: resourcesReducer,
            studies: studiesReducer,
            datasets: datasetsReducer
        },
        preloadedState: state
    });
};

export default mockStore;
