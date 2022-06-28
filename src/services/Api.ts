import { apiRequestWithToken, createOrUpdateStudyRequest } from '../auth/AuthFunctions';
import {
    StudyObj,
    DatasetObj,
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

export const getStudy = async (id: string, signal: any) => {
    return apiRequestWithToken('api/studies/' + id, 'GET', undefined, signal);
};

export const createStudy = async (study: StudyObj, imageUrl: string) => {
    return createOrUpdateStudyRequest(study, imageUrl, 'api/studies/' + study.id, 'POST');
};

export const updateStudy = async (study: StudyObj, imageUrl: string) => {
    return createOrUpdateStudyRequest(study, imageUrl, 'api/studies/' + study.id + '/details', 'PUT');
};

export const closeStudy = async (studyId: string) => {
    return apiRequestWithToken('api/studies/' + studyId + '/close', 'PUT');
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
    return apiRequestWithToken('api/studies/datasets/studyspecific/' + datasetId, 'DELETE');
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

export const getDataset = async (datasetId: string, studyId: string, signal: any) => {
    return apiRequestWithToken('api/studies/' + studyId + '/datasets/' + datasetId, 'GET', undefined, signal);
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

export const getDatasetSasTokenDelete = async (datasetId: string, signal: any) => {
    return apiRequestWithToken('api/datasets/' + datasetId + '/saskeydelete', 'GET', undefined, signal);
};

//Standard dataset

export const getStandardDatasetFiles = async (datasetId: string) => {
    return apiRequestWithToken('api/datasets/' + datasetId + '/files', 'GET');
};

export const getStandardDataset = async (datasetId: string, signal: any) => {
    return apiRequestWithToken('api/datasets/' + datasetId, 'GET', undefined, signal);
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

export const getVirtualMachineDisks = async (sandboxId: string, signal: any) => {
    return apiRequestWithToken('api/virtualmachines/' + sandboxId + '/disks', 'GET', undefined, signal);
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

//Permission

export const getPermissions = async () => {
    return apiRequestWithToken('api/permissions', 'GET');
};

// WBS

export const validateWbsCode = async (wbsCode: string, signal: any) => {
    return apiRequestWithToken('api/wbsvalidation/' + wbsCode, 'GET', undefined, signal);
};
