/* eslint-disable consistent-return */
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
import { getStudyByIdUrl } from '../../services/ApiCallStrings';
import _ from 'lodash';

const icons = {
    close
};
Icon.add(icons);

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 0.1fr minmax(264px, 1fr);
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
    margin-top: 7px;
`;

type ParicipantComponentProps = {
    study: StudyObj;
    setStudy: any;
    setUpdateCache: any;
    updateCache: any;
};

const ParicipantComponent: React.FC<ParicipantComponentProps> = ({ study, setStudy, setUpdateCache, updateCache }) => {
    const [roles, setRoles] = useState<any>();
    const [participantNotSelected, setParticipantNotSelected] = useState<boolean>(true);
    const [roleNotSelected, setRoleNotSelected] = useState<boolean>(true);
    const [selectedParticipant, setSelectedParticipant] = useState<ParticipantObj | undefined>();
    const [text, setText] = useState<string>('Search or add by e-mail');
    const [role, setRole] = useState<string>('');
    const rolesResponse = useFetchUrl('lookup/studyroles/' + window.location.pathname.split('/')[2], setRoles);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const user = useContext(UserConfig);
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);

    const [debounce, setDebounce] = useState({ cb: () => {}, delay: 500 });

    // Listen to changes of debounce (function, delay), when it does clear the previos timeout and set the new one.
    useEffect(() => {
        const { cb, delay } = debounce;
        if (cb) {
            const timeout = setTimeout(cb, delay);
            return () => clearTimeout(timeout);
        }
    }, [debounce]);

    const loadOptions = (value: string, callback: any) => {
        setDebounce({
            cb: async () => {
                api.getParticipantList(value || 'a').then((result: any) => {
                    if (!result.Message) {
                        const temp = result.map((_user) => {
                            return {
                                label: `${_user.fullName} (${_user.emailAddress})`,
                                value: _user.objectId,
                                emailAddress: _user.emailAddress,
                                source: _user.source,
                                objectId: _user.objectId,
                                name: _user.fullName,
                                databaseId: _user.databaseId
                            };
                        });
                        callback(temp);
                    } else {
                        console.log('err');
                        //notify.show('danger', '500');
                    }
                });
            },
            delay: 500 // ms
        });
    };

    useEffect(() => {
        setIsSubscribed(true);
        return () => setIsSubscribed(false);
    }, [participantNotSelected, study.permissions.addRemoveParticipant]);

    const removeParticipant = (participant: any) => {
        const participantList: any = [...study.participants];
        participantList.splice(participantList.indexOf(participant), 1);
        setStudy({ ...study, participants: participantList });
        const studyId = window.location.pathname.split('/')[2];
        setUpdateCache({ ...updateCache, [getStudyByIdUrl(studyId)]: true });
        api.removeStudyParticipant(studyId, participant.userId, participant.role).then((result: any) => {
            if (result && !result.Message && isSubscribed) {
                const participantsWithuserid = study.participants.filter(
                    (part: any) => part.userId === participant.userId
                );
                if (user.getAccount().userName === participant.userName && participantsWithuserid.length === 1) {
                    history.push('/');
                }
            } else {
                notify.show('danger', '500', result);
            }
            rolesResponse.setLoading(false);
        });
    };

    const addParticipant = () => {
        rolesResponse.setLoading(true);
        setRole('');
        setRoleNotSelected(true);
        const studyId = window.location.pathname.split('/')[2];
        setUpdateCache({ ...updateCache, [getStudyByIdUrl(studyId)]: true });
        if (!participantNotSelected) {
            setLoading(true);
            api.addStudyParticipant(studyId, role, selectedParticipant).then((result: any) => {
                setLoading(false);
                if (result && !result.Message) {
                    const participantList: any = [...study.participants];
                    participantList.push(result);
                    setStudy({ ...study, participants: participantList });
                } else {
                    notify.show('danger', '500', result);
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

    const selectParticipant = (row: any) => {
        setText(row.label);
        setParticipantNotSelected(false);
        const participant: any = row;
        setSelectedParticipant(participant);
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
                    <div style={{ width: '300px', marginTop: '-16px' }}>
                        <AsynchSelect
                            label="Add participants"
                            onChange={(option: any) => selectParticipant(option)}
                            placeholder=""
                            selectedOption={{ value: 'Search..', label: text }}
                            onInputChange={handleInputChange}
                            disabled={study.permissions && !study.permissions.addRemoveParticipant}
                            loadOptions={
                                study.permissions && study.permissions.addRemoveParticipant ? loadOptions : null
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
                            disabled={participantNotSelected || loading}
                        />
                    </Tooltip>
                </div>
                <Button
                    variant="outlined"
                    disabled={checkIfButtonDisabled()}
                    onClick={addParticipant}
                    style={{ width: '136px' }}
                >
                    {loading ? <DotProgress color="primary" /> : 'Add participant'}
                </Button>
            </SearchWrapper>
            <TableWrapper>
                <ParticipantTable
                    participants={study && study.participants}
                    removeParticipant={removeParticipant}
                    editMode
                    permissions={study.permissions}
                />
            </TableWrapper>
        </Wrapper>
    );
};

export default ParicipantComponent;
