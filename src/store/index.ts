import { configureStore } from '@reduxjs/toolkit';
import sandboxesReducer from './sandboxes/sandboxesSlice';
import resourcesReducer from './resources/resourcesSlice';
import studiesReducer from './studies/studiesSlice';
import datasetsReducer from './datasets/datasetsSlice';

export const store = configureStore({
    reducer: {
        sandboxes: sandboxesReducer,
        resources: resourcesReducer,
        studies: studiesReducer,
        datasets: datasetsReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
