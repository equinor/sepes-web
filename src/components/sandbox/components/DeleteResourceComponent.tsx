import React, { useState, useRef } from 'react';
import { Button, Typography, TextField, Scrim } from '@equinor/eds-core-react';
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
    left: 0;
    right: 0;
    top: 30%;
    text-align: center;
    background-color: #ffffff;
    z-index:9999;
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
        <Scrim>
            <Wrapper ref={wrapperRef}>
                <Typography variant="h4">Sure you want to delete the {type} with name "{ResourceName}"?</Typography>
                <TextField
                    placeholder="Write the name of the sandbox to delete"
                    onChange={handleChange}
                    style={{ width: '100%' }}
                    value={text}
                    data-cy="delete_resource"
                />
                <div>
                    <Button
                        color="danger"
                        style={{ marginRight: '8px' }}
                        disabled={!checkSandboxNameToText()}
                        onClick={onClick}
                        data-cy="delete_resource_delete"
                    >
                            Delete
                    </Button>
                    <Button onClick={() => setUserClickedDelete((false))} variant="outlined">Cancel</Button>
                </div>
            </Wrapper>
        </Scrim>
    )
}

export default DeleteResourceComponent;
