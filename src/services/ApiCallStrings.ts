//study
export const getStudiesUrl = (): string => {
    return 'studies';
};
export const getStudyByIdUrl = (studyId: string) => {
    return 'studies/' + studyId;
};

export const getResultsAndLearningsUrl = (studyId: string) => {
    return 'studies/' + studyId + '/resultsandlearnings';
};

//dataset
export const getDatasetsUrl = (): string => {
    return 'datasets';
};
export const getStandardDatasetUrl = (datasetId: string) => {
    return 'datasets/' + datasetId;
};
export const getStudySpecificDatasetUrl = (datasetId: string, studyId: string) => {
    return 'studies/' + studyId + '/datasets/' + datasetId;
};

export const getStandardDatasetFilesUrl = (datasetId: string) => {
    return 'datasets/' + datasetId + '/files';
};

export const getDatasetsFilesUrl = (datasetId: string) => {
    return 'datasets/' + datasetId + '/files';
};

export const getDatasetsInStudyUrl = (studyId: string): string => {
    return 'studies/' + studyId + '/datasets';
};

//Sandbox

export const getSandboxByIdUrl = (sandboxId: string): string => {
    return 'sandboxes/' + sandboxId;
};

export const getVmsForSandboxUrl = (sandboxId: string): string => {
    return 'virtualmachines/forsandbox/' + sandboxId;
};

export const getDatasetsInSandboxUrl = (sandboxId: string): string => {
    return 'sandbox/' + sandboxId + '/datasets';
};

export const getAvailableDatasetsUrl = (sandboxId: string): string => {
    return 'sandbox/' + sandboxId + '/availabledatasets';
};

//lookup

export const getRegionsUrl = (): string => {
    return 'lookup/regions';
};
