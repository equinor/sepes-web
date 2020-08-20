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
}

export interface ParticipantObj {
    name: string;
    emailAddress: string;
    role: string;
    id: string;
}

export interface DatasetObj {
    name?:string;
    storageAccountName?:string;
    location?:string;
    classification?:string;
    lraId?:number;
    dataId?:number;
    sourceSystem?:string;
    baDataOwner?:string;
    asset?:string;
    countryOfOrigin?:string;
    areaL1?:string;
    areaL2?:string;
    tags?:string;
    description?:string;
    studies?:[];
    id?:string;
}

export interface SandboxObj {
    name:string;
    location:string;
    template:string;
    id:string;
}