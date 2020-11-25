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
    name?: string;
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
    studyId: string;
    technicalContactEmail: string;
    technicalContactName: string;
    name: string;
    template: string;
    id: string;
    studyName: string;
    permissions: SandboxPermissions;
}

export interface SandboxPermissions {
    delete: boolean;
    editRules: boolean;
    update: boolean;
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
