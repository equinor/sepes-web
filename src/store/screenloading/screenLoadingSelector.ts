import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getScreenLoadingFromStore = () =>
    createSelector([(state: RootState) => state.screenLoading.showLoading], (showLoading) => {
        return showLoading;
    });

export default getScreenLoadingFromStore;
