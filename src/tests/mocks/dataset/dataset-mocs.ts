import { DatasetObj } from '../../../components/common/interfaces';

export const dataset: DatasetObj = {
    name: 'testSandbox',
    studyName: 'testStudy',
    storageAccountLink: undefined,
    permissions: {
        deleteDataset: true,
        editDataset: true
    }
};

export const datasetWithoutPermissions: DatasetObj = {
    name: 'testSandbox',
    studyName: 'testStudy',
    storageAccountLink: undefined,
    permissions: {
        deleteDataset: false,
        editDataset: false
    }
};
