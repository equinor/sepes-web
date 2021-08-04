import { DropdownObj, ParticipantObj, StudyObj } from '../interfaces';
import { isIterable, validateResourceName } from './helpers';

export const validateUserInputStudy = (
    study: StudyObj,
    validWBS: boolean | undefined,
    wbsLoading: boolean,
    newStudy: boolean
): boolean => {
    let result = true;

    if (wbsLoading && !newStudy) {
        result = false;
    }

    if (
        validWBS === false &&
        ((study.sandboxes && study.sandboxes.length) || (study.datasets && study.datasets.length))
    ) {
        result = false;
    }

    if (!validateResourceName(study.name, true)) {
        result = false;
    }
    if (study.name === '' || study === undefined || study.vendor === '' || study.vendor === undefined) {
        result = false;
    }
    return result;
};

export const filterRoleList = (roles: any, selectedParticipant: ParticipantObj | undefined, study: StudyObj) => {
    if (!selectedParticipant) {
        return roles;
    }
    if (!isIterable(roles) || roles.length === 0) {
        return [];
    }
    let partAsSelected: any = [];
    partAsSelected = study.participants.filter(
        (participant: ParticipantObj) =>
            participant.userId === selectedParticipant?.databaseId ||
            participant.emailAddress === selectedParticipant?.emailAddress
    );
    const tempRoles: any = [...roles];
    roles.forEach((element: DropdownObj) => {
        for (let i = 0; i < partAsSelected.length; i++) {
            if (element.displayValue === partAsSelected[i].role) {
                tempRoles.splice(tempRoles.indexOf(element), 1);
            }
        }
    });
    return tempRoles;
};

export const returnWbsVariant = (wbsOnChangeIsValid: boolean | undefined) => {
    if (wbsOnChangeIsValid === undefined) {
        return 'default';
    }
    if (wbsOnChangeIsValid) {
        return 'success';
    }
    return 'error';
};

export const returnTooltipTextDeleteStudy = (study: StudyObj) => {
    if (study.sandboxes && study.sandboxes.length > 0) {
        return 'Delete sandboxes before deleting study';
    }
    return 'You do not have permission to delete this study';
};

export const returnTooltipTextSaveStudy = (
    wbsOnChangeIsValid,
    newStudy: boolean,
    study: StudyObj,
    studyOnChange: StudyObj,
    validateWbsInProgress
) => {
    if (
        wbsOnChangeIsValid === false &&
        !newStudy &&
        ((study.sandboxes && study.sandboxes.length) || (study.datasets && study.datasets.length))
    ) {
        return 'Can not change from valid to invalid WBS with active resources';
    }
    if (!validateUserInputStudy(studyOnChange, wbsOnChangeIsValid, validateWbsInProgress, newStudy)) {
        return 'Please fill out all required fields';
    }
    return '';
};
