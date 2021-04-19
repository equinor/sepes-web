import { DatasetObj } from '../interfaces';
import { checkIfInputIsNumberWihoutCharacters } from './helpers';

export const checkForInputErrors = (dataset: DatasetObj) => {
    if (!dataset?.name?.length || !dataset?.classification?.length || !dataset?.location?.length) {
        return true;
    }
    if (dataset?.dataId && !checkIfInputIsNumberWihoutCharacters(dataset?.dataId.toString())) {
        return true;
    }
    return false;
};

export const checkIfFileAlreadyIsUploaded = (droppedFiles, existingFiles, setDuplicateFiles) => {
    const newArray: any = [];
    droppedFiles.forEach((file: any) => {
        const res = existingFiles
            .map((e) => {
                if (e.path) {
                    return e.path.substring(1);
                }
                return '';
            })
            .indexOf(file.path.substring(1));
        if (res === -1) newArray.push(file);
    });

    if (droppedFiles.length !== newArray.length) {
        setDuplicateFiles(true);
    }

    return newArray;
};

export const checkIfDeleteIsEnabled = (_file, dataset: DatasetObj, progressArray): boolean => {
    if (!dataset.permissions.editDataset) {
        return true;
    }
    const index = progressArray.findIndex((x: any) => x.name === _file.name);
    if (index === -1) {
        return false;
    }
    if (progressArray[index].percent === 1) {
        return true;
    }
    return false;
};

export const setFilesProgressToOnePercent = (_files: any, abortArray) => {
    _files.forEach(async (file: any) => {
        const filePercent = { blobName: file.name, percent: 1, controller: new AbortController() };
        abortArray.push(filePercent);
    });
};

export const checkUrlIfGeneralDataset = () => {
    if (window.location.pathname.split('/')[1] === 'datasets') {
        return true;
    }
    return false;
};
