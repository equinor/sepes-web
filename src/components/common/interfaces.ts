export interface StudyObj {
    name: string;
    vendor: string;
    wbsCode: string;
    restricted: boolean;
    description: string;
    logoUrl: string;
    id: string;
    resultsAndLearnings: string;
    datasets: [];
    participants: [];
    sandboxes: [];
    permissions: StudyPermissions;
}

export interface StudyPermissions {
    addRemoveDataset: boolean;
    addRemoveParticipant: boolean;
    addRemoveSandbox: boolean;
    closeStudy: boolean;
    deleteStudy: boolean;
    readResulsAndLearnings: boolean;
    updateMetadata: boolean;
    updateResulsAndLearnings: boolean;
}

export interface ParticipantObj {
    fullName: string;
    emailAddress: string;
    role: string;
    id: string;
    source?: string;
    databaseId: number;
    objectId: string;
    userId: number;
}

export interface DatasetObj {
    name: string;
    storageAccountName?: string;
    location?: string;
    classification?: string;
    lraId?: number;
    dataId?: number;
    sourceSystem?: string;
    baDataOwner?: string;
    asset?: string;
    countryOfOrigin?: string;
    areaL1?: string;
    areaL2?: string;
    tags?: string;
    description?: string;
    studies?: [];
    id?: string;
    added?: boolean;
    studyId?: string;
    storageAccountLink?: string;
    permissions: DatasetPermissionObj;
}

export interface DatasetPermissionObj {
    deleteDataset: boolean;
    editDataset: boolean;
}

export interface AvailableDatasetObj {
    datasetId: string;
    name: string;
    classification: string;
    addedToSandbox: boolean;
}

export interface SandboxCreateObj {
    name: string;
    region: string;
    template: string;
    id: string;
}

export interface SandboxObj {
    deleted: boolean;
    region: string;
    resources: [];
    datasets: [];
    studyId: string;
    technicalContactEmail: string;
    technicalContactName: string;
    name: string;
    template: string;
    id: string;
    studyName: string;
    permissions: SandboxPermissions;
    linkToCostAnalysis?: string;
    currentPhase: number | undefined;
}

export interface SandboxPermissions {
    delete: boolean;
    editInboundRules: boolean;
    openInternet: boolean;
    update: boolean;
    increasePhase: boolean;
}

export interface GeneralPermissions {
    admin: boolean;
    canRead_PreApproved_Datasets: boolean;
    canEdit_PreApproved_Datasets: boolean;
    canCreateStudy: boolean;
    datasetAdmin: boolean;
    sponsor: boolean;
    emailAddress?: string;
    fullName?: string;
    userName?: string;
}

export interface DropdownObj {
    key: string;
    displayValue: string;
}

export interface VmObj {
    id: string;
    region: string;
    name: string;
    size: string;
    operatingSystem: string;
    distro: string;
    username: string;
    password: string;
    extendedInfo?: any;
    linkToExternalSystem: string;
    dataDisks: string[];
}

export interface SizeObj {
    description: string;
    category: string;
    key: string;
    displayValue: string;
}

export interface OperatingSystemObj {
    category: string;
    key: string;
    displayValue: string;
}

export interface resultsAndLearningsObj {
    resultsAndLearnings: string;
}

export interface CalculateNameObj {
    studyName: string;
    sandboxName: string;
    userSuffix: string;
}
export interface VmUsernameObj {
    username: string;
    operativeSystemType: string;
}

export interface DatasetResourcesObj {
    name: string;
    retryLink: string;
    status: string;
    type: string;
    linkToExternalSystem: string;
}
