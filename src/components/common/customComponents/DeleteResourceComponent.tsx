import React, { useState, useRef } from 'react';
import { Button, Typography, TextField, Scrim, Tooltip, Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';
import useClickOutside from './useClickOutside';
import { truncate } from '../helpers/helpers';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useKeyEvents from '../hooks/useKeyEvents';

const Wrapper = styled.div`
    display: grid;
    grid-gap: 16px;
    max-width: 448px;
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
    padding: 16px;
    left: 0;
    right: 0;
    top: 30%;
    text-align: center;
    background-color: #ffffff;
    z-index: 9999;
`;

type DeleteResourceComponentProps = {
    ResourceName: string;
    setUserClickedDelete: any;
    type: string;
    onClick: any;
};

const DeleteResourceComponent: React.FC<DeleteResourceComponentProps> = ({
    ResourceName,
    setUserClickedDelete,
    type,
    onClick
}) => {
    const [text, setText] = useState<string>('');
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, setUserClickedDelete);
    const [copied, setCopied] = useState<boolean>(false);

    const checkSandboxNameToText = (): boolean => {
        if (text === ResourceName) {
            return true;
        }
        return false;
    };

    const handleChange = (evt) => {
        setText(evt.target.value);
    };
    console.log(checkSandboxNameToText());
    useKeyEvents(undefined, onClick, checkSandboxNameToText());

    return (
        <Scrim>
            <Wrapper ref={wrapperRef}>
                <Typography variant="h4">
                    Sure you want to delete the {type} with name "{truncate(ResourceName, 30)}"?
                    <Tooltip title="Copy to clipboard" placement="top">
                        <div style={{ display: 'inline-block' }}>
                            <CopyToClipboard text={ResourceName} onCopy={() => setCopied(true)}>
                                <Icon
                                    name={copied ? 'check' : 'copy'}
                                    style={{ marginLeft: '8px', marginBottom: '-4px' }}
                                    size={24}
                                    color="#007079"
                                    className="icon"
                                />
                            </CopyToClipboard>
                        </div>
                    </Tooltip>
                </Typography>
                <TextField
                    id="textfield11"
                    placeholder={'Write the name of the ' + type + ' to delete'}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                    value={text}
                    data-cy="delete_resource"
                    autoComplete="off"
                    autoFocus
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
                    <Button onClick={() => setUserClickedDelete(false)} variant="outlined">
                        Cancel
                    </Button>
                </div>
            </Wrapper>
        </Scrim>
    );
};

export default DeleteResourceComponent;
