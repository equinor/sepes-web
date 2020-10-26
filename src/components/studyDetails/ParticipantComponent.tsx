import React, { useState, useEffect } from 'react';
import { Button, Icon, DotProgress } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import styled from 'styled-components';
import * as api from '../../services/Api';
import ParticipantTable from '../common/customComponents/ParticipantTable';
import { ParticipantObj, DropdownObj, StudyObj } from '../common/interfaces';
import CoreDevDropdown from '../common/customComponents/Dropdown';
import AsynchSelect from '../common/customComponents/AsyncSelect';
import * as notify from '../common/notify';
import { ValidateEmail } from '../common/helpers';

const icons = {
    close
};
Icon.add(icons);

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 0.1fr minmax(330px, 1fr);
    width: 100%;
    grid-gap: 10px;
`;

const SearchWrapper = styled.div`
    z-index:99;
    margin-left: auto;
    margin-top:32px;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
`;

const TableWrapper = styled.div`
    margin-top: 8px;
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
                    style={{width: '300px'}}
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
                <Button
                    variant="outlined"
                    disabled={checkIfButtonDisabled()}
                    onClick={addParticipant}
                    style={{width: '220px'}}
                >
                        {loading ? <DotProgress variant="green" /> : 'Add participant'}
                </Button>
            </SearchWrapper>
            <TableWrapper>
                <ParticipantTable
                    participants={study.participants && study.participants}
                    removeParticipant={removeParticipant}
                    editMode
                />
            </TableWrapper>
        </Wrapper>
    )
}

export default ParicipantComponent;
