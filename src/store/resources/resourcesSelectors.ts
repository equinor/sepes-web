import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getResourcesFromStore = () => createSelector(
    [(state: RootState) => state.resources.list],
    (resourceList) => {
        return resourceList;
    }
);

export default getResourcesFromStore;
