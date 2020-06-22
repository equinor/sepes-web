import { apiCallWithToken, apiRequestWithToken } from '../auth/AuthFunctions';
import { StudyObj } from "../components/common/interfaces"

export const getStudyList = async () => {
    return apiCallWithToken('api/studies');
};

export const getStudy = async (id:string) => {
    return apiCallWithToken('api/studies/' + id);
};

export const createStudy = async (study:StudyObj) => {
    return apiRequestWithToken('api/studies/', study, 'POST');
};

export const editStudy = async (study:StudyObj, id?:string) => {
    return apiRequestWithToken('api/studies/' + id + '/details', study, 'PUT');
};
