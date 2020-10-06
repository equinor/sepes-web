import React, { useState, useEffect } from 'react';
import { Button, Icon, DotProgress } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import styled from 'styled-components';
import SearchWithDropdown from '../common/customComponents/SearchWithDropdown';
import * as api from '../../services/Api';
import ParticipantTable from '../common/customComponents/ParticipantTable';
import { ParticipantObj, DropdownObj } from '../common/interfaces';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import AsynchSelect from '../common/customComponents/AsyncSelect';
import * as notify from '../common/notify';
import { ValidateEmail } from '../common/helpers';
import { StudyObj } from '../common/interfaces';

const icons = {
    close
};
Icon.add(icons);

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 45px 1fr;
    width: 100%;
    grid-gap: 10px;
`;

const SearchWrapper = styled.div`
    z-index:99;
    display: grid;
    grid-template-columns: 2fr 0.5fr 0.5fr;
    grid-gap: 10px;
    margin-left: 50%;
    @media (max-width: 1024px) {
        margin-left: 0;
    }
`;

type ParicipantComponentProps = {
    study:StudyObj,
    setStudy:any
  };

const ParicipantComponent: React.FC<ParicipantComponentProps> = ({study, setStudy}) => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [roles, setRoles] = useState<DropdownObj>();
    const [participantNotSelected, setParticipantNotSelected] = useState<boolean>(true);
    const [roleNotSelected, setRoleNotSelected] = useState<boolean>(true);
    const [selectedParticipant, setSelectedParticipant] = useState<ParticipantObj | undefined>();
    const [text, setText] = useState<string>('Search or add by e-mail');
    const [role, setRole] = useState<string>('');

    const removeParticipant = (participant:any) => {
        const studyId = window.location.pathname.split('/')[2];
        api.removeStudyParticipant(studyId, participant.userId, participant.role).then((result: any) => {
            if (isSubscribed && !result.Message) {
                setStudy({...study, participants: result.participants});
                console.log("participants: ", result);
            }
            else {
                notify.show('danger', '500', result.Message, result.requestId);
                //Show error component
            }
            setLoading(false);
        })
    }

    const addParticipant = () => {
        setLoading(true);
        const studyId = window.location.pathname.split('/')[2];
        if (!participantNotSelected) {
            api.addStudyParticipant(studyId, role, selectedParticipant).then((result: any) => {
                if (isSubscribed && !result.Message) {
                    setStudy({...study, participants: result.participants});
                    console.log("participants: ", result);
                }
                else {
                    notify.show('danger', '500', result.Message, result.requestId);
                    console.log("Err getting participants");
                    //Show error component
                }
                setLoading(false);
            })
        }
        else {
            // TODO Implement backend to handle email
            console.log("Send email to backend", text);
        }
    }

    const selectParticipant = (row:any) => {
        setText(row.label);
        setParticipantNotSelected(false);
        let participant:any = row;
        setSelectedParticipant(participant);
        setIsOpen(false);
    }
    /*
    const checkIfParticipantIsAlreadyAdded = (id:string) => {
        let elementExist = false;
        props.study.participants && props.study.participants.forEach((element) => {
            if (element.userId === id) {
                elementExist = true;
            }
        });
        return elementExist;
    }
    */

    const handleChange = (value) => {
        setRole(value);
        setRoleNotSelected(false);
      };

    useEffect(() => {
        setIsSubscribed(true);
        //getParticipants();
        getRoles();
        return () => setIsSubscribed(false);
    }, [text]);

    /* Used in old dropdown
    const getParticipants = () => {
        setLoading(true);
        api.getParticipantList("a").then((result: any) => {
            if (isSubscribed) {
                setParticipants(result);
                console.log("participants: ", result);
            }
            else {
                notify.show('danger', '500');
            }
            setLoading(false);
        })
    }
    */

    const getRoles = () => {
        setLoading(true);
        api.getStudyRoles().then((result: any) => {
            if (isSubscribed && !result.Message) {
                setRoles(result);
                console.log("participants: ", result, result.Message, result.RequestId);
            }
            else {
                notify.show('danger', '500');
            }
            setLoading(false);
        })
    }

    const handleInputChange = (value: string) => {
        if (value !== "") {
            setText(value);
        } 
        else if (value === "" && text.length === 1) {
            setText('');
            setParticipantNotSelected(true);
        }
    }

    const checkIfButtonDisabled = () => {
        if (ValidateEmail(text)) {
            return roleNotSelected;
        }
        return participantNotSelected || roleNotSelected;
    }

    return (
        <Wrapper>
            <SearchWrapper>
                <div
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <AsynchSelect
                        label={''}
                        onChange={(option: any) => selectParticipant(option)}
                        placeholder={''}
                        selectedOption={{ value: 'Search..', label: text }}
                        onInputChange={handleInputChange}
                    />
                </div>
                <div style={{ marginTop: '-16px' }}>
                    <CoreDevDropdown
                        label="Role"
                        options={roles}
                        onChange={handleChange}
                        name="region"
                    />
                </div>
                <Button variant="outlined" disabled={checkIfButtonDisabled()} onClick={addParticipant}>{loading ? <DotProgress variant="green" /> : 'Add participant'}</Button>
            </SearchWrapper>
            <div>
                <ParticipantTable
                    participants={study.participants && study.participants}
                    removeParticipant={removeParticipant}
                    editMode
                />
            </div>
        </Wrapper>
    )
}

export default ParicipantComponent;
