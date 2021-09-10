import { AvailableDatasetObj, SandboxObj, SandboxPermissions, VmObj } from '../../../components/common/interfaces';

// Sandbox
export const sandbox: SandboxObj = {
    deleted: false,
    region: '',
    resources: [],
    datasets: [{ name: 'test', permissions: { deleteDataset: true, editDataset: true }, studyName: 'test' }],
    studyId: '',
    technicalContactEmail: '',
    technicalContactName: '',
    name: '',
    template: '',
    id: '1',
    currentPhase: undefined,
    linkToCostAnalysis: '',
    studyName: '',
    restrictionDisplayText: '',
    permissions: {
        delete: true,
        editInboundRules: true,
        openInternet: true,
        update: true,
        increasePhase: true
    }
};

export const sandboxWithNoDatasets: SandboxObj = {
    deleted: false,
    region: '',
    resources: [],
    datasets: [],
    studyId: '',
    technicalContactEmail: '',
    technicalContactName: '',
    name: '',
    template: '',
    id: '1',
    currentPhase: undefined,
    linkToCostAnalysis: '',
    studyName: '',
    restrictionDisplayText: '',
    permissions: {
        delete: true,
        editInboundRules: true,
        openInternet: true,
        update: true,
        increasePhase: true
    }
};

export const sandboxWithNoPermissions: SandboxObj = {
    deleted: false,
    region: '',
    resources: [],
    datasets: [],
    studyId: '',
    technicalContactEmail: '',
    technicalContactName: '',
    name: '',
    template: '',
    id: '1',
    currentPhase: undefined,
    linkToCostAnalysis: '',
    studyName: '',
    restrictionDisplayText: '',
    permissions: {
        delete: false,
        editInboundRules: false,
        openInternet: false,
        update: false,
        increasePhase: false
    }
};

export const sandboxWithAllPermissions: SandboxObj = {
    deleted: false,
    region: '',
    resources: [],
    datasets: [],
    studyId: '',
    technicalContactEmail: '',
    technicalContactName: '',
    name: '',
    template: '',
    id: '1',
    currentPhase: undefined,
    linkToCostAnalysis: '',
    studyName: '',
    restrictionDisplayText: '',
    permissions: {
        delete: true,
        editInboundRules: true,
        openInternet: true,
        update: true,
        increasePhase: true
    }
};

//Sandbox dataset

export const availableDataset: AvailableDatasetObj = {
    datasetId: '1',
    name: 'test',
    classification: 'open',
    addedToSandbox: true
};

export const availableDatasetLongName: AvailableDatasetObj = {
    datasetId: '1',
    name: 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
    classification: 'open',
    addedToSandbox: true
};

export const sandboxPermissions: SandboxPermissions = {
    delete: true,
    editInboundRules: true,
    openInternet: true,
    update: true,
    increasePhase: true
};

export const sandboxPermissionsNoPermissions: SandboxPermissions = {
    delete: false,
    editInboundRules: false,
    openInternet: false,
    update: false,
    increasePhase: false
};

// VM
export const vm: VmObj = {
    id: '1',
    name: '',
    region: 'norwayeast',
    size: '',
    operatingSystem: '',
    distro: 'win2019datacenter',
    username: '',
    password: '',
    linkToExternalSystem: '',
    dataDisks: [],
    rules: [
        { ip: '1.1.1.1', port: '80', description: 'rule1' },
        { ip: '1.1.1.2', port: '80', description: 'rule2' },
        { ip: '1.1.1.3', port: '80', description: 'rule3' }
    ]
};

export const vmWithEqualRules: VmObj = {
    id: '1',
    name: '',
    region: 'norwayeast',
    size: '',
    operatingSystem: '',
    distro: 'win2019datacenter',
    username: '',
    password: '',
    linkToExternalSystem: '',
    dataDisks: [],
    rules: [
        { ip: '1.1.1.1', port: '80', description: '' },
        { ip: '1.1.1.1', port: '80', description: '' },
        { ip: '1.1.1.1', port: '80', description: '' }
    ]
};

export const vmWithUnfinishedRule: VmObj = {
    id: '1',
    name: '',
    region: 'norwayeast',
    size: '',
    operatingSystem: '',
    distro: 'win2019datacenter',
    username: '',
    password: '',
    linkToExternalSystem: '',
    dataDisks: [],
    rules: [
        { ip: '1.1.1.1', port: '80', description: '' },
        { ip: '1.1.1.2', port: '80', description: 'rule2' },
        { ip: '1.1.1.3', port: '80', description: 'rule3' }
    ]
};

export const vmWithOpenInternet: VmObj = {
    id: '',
    name: '',
    region: 'norwayeast',
    size: '',
    operatingSystem: '',
    distro: 'win2019datacenter',
    username: '',
    password: '',
    linkToExternalSystem: '',
    dataDisks: [],
    rules: [
        { ip: '1.1.1.1', port: '80', action: 0, direction: 1 },
        { ip: '1.1.1.2', port: '80' },
        { ip: '1.1.1.3', port: '80' }
    ]
};

export const vmWithIncorrectIpRule: VmObj = {
    id: '',
    name: '',
    region: 'norwayeast',
    size: '',
    operatingSystem: '',
    distro: 'win2019datacenter',
    username: '',
    password: '',
    linkToExternalSystem: '',
    dataDisks: [],
    rules: [
        { ip: '1.1.1.1fa', port: '80', action: 0, direction: 1 },
        { ip: '1.1.1.2', port: '80' },
        { ip: '1.1.1.3', port: '80' }
    ]
};

export const vmWithIncorrectPortRule: VmObj = {
    id: '',
    name: '',
    region: 'norwayeast',
    size: '',
    operatingSystem: '',
    distro: 'win2019datacenter',
    username: '',
    password: '',
    linkToExternalSystem: '',
    dataDisks: [],
    rules: [
        { ip: '1.1.1.1', port: '80aa', action: 0, direction: 1 },
        { ip: '1.1.1.2', port: '80' },
        { ip: '1.1.1.3', port: '80' }
    ]
};
