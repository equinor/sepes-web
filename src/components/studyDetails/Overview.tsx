import React, { useState } from 'react';
import DatasetsTable from '../common/customComponents/DatasetsTable';
import ParticipantTable from '../common/customComponents/ParticipantTable';
import SandboxTable from '../common/customComponents/SandboxTable';
import { Button, TextField, Typography } from '@equinor/eds-core-react';
import { StudyObj } from '../common/interfaces';
import { editStudy } from '../../services/Api';
import { lineBreak } from '../common/helpers';
import styled from 'styled-components';
import * as notify from '../common/notify';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    @media (max-width: 768px) {
        display: block;
    }
`;

const Overview = (props: any) => {
    const { datasets, participants, sandboxes, id, resultsAndLearnings } = props.study;
    const [editMode, setEditMode] = useState<boolean>(false);
    const [studyOnChange, setStudyOnChange] = useState<StudyObj>(props.study);
    const handleChange = (evt) => {
        setStudyOnChange({ ...props.study, resultsAndLearnings: evt.target.value });
      }

    const handleSave = () => {
        setEditMode(false);
        editStudy(studyOnChange, studyOnChange.id).then((result: any) => {
            if (result) {
                console.log("result: ", result);
                props.setStudy(result);
            }
            else {
                notify.show('danger', '500');
                console.log("Err");
            }
        });
    };

    const handleCancel = () => {
        if (editMode) {
            setStudyOnChange(props.study);
        }
    }

    return (
        <Wrapper>
            <div>
                <Typography variant="h6">Results and learnings</Typography>
                {!editMode ?
                <div>{lineBreak(resultsAndLearnings)}</div>:
                <TextField
                    name='resultsandlearnings'
                    placeholder="Write results and learnings from this study"
                    multiline={true}
                    onChange={handleChange}
                    style={{ margin: 'auto', marginLeft: '0', height: '300px' }}
                    value={studyOnChange.resultsAndLearnings}
                />}
                <div style={{ display: 'flex' }}>
                    {editMode ?
                    <Button
                        onClick={handleSave}
                    >
                        Save
                    </Button>: null}
                    <Button
                        variant="outlined"
                        style={{ marginBottom: '16px' }}
                        onClick={() => { setEditMode(!editMode); handleCancel(); }}
                    >
                        {!editMode ? 'Edit results and learnings': 'Cancel'}
                    </Button>
                </div>
            </div>
            <div>
                <DatasetsTable
                    datasets={datasets}
                    editMode={false}
                    studyId={id}
                />
                <ParticipantTable
                    participants={participants}
                    editMode={false}
                />
                <SandboxTable
                    sandboxes={sandboxes}
                />
            </div>
        </Wrapper>
    )
}

export default Overview;
