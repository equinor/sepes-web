import React, { useState } from 'react';
import { Button, Typography, TextField } from '@equinor/eds-core-react';
import * as notify from '../../common/notify';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { deleteSandbox } from '../../../services/Api';

const Wrapper = styled.div`
    display: grid;
    grid-gap:16px;
    max-width:400px;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
    padding:16px;
    box-shadow: 0 0 4px 4px #E7E7E7;
    left: 0;
    right: 0;
    text-align: center;
    background-color: #ffffff;
    z-index:9999;
`;
type DeleteSandboxProps = {
    SandboxName:string;
    setUserClickedDelete:any;
    studyId: string;
    sandboxId: string;
};

const DeleteSandboxComponent: React.FC<DeleteSandboxProps> = ({ SandboxName, setUserClickedDelete, studyId, sandboxId }) => {
    const history = useHistory();
    const [text, setText] = useState<string>('');

    const deleteThisSandbox = ():void => {
        deleteSandbox(studyId, sandboxId).then((result: any) => {
            if (result && !result.Message) {
                history.push('/studies/' + studyId);
                console.log("result: ", result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
             }
        });
    }

    const checkSandboxNameToText = ():boolean => {
        if (text === SandboxName) {
            return true;
        }
        return false;
    }

    const handleChange = (evt) => {
        setText(evt.target.value);
      }

    return (
        <Wrapper>
            <Typography variant="h4">Sure you want to delete the sandbox with name "{SandboxName}"?</Typography>
            <TextField
                name='text'
                placeholder="Write the name of the sandbox to delete"
                data-cy="results_and_learnings"
                onChange={handleChange}
                style={{ width: '100%' }}
                value={text}
            />
            <div>
                <Button
                    color="danger"
                    style={{ marginRight: '8px' }}
                    disabled={!checkSandboxNameToText()}
                    onClick={() => deleteThisSandbox()}
                >
                        Delete
                </Button>
                <Button onClick={() => setUserClickedDelete((false))} variant="outlined">Cancel</Button>
            </div>
        </Wrapper>
    )
}

export default DeleteSandboxComponent;
