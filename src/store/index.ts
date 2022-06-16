import { configureStore } from '@reduxjs/toolkit';
import sandboxesReducer from './sandboxes/sandboxesSlice';
import studiesReducer from './studies/studiesSlice';
import datasetsReducer from './datasets/datasetsSlice';
import userSettingsReducer from './usersettings/userSettingsSlice';
import screenLoadingReducer from './screenloading/screenLoadingSlice';
import virtualMachinesReducer from './virtualmachines/virtualMachinesSlice';
import apiSlice from 'services/apiSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        sandboxes: sandboxesReducer,
        studies: studiesReducer,
        datasets: datasetsReducer,
        virtualMachines: virtualMachinesReducer,
        userSettings: userSettingsReducer,
        screenLoading: screenLoadingReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
