import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getCallResourcesStatus = () =>
    createSelector([(state: RootState) => state.sandboxes.callGetResources], (callGetResources) => {
        return callGetResources;
    });

export const getSandboxFromStore = () =>
    createSelector([(state: RootState) => state.sandboxes.sandbox], (sandbox) => {
        return sandbox;
    });
