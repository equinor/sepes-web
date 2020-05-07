import {  apiCallWithToken } from '../auth/AuthFunctions';

export const callStudyList = async () => {
    await apiCallWithToken("https://localhost:44371/api/study/list");
}