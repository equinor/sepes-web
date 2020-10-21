import React, { useState } from 'react';
import { Button, Typography, TextField } from '@equinor/eds-core-react';
import styled from 'styled-components';

const Wrapper = styled.div<{ position: string }>`
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
    top: ${(props: any) => (props.position === 'top' ? '10%' : '50%')};
    text-align: center;
    background-color: #ffffff;
    z-index:9999;
    opacity: 1;
`;

type DeleteResourceComponentProps = {
    ResourceName:string;
    setUserClickedDelete:any;
    type: string;
    onClick: any;
    position: 'top' | 'middle';
};

const DeleteResourceComponent: React.FC<DeleteResourceComponentProps> = ({ ResourceName, setUserClickedDelete, type, onClick, position }) => {
    const [text, setText] = useState<string>('');

    const checkSandboxNameToText = ():boolean => {
        if (text === ResourceName) {
            return true;
        }
        return false;
    }

    const handleChange = (evt) => {
        setText(evt.target.value);
      }

    return (
            <Wrapper position={position}>
                <Typography variant="h4">Sure you want to delete the {type} with name "{ResourceName}"?</Typography>
                <TextField
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
                        onClick={onClick}
                    >
                            Delete
                    </Button>
                    <Button onClick={() => setUserClickedDelete((false))} variant="outlined">Cancel</Button>
                </div>
            </Wrapper>
    )
}

export default DeleteResourceComponent;
