import { DropdownObj, ParticipantObj, StudyObj } from '../interfaces';
import { isIterable, validateResourceName } from './helpers';

export const validateUserInputStudy = (study: StudyObj, validWBS: boolean | undefined): boolean => {
    let result = true;

    if (!validWBS && ((study.sandboxes && study.sandboxes.length) || (study.datasets && study.datasets.length))) {
        result = false;
    }

    if (!validateResourceName(study.name)) {
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
