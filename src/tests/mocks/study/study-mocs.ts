import { StudyObj } from '../../../components/common/interfaces';
import { dataset } from '../dataset/dataset-mocs';
import { sandbox } from '../sandbox/sandbox-mocks';

export const study: StudyObj = {
    name: 'Study Mock',
    vendor: 'Mock123',
    wbsCode: '123',
    restricted: false,
    description: '',
    logoUrl: '',
    id: '',
    resultsAndLearnings: '',
    datasets: [],
    participants: [],
    wbsCodeValid: false,
    sandboxes: [],
    permissions: {
        addRemoveDataset: true,
        addRemoveParticipant: true,
        addRemoveSandbox: true,
        closeStudy: true,
        deleteStudy: true,
        readResulsAndLearnings: true,
        updateMetadata: true,
        updateResulsAndLearnings: true
    }
};

export const studyWithNoWbsCode: StudyObj = {
    name: 'Study Mock',
    vendor: 'Mock123',
    wbsCode: '',
    restricted: false,
    description: '',
    logoUrl: '',
    id: '',
    resultsAndLearnings: '',
    datasets: [],
    participants: [],
    wbsCodeValid: false,
    sandboxes: [],
    permissions: {
        addRemoveDataset: true,
        addRemoveParticipant: true,
        addRemoveSandbox: true,
        closeStudy: true,
        deleteStudy: true,
        readResulsAndLearnings: true,
        updateMetadata: true,
        updateResulsAndLearnings: true
    }
};

export const studyWithDataset: StudyObj = {
    name: 'Study Mock',
    vendor: 'Mock123',
    wbsCode: '123',
    restricted: false,
    description: '',
    logoUrl: '',
    id: '',
    resultsAndLearnings: '',
    datasets: [dataset],
    participants: [],
    wbsCodeValid: false,
    sandboxes: [],
    permissions: {
        addRemoveDataset: true,
        addRemoveParticipant: true,
        addRemoveSandbox: true,
        closeStudy: true,
        deleteStudy: true,
        readResulsAndLearnings: true,
        updateMetadata: true,
        updateResulsAndLearnings: true
    }
};

export const studyWithSandbox: StudyObj = {
    name: 'Study Mock',
    vendor: 'Mock123',
    wbsCode: '123',
    restricted: false,
    description: '',
    logoUrl: '',
    id: '',
    resultsAndLearnings: '',
    datasets: [dataset],
    participants: [],
    wbsCodeValid: false,
    sandboxes: [sandbox],
    permissions: {
        addRemoveDataset: true,
        addRemoveParticipant: true,
        addRemoveSandbox: true,
        closeStudy: true,
        deleteStudy: true,
        readResulsAndLearnings: true,
        updateMetadata: true,
        updateResulsAndLearnings: true
    }
};

export const studyWithSandboxes: StudyObj = {
    name: 'Study Mock',
    vendor: 'Mock123',
    wbsCode: '123',
    restricted: false,
    description: '',
    logoUrl: '',
    id: '',
    resultsAndLearnings: '',
    datasets: [dataset],
    participants: [],
    wbsCodeValid: false,
    sandboxes: [
        {
            name: 'test1',
            id: '1'
        },
        {
            name: 'test2',
            id: '2'
        }
    ],
    permissions: {
        addRemoveDataset: true,
        addRemoveParticipant: true,
        addRemoveSandbox: true,
        closeStudy: true,
        deleteStudy: true,
        readResulsAndLearnings: true,
        updateMetadata: true,
        updateResulsAndLearnings: true
    }
};
