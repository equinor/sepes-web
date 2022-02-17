import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getDatasetFolderViewMode = () =>
    createSelector(
        [(state: RootState) => state.userSettings.isDatasetFolderView],
        (isDatasetFolderView) => {
            return isDatasetFolderView;
        }
    );

export default getDatasetFolderViewMode;
