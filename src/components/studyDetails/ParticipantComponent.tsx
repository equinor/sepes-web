import React, { useState, useEffect, useContext } from 'react';
import { Button, Icon, DotProgress, Tooltip } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import styled from 'styled-components';
import * as api from '../../services/Api';
import ParticipantTable from './Tables/ParticipantTable';
import { ParticipantObj, DropdownObj, StudyObj } from '../common/interfaces';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import AsynchSelect from '../common/customComponents/AsyncSelect';
import * as notify from '../common/notify';
import { ValidateEmail } from '../common/helpers';
import useFetchUrl from '../common/hooks/useFetchUrl';
import { UserConfig } from '../../index';
import { useHistory } from 'react-router-dom';

const icons = {
    close
};
Icon.add(icons);

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 0.1fr minmax(305px, 1fr);
    width: 100%;
    grid-gap: 10px;
`;

const SearchWrapper = styled.div`
    margin-left: auto;
    margin-top: 32px;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
`;

const TableWrapper = styled.div`
    margin-top: 16px;
`;

type ParicipantComponentProps = {
    study: StudyObj;
    setStudy: any;
    setUpdateCache: any;
    updateCache: any;
};

const ParicipantComponent: React.FC<ParicipantComponentProps> = ({ study, setStudy, setUpdateCache, updateCache }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [roles, setRoles] = useState<any>();
    const [participantNotSelected, setParticipantNotSelected] = useState<boolean>(true);
    const [roleNotSelected, setRoleNotSelected] = useState<boolean>(true);
    const [selectedParticipant, setSelectedParticipant] = useState<ParticipantObj | undefined>();
    const [text, setText] = useState<string>('Search or add by e-mail');
    const [role, setRole] = useState<string>('');
    const rolesResponse = useFetchUrl('lookup/studyroles', setRoles);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const user = useContext(UserConfig);
    const history = useHistory();

    useEffect(() => {
        setIsSubscribed(true);
        return () => setIsSubscribed(false);
    }, [participantNotSelected, study.permissions.addRemoveParticipant]);

    const removeParticipant = (participant: any) => {
        let participantList: any = [...study.participants];
        participantList.splice(participantList.indexOf(participant), 1);
        setStudy({ ...study, participants: participantList });
        const studyId = window.location.pathname.split('/')[2];
        setUpdateCache({ ...updateCache, ['studies/' + studyId]: true });
        api.removeStudyParticipant(studyId, participant.userId, participant.role).then((result: any) => {
            if (!result.Message && isSubscribed) {
                if (user.getAccount().userName === participant.userName) {
                    history.push('/');
                }
            } else {
                notify.show('danger', '500', result.Message, result.requestId);
            }
            rolesResponse.setLoading(false);
        });
    };

    const addParticipant = () => {
        rolesResponse.setLoading(true);
        setRole('');
        setRoleNotSelected(true);
        const studyId = window.location.pathname.split('/')[2];
        setUpdateCache({ ...updateCache, ['studies/' + studyId]: true });
        if (!participantNotSelected) {
            api.addStudyParticipant(studyId, role, selectedParticipant).then((result: any) => {
                if (!result.Message) {
                    let participantList: any = [...study.participants];
                    participantList.push(result);
                    setStudy({ ...study, participants: participantList });
                } else {
                    notify.show('danger', '500', result.Message, result.requestId);
                    console.log('Err getting participants');
                }
                rolesResponse.setLoading(false);
            });
        } else {
            // TODO Implement backend to handle email
            console.log('Send email to backend', text);
        }
    };

    const filterRoleList = () => {
        if (!selectedParticipant) {
            return roles;
        }
        let partAsSelected: any = [];
        partAsSelected = study.participants.filter(
            (participant: ParticipantObj) =>
                participant.userId === selectedParticipant?.databaseId ||
                participant.emailAddress === selectedParticipant?.emailAddress
        );
        const tempRoles: any = [...roles];
        roles.forEach((element: DropdownObj, key: number) => {
            for (let i = 0; i < partAsSelected.length; i++) {
                if (element.displayValue === partAsSelected[i].role) {
                    tempRoles.splice(tempRoles.indexOf(element), 1);
                }
            }
        });
        return tempRoles;
    };

    const getParticipants = (inputValue: string, callback: any): void => {
        api.getParticipantList(inputValue || 'a').then((result: any) => {
            if (!result.Message) {
                let temp = result.map((user) => {
                    return {
                        label: `${user.fullName} (${user.emailAddress})`,
                        value: user.objectId,
                        emailAddress: user.emailAddress,
                        source: user.source,
                        objectId: user.objectId,
                        name: user.fullName,
                        databaseId: user.databaseId
                    };
                });
                callback(temp);
            } else {
                console.log('err');
                //notify.show('danger', '500');
            }
        });
    };

    const selectParticipant = (row: any) => {
        setText(row.label);
        setParticipantNotSelected(false);
        let participant: any = row;
        setSelectedParticipant(participant);
        setIsOpen(false);
    };

    const handleChange = (value) => {
        setRole(value);
        setRoleNotSelected(false);
    };

    const handleInputChange = (value: string) => {
        setRole('');
        setRoleNotSelected(true);
        if (value !== '') {
            setText(value);
        } else if (value === '' && text.length === 1) {
            setText('');
            setParticipantNotSelected(true);
        }
    };

    const checkIfButtonDisabled = () => {
        if (ValidateEmail(text)) {
            return roleNotSelected;
        }
        return participantNotSelected || roleNotSelected;
    };

    return (
        <Wrapper>
            <SearchWrapper>
                <Tooltip
                    title={
                        study.permissions && study.permissions.addRemoveParticipant
                            ? ''
                            : 'You do not have access to add participants'
                    }
                    placement="top"
                >
                    <div
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                        style={{ width: '300px', marginTop: '-16px' }}
                    >
                        <AsynchSelect
                            label="Add participants"
                            onChange={(option: any) => selectParticipant(option)}
                            placeholder={''}
                            selectedOption={{ value: 'Search..', label: text }}
                            onInputChange={handleInputChange}
                            disabled={study.permissions && !study.permissions.addRemoveParticipant}
                            loadOptions={
                                study.permissions && study.permissions.addRemoveParticipant ? getParticipants : null
                            }
                        />
                    </div>
                </Tooltip>
                <div style={{ marginTop: '-16px' }}>
                    <Tooltip
                        title={
                            participantNotSelected && study.permissions && study.permissions.addRemoveParticipant
                                ? 'Select participant before role'
                                : ''
                        }
                        placement="top"
                    >
                        <CoreDevDropdown
                            label="Role"
                            options={filterRoleList()}
                            onChange={handleChange}
                            name="region"
                            width="224px"
                            resetState={roleNotSelected}
                            disabled={participantNotSelected}
                        />
                    </Tooltip>
                </div>
                <Button variant="outlined" disabled={checkIfButtonDisabled()} onClick={addParticipant}>
                    {rolesResponse.loading ? <DotProgress variant="green" /> : 'Add participant'}
                </Button>
            </SearchWrapper>
            <TableWrapper>
                <ParticipantTable
                    participants={study.participants && study.participants}
                    removeParticipant={removeParticipant}
                    editMode
                    permissions={study.permissions}
                />
            </TableWrapper>
        </Wrapper>
    );
};

export default ParicipantComponent;
