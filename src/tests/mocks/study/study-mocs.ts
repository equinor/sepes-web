import { StudyObj } from '../../../components/common/interfaces';

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
