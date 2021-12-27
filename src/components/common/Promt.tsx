import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Prompt as ReactPrompt } from 'react-router-dom';
import { Dialog, Button, Scrim } from '@equinor/eds-core-react';
import styled from 'styled-components';

const { Actions, Title, CustomContent } = Dialog;

const TempButtonWrapper = styled.div`
    display: grid;
    column-gap: 16px;
    grid-template-columns: repeat(3, fit-content(100%));
    justify-content: end;
    justify-self: end;
`;

type PromptProps = {
    hasChanged: boolean;
    fallBackAddress?: string;
    customText?: string;
};

const Prompt: React.FC<PromptProps> = ({ hasChanged, fallBackAddress, customText }) => {
    const history = useHistory();
    const [visibleScrim, setVisibleScrim] = useState<boolean>(false);
    const [confirmedNavigation, setConfirmedNavigation] = useState<boolean>(false);

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
            if (hasChanged) {
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
            <ReactPrompt when={hasChanged} message={handleBlockedNavigation} />
            {visibleScrim && (
                <Scrim onClose={() => setVisibleScrim(!visibleScrim)}>
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
                                    {/*<Button>Save as draft</Button>*/}
                                </TempButtonWrapper>
                            </Actions>
                        </span>
                    </Dialog>
                </Scrim>
            )}
        </div>
    );
};

Prompt.defaultProps = {
    fallBackAddress: '/',
    customText: undefined
};

export default Prompt;
