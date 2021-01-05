import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Prompt as ReactPrompt } from 'react-router';
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
};

const Prompt: React.FC<PromptProps> = ({ hasChanged, fallBackAddress }) => {
    const history = useHistory();
    const [visibleScrim, setVisibleScrim] = useState<boolean>(false);
    const [confirmedNavigation, setConfirmedNavigation] = useState<boolean>(false);

    useEffect(() => {
        if (confirmedNavigation) {
            history.push(fallBackAddress || '/');
        }
    }, [confirmedNavigation]);

    return (
        <div>
            <ReactPrompt
                when={hasChanged}
                message={(location) => {
                    if (!confirmedNavigation) {
                        setVisibleScrim(true);
                        return false;
                    }
                    return true;
                }}
            />
            {visibleScrim && (
                <Scrim onClose={() => setVisibleScrim(!visibleScrim)}>
                    <Dialog style={{ width: '400px', height: '220px' }}>
                        <Title>Unsaved changes</Title>
                        <CustomContent scrollable={false}>
                            Are you sure you want to leave this page? <br />
                            All unsaved changes will be lost.
                        </CustomContent>
                        <span style={{ marginLeft: 'auto' }}>
                            <Actions>
                                <TempButtonWrapper>
                                    <Button variant="outlined" onClick={() => setVisibleScrim(false)}>
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

export default Prompt;
