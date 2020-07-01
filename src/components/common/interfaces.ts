export interface StudyObj {
    name: string;
    vendor: string;
    wbsCode: string;
    restricted: boolean;
    description: string;
    logoUrl: string;
    id?: string;
    datasets?: [];
}

export interface ParticipantObj {
    name: string;
    emailAddress: string;
    role: string;
    id: string;
}