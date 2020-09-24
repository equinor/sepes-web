import { apiCallWithToken, apiRequestWithToken, postputStudy, postFile } from '../auth/AuthFunctions';
import { StudyObj, DatasetObj, SandboxObj, SandboxCreateObj, ParticipantObj } from "../components/common/interfaces";


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

//Specific dataset
export const addStudySpecificDataset = async (studyId: string, dataset?:DatasetObj) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets/studyspecific', 'POST', dataset);
};

export const editStudySpecificDataset = async (studyId: string, dataset?:DatasetObj) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets/studyspecific/' + dataset?.id, 'PUT', dataset);
};

export const getDataset = async (datasetId: string, studyId:string) => {
    return apiCallWithToken('api/studies/' + studyId + '/datasets/' + datasetId);
};

//Standard dataset

export const getStandardDataset = async (datasetId: string) => {
    return apiCallWithToken('api/datasets/' + datasetId);
};

export const createStandardDataset = async (dataset?:DatasetObj) => {
    return apiRequestWithToken('api/datasets/', 'POST', dataset);
};

export const updateStandardDataset = async (datsetId: string, dataset?:DatasetObj) => {
    return apiRequestWithToken('api/datasets/' + datsetId, 'PUT', dataset);
};

export const getStandardDatasets = async () => {
    return apiCallWithToken('api/datasets/');
};

export const getParticipantList = async (search: string) => {
    return apiCallWithToken('api/participants/?search=' + search);
};

export const addStudyParticipant = async (studyId:string, role:string, participant?:ParticipantObj) => {
    return apiRequestWithToken('api/studies/' + studyId + '/participants/' + role, 'PUT', participant);
};

export const removeStudyParticipant = async (studyId:string,userId:string, roleName:string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/participants/' + userId + '/' + roleName, 'DELETE');
};

export const postStudy = async (study: StudyObj, imageUrl:string) => {
  return postputStudy(study, 'api/studies/', 'POST', imageUrl);
};

export const putStudy = async (study: StudyObj, imageUrl:string) => {
  return postputStudy(study, 'api/studies/' + study.id + '/details', 'PUT', imageUrl);
};

//Sandbox

export const getSandbox = async (studyId: string, sandboxId: string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/sandboxes/' + sandboxId, 'GET');
};

export const createSandbox = async (studyId: string, sandbox:SandboxCreateObj) => {
    return apiRequestWithToken('api/studies/' + studyId + '/sandboxes', 'POST', sandbox);
};

export const deleteSandbox = async (studyId: string, sandboxId: string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/sandboxes/' + sandboxId, 'DELETE');
};

//Lookup

export const getAzureRegions = async () => {
    return apiRequestWithToken('api/lookup/regions', 'GET');
};

export const getStudyRoles = async () => {
    return apiRequestWithToken('api/lookup/studyroles', 'GET');
};


// Files

export const addFiles = async (datasetId: string, formData: any, studyId?: string): Promise<any> => {
    if (studyId) {
        return postFile(`datasetfile/addfiles?datasetId=${datasetId}&studyId=${studyId}`, formData);
    }
    //Endpoint does not exists yet
    return postFile(`datasetfile/addfiles?datasetId=${datasetId}`, formData);
}
/*
export const postOnlyBlobimage = async (imageUrl: string) => {
  return postOnlyBlob(imageUrl, '1', 'api/studies/1/logo');
};
*/
