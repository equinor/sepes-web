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

export default checkForInputErrors;
