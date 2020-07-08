import { apiCallWithToken, apiRequestWithToken, postputStudy } from '../auth/AuthFunctions';
import { StudyObj, DatasetObj } from "../components/common/interfaces";


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

export const removeStudyDataset = async (studyId:string, datasetId:string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets/' + datasetId, 'DELETE');
};

export const addStudySpecificDataset = async (studyId: string, dataset?:DatasetObj) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets/studyspecific', 'POST', dataset);
};

export const editStudySpecificDataset = async (studyId: string, dataset?:DatasetObj) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets/' + dataset?.id, 'PUT', dataset);
};

export const getStandardDataset = async (datasetId: string) => {
    return apiCallWithToken('api/datasets/' + datasetId);
};

export const getDataset = async (datasetId: string, studyId:string) => {
    return apiCallWithToken('api/studies/' + studyId + '/datasets/' + datasetId);
};

export const getParticipantList = async () => {
    return apiCallWithToken('api/participants');
};

export const addStudyParticipant = async (studyId:string, participantId:string, role:string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/participants/' + participantId + '/' + role, 'PUT');
};

export const removeStudyParticipant = async (studyId:string, participantId:string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/participants/' + participantId, 'DELETE');
};

export const postStudy = async (study: StudyObj, imageUrl:string) => {
  return postputStudy(study, 'api/studies/', 'POST', imageUrl);
};

export const putStudy = async (study: StudyObj, imageUrl:string) => {
  return postputStudy(study, 'api/studies/' + study.id + '/details', 'PUT', imageUrl);
};

/*
export const postOnlyBlobimage = async (imageUrl: string) => {
  return postOnlyBlob(imageUrl, '1', 'api/studies/1/logo');
};
*/
