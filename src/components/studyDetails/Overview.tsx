import React, { useState, useEffect } from 'react';
import DatasetsTable from './Tables/DatasetsTable';
import ParticipantTable from './Tables/ParticipantTable';
import SandboxTable from './Tables/SandboxTable';
import { Button, TextField } from '@equinor/eds-core-react';
import { StudyObj } from '../common/interfaces';
import { editStudy } from '../../services/Api';
import { lineBreak } from '../common/helpers';
import { Label } from '../common/StyledComponents';
import styled from 'styled-components';
import * as notify from '../common/notify';

const Wrapper = styled.div`
    margin-top: 8px;
    display: grid;
    grid-template-columns: 1fr 0.7fr;
    grid-template-rows: minmax(384px, 1fr);
    grid-gap: 96px;
    @media (max-width: 768px) {
        display: block;
    }
`;

/*
const TableWrapper = styled.div<{ canReadResandLearns: boolean }>`
    display: ${(props: any) => (props.canReadResandLearns ? '' : 'grid')};
    grid-template-columns: ${(props: any) => (props.canReadResandLearns ? '' : '1fr 1fr 1fr')};
    grid-gap: ${(props: any) => (props.canReadResandLearns ? '' : '16px')};

    @media (max-width: 768px) {
        display: block;
    }
`;
*/

type OverviewProps = {
    study: StudyObj;
    setStudy: any;
    setHasChanged: any;
};

const Overview: React.FC<OverviewProps> = ({ study, setStudy, setHasChanged }) => {
    const { datasets, participants, sandboxes, id, resultsAndLearnings } = study;
    const [editMode, setEditMode] = useState<boolean>(false);
    const [studyOnChange, setStudyOnChange] = useState<StudyObj>(study);

    useEffect(() => {
        setStudyOnChange(study);
    }, [study.resultsAndLearnings]);
    const handleChange = (evt) => {
        setHasChanged(true);
        setStudyOnChange({ ...study, resultsAndLearnings: evt.target.value });
    };

    const handleSave = () => {
        setStudy({ ...study, resultsAndLearnings: studyOnChange.resultsAndLearnings });
        setEditMode(false);
        editStudy(studyOnChange, studyOnChange.id).then((result: any) => {
            if (result && !result.Message) {
                setHasChanged(false);
            } else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log('Err');
            }
        });
    };

    const handleCancel = () => {
        if (editMode) {
            setHasChanged(false);
            setStudyOnChange(study);
        }
    };

    return (
        <Wrapper>
            {study.permissions && study.permissions.readResulsAndLearnings ? (
                <div>
                    <Label>Results and learnings</Label>
                    {!editMode ? (
                        <div style={{ marginTop: '8px' }}>
                            {study.permissions.readResulsAndLearnings ? (
                                lineBreak(resultsAndLearnings || '-')
                            ) : (
                                <em>You do not have permission to view results and learnings</em>
                            )}
                        </div>
                    ) : (
                        <TextField
                            id="textfield1"
                            name="resultsandlearnings"
                            placeholder="Write results and learnings from this study"
                            data-cy="results_and_learnings"
                            multiline
                            onChange={handleChange}
                            style={{ margin: 'auto', marginLeft: '0', height: '300px' }}
                            value={studyOnChange.resultsAndLearnings}
                            autoComplete="off"
                        />
                    )}
                    <div style={{ display: 'flex' }}>
                        {editMode ? (
                            <Button
                                onClick={handleSave}
                                style={{ margin: '32px 8px 16px 0px', marginTop: '32px' }}
                                data-cy="save_results_and_learnings"
                            >
                                Save
                            </Button>
                        ) : null}
                        <Button
                            variant="outlined"
                            style={{ marginBottom: '16px', marginTop: '32px' }}
                            data-cy="edit_results_and_learnings"
                            disabled={study.permissions && !study.permissions.updateResulsAndLearnings}
                            onClick={() => {
                                setEditMode(!editMode);
                                handleCancel();
                            }}
                        >
                            {!editMode ? 'Edit results and learnings' : 'Cancel'}
                        </Button>
                    </div>
                </div>
            ) : (
                <div />
            )}
            <div>
                <SandboxTable sandboxes={sandboxes} />
                <DatasetsTable datasets={datasets} editMode={false} studyId={id} />
                <ParticipantTable participants={participants} editMode={false} />
            </div>
        </Wrapper>
    );
};

export default Overview;
