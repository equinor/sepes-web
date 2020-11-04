import React, { useState, useRef } from 'react';
import { Button, Typography, TextField } from '@equinor/eds-core-react';
import styled from 'styled-components';
import useClickOutside from '../../common/customComponents/useClickOutside';

const Wrapper = styled.div`
    display: grid;
    grid-gap:16px;
    max-width:400px;
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
    padding:16px;
    box-shadow: 0 0 4px 4px #E7E7E7;
    left: 0;
    right: 0;
    top: 30%;
    text-align: center;
    background-color: #ffffff;
    z-index:9999;
    opacity: 1;
`;

const WhiteWrapper = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #ffffff;

    opacity: 0.5;
`;

type DeleteResourceComponentProps = {
    ResourceName:string;
    setUserClickedDelete:any;
    type: string;
    onClick: any;
};

const DeleteResourceComponent: React.FC<DeleteResourceComponentProps> = ({ ResourceName, setUserClickedDelete, type, onClick }) => {
    const [text, setText] = useState<string>('');
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, setUserClickedDelete);

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
        <>
        <WhiteWrapper />
            <Wrapper ref={wrapperRef}>
                <Typography variant="h4">Sure you want to delete the {type} with name "{ResourceName}"?</Typography>
                <TextField
                    placeholder="Write the name of the sandbox to delete"
                    data-cy="results_and_learnings"
                    onChange={handleChange}
                    style={{ width: '100%' }}
                    value={text}
                    id="1"
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
        </>
    )
}

export default DeleteResourceComponent;
