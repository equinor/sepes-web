import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getDatasetFolderViewMode = () =>
    createSelector([(state: RootState) => state.userSettings.isDatasetFolderView], (isDatasetFolderView) => {
        return isDatasetFolderView;
    });

export const getUnsavedChangesValue = () =>
    createSelector([(state: RootState) => state.userSettings.hasUnsavedChanges], (hasUnsavedChanges) => {
        return hasUnsavedChanges;
    });
