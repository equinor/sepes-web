import React, { useState } from 'react';
import DatasetsTable from './Tables/DatasetsTable';
import ParticipantTable from './Tables/ParticipantTable';
import SandboxTable from './Tables/SandboxTable';
import { Button, TextField, Tooltip } from '@equinor/eds-core-react';
import { resultsAndLearningsObj, StudyObj } from '../common/interfaces';
import { editResultsAndLearnings } from '../../services/Api';
import { lineBreak } from '../common/helpers';
import { Label } from '../common/StyledComponents';
import styled from 'styled-components';
import * as notify from '../common/notify';
import useFetchUrl from '../common/hooks/useFetchUrl';
import { getResultsAndLearningsUrl, getStudyByIdUrl } from '../../services/ApiCallStrings';

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
    setHasChanged: any;
    setUpdateCache: any;
    updateCache: any;
};

const Overview: React.FC<OverviewProps> = ({ study, setHasChanged, setUpdateCache, updateCache }) => {
    const { datasets, participants, sandboxes, id } = study;
    const [editMode, setEditMode] = useState<boolean>(false);
    const [resultsAndLearnings, setResultsAndLearnings] = useState<resultsAndLearningsObj>({ resultsAndLearnings: '' });
    const res = useFetchUrl(
        getResultsAndLearningsUrl(study.id),
        setResultsAndLearnings,
        study.id !== '' && study.permissions.readResulsAndLearnings
    );

    const handleChange = (evt) => {
        setHasChanged(true);
        setResultsAndLearnings({ resultsAndLearnings: evt.target.value });
    };

    const handleSave = () => {
        setUpdateCache({ ...updateCache, [getStudyByIdUrl(study.id)]: true });
        res.cache[getResultsAndLearningsUrl(study.id)] = resultsAndLearnings;
        setEditMode(false);
        editResultsAndLearnings(resultsAndLearnings, study.id).then((result: any) => {
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
            setResultsAndLearnings(res.intialValue || { resultsAndLearnings: '' });
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
                                lineBreak(resultsAndLearnings.resultsAndLearnings || '-')
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
                            value={resultsAndLearnings.resultsAndLearnings}
                            autoComplete="off"
                            autoFocus
                        />
                    )}
                    <div style={{ display: 'flex' }}>
                        {editMode && (
                            <Button
                                onClick={handleSave}
                                style={{ margin: '32px 8px 16px 0px', marginTop: '32px' }}
                                data-cy="save_results_and_learnings"
                            >
                                Save
                            </Button>
                        )}
                        <div style={{ marginBottom: '16px', marginTop: '32px' }}>
                            <Tooltip
                                title={
                                    study.permissions && study.permissions.updateResulsAndLearnings
                                        ? ''
                                        : 'You do not have access to edit results and learnings'
                                }
                                placement="right"
                            >
                                <Button
                                    variant="outlined"
                                    data-cy="edit_results_and_learnings"
                                    disabled={study.permissions && !study.permissions.updateResulsAndLearnings}
                                    onClick={() => {
                                        setEditMode(!editMode);
                                        handleCancel();
                                    }}
                                >
                                    {!editMode ? 'Edit results and learnings' : 'Cancel'}
                                </Button>
                            </Tooltip>
                        </div>
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
