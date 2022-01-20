import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getCallResourcesStatus = () => createSelector(
     [(state:RootState) => state.sandboxes.callGetResources],
    (callGetResources) => {
        return callGetResources;
    }
);

export default getCallResourcesStatus;
