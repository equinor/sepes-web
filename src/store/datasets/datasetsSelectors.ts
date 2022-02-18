import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getDatasetFromStore = () =>
    createSelector([(state: RootState) => state.datasets.dataset], (dataset) => {
        return dataset;
    });

export default getDatasetFromStore;
