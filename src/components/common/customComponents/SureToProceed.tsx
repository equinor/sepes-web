import React, { useRef } from 'react';
import { Button, Typography, Scrim } from '@equinor/eds-core-react';
import styled from 'styled-components';
import useClickOutside from './useClickOutside';

const Wrapper = styled.div`
    display: grid;
    grid-gap: 16px;
    max-width: 400px;
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

type SureToProceedComponentProps = {
    setUserClickedButton: any;
    type: string;
    onClick: any;
};

const SureToProceed: React.FC<SureToProceedComponentProps> = ({ setUserClickedButton, type, onClick }) => {
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, setUserClickedButton);

    return (
        <Scrim>
            <Wrapper ref={wrapperRef}>
                <Typography variant="h4">Are you sure you want to proceed with {type}?</Typography>
                <div>
                    <Button onClick={() => setUserClickedButton(false)} variant="outlined">
                        Cancel
                    </Button>
                    <Button style={{ marginLeft: '8px' }} onClick={onClick} data-cy="Sure_to_procceed_yes">
                        Yes
                    </Button>
                </div>
            </Wrapper>
        </Scrim>
    );
};

export default SureToProceed;
