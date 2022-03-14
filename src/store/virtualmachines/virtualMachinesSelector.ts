import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getVirtualMachinesFromStore = () =>
    createSelector([(state: RootState) => state.virtualMachines.list], (vms) => {
        return vms;
    });

export default getVirtualMachinesFromStore;
