export const checkUrlIfGeneralDataset = (): boolean => {
    if (window.location.pathname.split('/')[1] === 'datasets') {
        return true;
    }
    return false;
};

export const checkUrlNewDataset = () => {
    if (window.location.pathname.split('/')[2] === 'new') {
        return true;
    }
    return false;
};
