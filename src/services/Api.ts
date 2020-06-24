import { apiCallWithToken, apiRequestWithToken } from '../auth/AuthFunctions';
import { StudyObj } from "../components/common/interfaces"

export const getStudyList = async () => {
    return apiCallWithToken('api/studies');
};

export const getStudy = async (id:string) => {
    return apiCallWithToken('api/studies/' + id);
};

export const createStudy = async (study:StudyObj) => {
    return apiRequestWithToken('api/studies/', 'POST', study);
};

export const editStudy = async (study:StudyObj, id?:string) => {
    return apiRequestWithToken('api/studies/' + id + '/details', 'PUT', study);
};

export const getDatasetList = async () => {
    return apiCallWithToken('api/datasets/');
};

export const addStudyDataset = async (studyId:string, datasetId:string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets/' + datasetId, 'PUT');
};