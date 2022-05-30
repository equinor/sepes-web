import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Prompt as ReactPrompt } from 'react-router-dom';
import { Button, Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { getUnsavedChangesValue } from 'store/usersettings/userSettingsSelectors';
import { useSelector } from 'react-redux';

const TempButtonWrapper = styled.div`
    display: grid;
    column-gap: 16px;
    grid-template-columns: repeat(3, fit-content(100%));
    justify-content: end;
    justify-self: end;
`;

type PromptProps = {
    fallBackAddress?: string;
    customText?: string;
};

const Prompt: React.FC<PromptProps> = ({ fallBackAddress, customText }) => {
    const history = useHistory();
    const [isPromptVisible, setIsPromptVisible] = useState<boolean>(false);
    const [confirmedNavigation, setConfirmedNavigation] = useState<boolean>(false);

    const hasUnsavedChanges = useSelector(getUnsavedChangesValue());

    useEffect(() => {
        if (confirmedNavigation) {
            history.push(fallBackAddress || '/');
        }
    }, [confirmedNavigation]);

    const currentPath = useRef<any>(window.location.pathname);
    useEffect(() => {
        if (currentPath) {
            currentPath.current = window.location.pathname;
        }
    }, []);

    const handleBlockedNavigation = (nextLocation, action) => {
        if (!confirmedNavigation) {
            if (history.location.key === nextLocation.key) {
                return false;
            }
            if (hasUnsavedChanges) {
                //A boolean state to check if the page has any unsaved changes
                setIsPromptVisible(true);
                //A workaround for Prompt replacing the URL after page reload, even if navigation is cancelled
                if (currentPath?.current !== nextLocation.pathname && action === 'POP') {
                    window.history.forward();
                }
                return false;
            }
        }
        return true;
    };

    return (
        <div>
            <ReactPrompt when={hasUnsavedChanges} message={handleBlockedNavigation} />
            <Dialog
                style={{ width: '400px', height: '220px' }}
                open={isPromptVisible}
                onClose={() => setIsPromptVisible(!isPromptVisible)}
            >
                <Dialog.Header>Unsaved changes</Dialog.Header>
                <Dialog.Content>
                    Are you sure you want to leave this page? <br />
                    {customText || 'All unsaved changes will be lost.'}
                </Dialog.Content>
                <span style={{ marginLeft: 'auto' }}>
                    <Dialog.Actions>
                        <TempButtonWrapper>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setIsPromptVisible(false);
                                }}
                            >
                                Stay on page
                            </Button>
                            <Button
                                color="danger"
                                onClick={() => {
                                    setIsPromptVisible(false);
                                    setConfirmedNavigation(true);
                                }}
                            >
                                Leave
                            </Button>
                        </TempButtonWrapper>
                    </Dialog.Actions>
                </span>
            </Dialog>
        </div>
    );
};

Prompt.defaultProps = {
    fallBackAddress: '/',
    customText: undefined
};

export default Prompt;
