import React, { useState, useEffect } from 'react';
import { Search, Button, Table, Icon, Typography, Chip } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchWithDropdown from '../common/customComponents/SearchWithDropdown';
import * as api from '../../services/Api';
import ParticipantTable from '../common/customComponents/ParticipantTable';
import { ParticipantObj } from '../common/interfaces';

const { Body, Row, Cell, Head } = Table;
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
    @media (max-width: 768px) {
        margin-left: 0;
    }
`;

const ParicipantComponent = (props: any) => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [participants, setParticipants] =  useState<any>();
    const [participantNotSelected, setParticipantNotSelected] =  useState<boolean>(true);
    const [roleNotSelected, setRoleNotSelected] =  useState<boolean>(true);
    const [selectedParticipant, setSelectedParticipant] = useState<any>();
    const [text, setText] = useState<string>('');
    const [role, setRole] = useState<string>('');

    const removeParticipant = (participant:any) => {
        const studyId = window.location.pathname.split('/')[2];
        api.removeStudyParticipant(studyId, participant.id).then((result: any) => {
            if (isSubscribed) {
                props.setStudy({...props.study, participants: result.participants});
                console.log("participants: ", result);
            }
            else {
                console.log("Err deleting participants");
                //Show error component
            }
            setLoading(false);
        })
    }

    const addParticipant = () => {
        setText('');
        setParticipantNotSelected(true);
        const studyId = window.location.pathname.split('/')[2];
        api.addStudyParticipant(studyId, selectedParticipant, role).then((result: any) => {
            if (isSubscribed && result) {
                props.setStudy({...props.study, participants: result.participants});
                console.log("participants: ", result);
            }
            else {
                console.log("Err getting participants");
                //Show error component
            }
            setLoading(false);
        })
    }

    const selectParticipant = (row:ParticipantObj) => {
        setText(row.name + ' - ' + row.emailAddress);
        setParticipantNotSelected(false);
        setSelectedParticipant(row.id);
        setIsOpen(false);
    }

    const checkIfParticipantIsAlreadyAdded = (id:string) => {
        let elementExist = false;
        props.study.participants.forEach((element) => {
            if (element.id === id) {
                elementExist = true;
            }
        });
        return elementExist;
    }

    const handleChange = (event) => {
        setRole(event.target.value);
        setRoleNotSelected(false);
      };

    useEffect(() => {
        setIsSubscribed(true);
        getParticipants();
        return () => setIsSubscribed(false);
    }, []);

    const getParticipants = () => {
        setLoading(true);
        api.getParticipantList().then((result: any) => {
            if (isSubscribed) {
                setParticipants(result);
                console.log("participants: ", result);
            }
            else {
                console.log("Err getting perticipants");
            }
            setLoading(false);
        })
    }

    return (
        <Wrapper>
            <SearchWrapper>
                <div
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <SearchWithDropdown 
                        handleOnClick={selectParticipant}
                        isOpen={isOpen}
                        filter={checkIfParticipantIsAlreadyAdded}
                        arrayList={participants}
                        text={text}
                    />
                    {text && !isOpen ? <Chip>{text}</Chip> : null }
                </div>
                <FormControl style={{marginTop: "-12px"}}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleChange}
                        value={role}
                        >
                        <MenuItem value="admin">
                            <em>Admin</em>
                        </MenuItem>
                        <MenuItem value="sponsor">Sponsor</MenuItem>
                        <MenuItem value="sponsorRep">Sponsor rep</MenuItem>
                        <MenuItem value="viewer">Viewer</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" disabled={participantNotSelected || roleNotSelected} onClick={addParticipant} >Add participant</Button>
            </SearchWrapper>
            <div>
                <ParticipantTable 
                    participants={props.study.participants && props.study.participants}
                    removeParticipant={removeParticipant}
                    editMode={true}
                    />
            </div>
        </Wrapper>
    )
}

export default ParicipantComponent; 