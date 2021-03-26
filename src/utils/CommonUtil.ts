export const getStudyId = (): string => {
    return window.location.pathname.split('/')[2];
};

export const getDatasetId = (): string => {
    return window.location.pathname.split('/')[4];
};
export const getSandboxId = (): string => {
    return window.location.pathname.split('/')[4];
};
