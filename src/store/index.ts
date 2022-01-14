import { configureStore } from '@reduxjs/toolkit';
import sandboxesReducer from './sandboxes/sandboxesSlice';

export const store = configureStore({
    reducer: {
        sandboxes: sandboxesReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
