import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getStudyFromStore = () =>
    createSelector([(state: RootState) => state.studies.study], (study) => {
        return study;
    });

export default getStudyFromStore;
