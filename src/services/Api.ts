import { apiRequestWithToken, postputStudy, postFile, apiRequestPermissionsWithToken } from '../auth/AuthFunctions';
import {
    StudyObj,
    DatasetObj,
    SandboxObj,
    SandboxCreateObj,
    ParticipantObj,
    VmObj,
    resultsAndLearningsObj,
    CalculateNameObj,
    VmUsernameObj
} from '../components/common/interfaces';

//Study

export const getStudyList = async () => {
    return apiRequestWithToken('api/studies', 'GET');
};

export const getStudy = async (id: string) => {
    return apiRequestWithToken('api/studies/' + id, 'GET');
};

export const createStudy = async (study: StudyObj) => {
    return apiRequestWithToken('api/studies/', 'POST', study);
};

export const deleteStudy = async (studyId: string) => {
    return apiRequestWithToken('api/studies/' + studyId, 'DELETE');
};

export const editStudy = async (study: StudyObj, id?: string) => {
    return apiRequestWithToken('api/studies/' + id + '/details', 'PUT', study);
};

export const getDatasetList = async () => {
    return apiRequestWithToken('api/datasets/', 'GET');
};

export const addStudyDataset = async (studyId: string, datasetId: string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets/' + datasetId, 'PUT');
};

export const unlinkStudyDataset = async (studyId: string, datasetId: string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets/' + datasetId, 'DELETE');
};

export const removeStudyDataset = async (datasetId: string) => {
    return apiRequestWithToken('api/datasets/' + datasetId, 'DELETE');
};

export const getDatasetsForStudy = async (studyId: string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets', 'GET');
};

export const editResultsAndLearnings = async (resultsAndLearnings: resultsAndLearningsObj, studyId: string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/resultsAndLearnings', 'PUT', resultsAndLearnings);
};

// Dataset files

export const deleteFileInDataset = async (datasetId: string, fileName: string) => {
    return apiRequestWithToken('api/datasets/' + datasetId + '/files/fileName?fileName=' + fileName, 'DELETE');
};

//Specific dataset
export const addStudySpecificDataset = async (studyId: string, dataset?: DatasetObj) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets/studyspecific', 'POST', dataset);
};

export const editStudySpecificDataset = async (studyId: string, dataset?: DatasetObj) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets/studyspecific/' + dataset?.id, 'PUT', dataset);
};

export const getDataset = async (datasetId: string, studyId: string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets/' + datasetId, 'GET');
};

export const getStudySpecificDatasetResources = async (datasetId: string, studyId: string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets/' + datasetId + '/resources', 'GET');
};

export const getStudySpecificDatasetFiles = async (datasetId: string, signal: any) => {
    return apiRequestWithToken('api/datasets/' + datasetId + '/files', 'GET', undefined, signal);
};

export const getDatasetSasToken = async (datasetId: string, signal: any) => {
    return apiRequestWithToken('api/datasets/' + datasetId + '/saskey', 'GET', undefined, signal);
};

//Standard dataset

export const getStandardDatasetFiles = async (datasetId: string) => {
    return apiRequestWithToken('api/datasets/' + datasetId + '/files', 'GET');
};

export const getStandardDataset = async (datasetId: string) => {
    return apiRequestWithToken('api/datasets/' + datasetId, 'GET');
};

export const createStandardDataset = async (dataset?: DatasetObj) => {
    return apiRequestWithToken('api/datasets/', 'POST', dataset);
};

export const updateStandardDataset = async (datsetId: string, dataset?: DatasetObj) => {
    return apiRequestWithToken('api/datasets/' + datsetId, 'PUT', dataset);
};

export const getParticipantList = async (search: string) => {
    return apiRequestWithToken('api/participants/?search=' + search, 'GET');
};

export const addStudyParticipant = async (studyId: string, role: string, participant?: ParticipantObj) => {
    return apiRequestWithToken('api/studies/' + studyId + '/participants/' + role, 'PUT', participant);
};

export const removeStudyParticipant = async (studyId: string, userId: string, roleName: string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/participants/' + userId + '/' + roleName, 'DELETE');
};

export const postStudy = async (study: StudyObj, imageUrl: string) => {
    return postputStudy(study, 'api/studies/', 'POST', imageUrl);
};

export const putStudy = async (study: StudyObj, imageUrl: string) => {
    console.log(imageUrl);
    return postputStudy(study, 'api/studies/' + study.id + '/details', 'PUT', imageUrl);
};

//Sandbox

export const getSandbox = async (sandboxId: string) => {
    return apiRequestWithToken('api/sandboxes/' + sandboxId, 'GET');
};

export const createSandbox = async (studyId: string, sandbox: SandboxCreateObj) => {
    return apiRequestWithToken('api/studies/' + studyId + '/sandboxes', 'POST', sandbox);
};

export const deleteSandbox = async (sandboxId: string) => {
    return apiRequestWithToken('api/sandboxes/' + sandboxId, 'DELETE');
};

export const getResourceStatus = async (sandboxId: string, signal: any) => {
    return apiRequestWithToken('api/sandboxes/' + sandboxId + '/resources', 'GET', undefined, signal);
};

export const getSandboxCostAnalysis = async (sandboxId: string) => {
    return apiRequestWithToken('api/sandboxes/' + sandboxId + '/costanalysis', 'GET');
};

export const makeAvailable = async (sandboxId: string) => {
    return apiRequestWithToken('api/sandboxes/' + sandboxId + '/nextPhase', 'POST');
};

//Sandbox dataset

export const getDatasetForSandbox = async (sandboxId: string) => {
    return apiRequestWithToken('api/sandbox/' + sandboxId + '/datasets', 'GET');
};

export const putDatasetForSandbox = async (sandboxId: string, datasetId: string) => {
    return apiRequestWithToken('api/sandbox/' + sandboxId + '/datasets/' + datasetId, 'PUT');
};

export const deleteDatasetForSandbox = async (sandboxId: string, datasetId: string) => {
    return apiRequestWithToken('api/sandbox/' + sandboxId + '/datasets/' + datasetId, 'DELETE');
};

export const deleteDatasetForSandbox2 = async (datasetId: string) => {
    return apiRequestWithToken('api/datasets/' + datasetId, 'DELETE');
};

//Virtual machine

export const createVirtualMachine = async (sandboxId: string, vm: VmObj) => {
    return apiRequestWithToken('api/virtualmachines/' + sandboxId, 'POST', vm);
};

export const deleteVirtualMachine = async (vmId: string) => {
    return apiRequestWithToken('api/virtualmachines/' + vmId, 'DELETE');
};

export const getVirtualMachineForSandbox = async (sandboxId: string) => {
    return apiRequestWithToken('api/virtualmachines/forsandbox/' + sandboxId, 'GET');
};

export const getVmName = async (input: CalculateNameObj) => {
    return apiRequestWithToken('api/virtualmachines/calculateName', 'POST', input);
};

export const validateVmUsername = async (username: VmUsernameObj) => {
    return apiRequestWithToken('api/virtualmachines/validateUsername', 'POST', username);
};

export const getVirtualMachineSizes = async (sandboxId: string, signal: any) => {
    return apiRequestWithToken('api/virtualmachines/' + sandboxId + '/sizes', 'GET', undefined, signal);
};

export const getVirtualMachineDisks = async (signal: any) => {
    return apiRequestWithToken('api/virtualmachines/disks', 'GET', undefined, signal);
};

export const getVirtualMachineOperatingSystems = async (sandboxId: string, signal: any) => {
    return apiRequestWithToken('api/virtualmachines/' + sandboxId + '/operatingsystems', 'GET', undefined, signal);
};

export const getVirtualMachineExtended = async (vmId: string) => {
    return apiRequestWithToken('api/virtualmachines/' + vmId + '/extended', 'GET');
};

export const getVirtualMachineCost = async (sandboxId: string, vm: any) => {
    return apiRequestWithToken('api/virtualmachines/' + sandboxId + '/calculatedVmprice', 'POST', vm);
};

export const createVirtualMachineRule = async (rule: any, vmId: string) => {
    return apiRequestWithToken('api/virtualmachines/' + vmId + '/rules', 'POST', rule);
};

export const getVirtualMachineRule = async (vmId: string) => {
    return apiRequestWithToken('api/virtualmachines/' + vmId + '/rules', 'GET');
};

export const getVirtualExternalLink = async (vmId: string) => {
    return apiRequestWithToken('api/virtualmachines/' + vmId + '/externalLink', 'GET');
};

//Lookup

export const getAzureRegions = async () => {
    return apiRequestWithToken('api/lookup/regions', 'GET');
};

export const getStudyRoles = async () => {
    return apiRequestWithToken('api/lookup/studyroles', 'GET');
};

//Permission

export const getPermissions = async () => {
    return apiRequestPermissionsWithToken('api/permissions', 'GET');
};

// Files

export const addFiles = async (datasetId: string, formData: any): Promise<any> => {
    return postFile('api/datasets/' + datasetId + '/files', formData);
    /*
    if (studyId) {
        return postFile(`datasetfile/addfiles?datasetId=${datasetId}&studyId=${studyId}`, formData);
    }
    //Endpoint does not exists yet
    return postFile(`datasetfile/addfiles?datasetId=${datasetId}`, formData);
    */
};
/*
export const postOnlyBlobimage = async (imageUrl: string) => {
  return postOnlyBlob(imageUrl, '1', 'api/studies/1/logo');
};
*/
