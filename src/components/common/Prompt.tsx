import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Prompt as ReactPrompt } from 'react-router-dom';
import { Dialog, Button, Scrim } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { getUnsavedChangesValue } from 'store/usersettings/userSettingsSelectors';
import { useSelector } from 'react-redux';

const { Actions, Title, CustomContent } = Dialog;

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
    const [visibleScrim, setVisibleScrim] = useState<boolean>(false);
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
                setVisibleScrim(true);
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

            <Scrim open={visibleScrim} onClose={() => setVisibleScrim(!visibleScrim)}>
                <Dialog style={{ width: '400px', height: '220px' }}>
                    <Title>Unsaved changes</Title>
                    <CustomContent scrollable={false}>
                        Are you sure you want to leave this page? <br />
                        {customText || 'All unsaved changes will be lost.'}
                    </CustomContent>
                    <span style={{ marginLeft: 'auto' }}>
                        <Actions>
                            <TempButtonWrapper>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setVisibleScrim(false);
                                    }}
                                >
                                    Stay on page
                                </Button>
                                <Button
                                    color="danger"
                                    onClick={() => {
                                        setVisibleScrim(false);
                                        setConfirmedNavigation(true);
                                    }}
                                >
                                    Leave
                                </Button>
                            </TempButtonWrapper>
                        </Actions>
                    </span>
                </Dialog>
            </Scrim>
        </div>
    );
};

Prompt.defaultProps = {
    fallBackAddress: '/',
    customText: undefined
};

export default Prompt;
