import {  apiCallWithToken } from '../auth/AuthFunctions';

export const getStudyList = async () => {
    return apiCallWithToken('api/studies');
}

export const getStudy = async (id:string) => {
    return apiCallWithToken('api/studies/' + id);
}