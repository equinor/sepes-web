import {  apiCallWithToken } from '../auth/AuthFunctions';

export const callStudyList = async () => {
    return await apiCallWithToken("api/study/list");
}