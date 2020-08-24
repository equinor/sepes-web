import React from 'react';
import { store } from 'react-notifications-component';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const width = 500;

const Card = styled.div`
    height: -moz-fit-content;
    width: 100%;
    min-width: 112px;
    position: relative;
    background-color: ${props => getCardVariant(props.variant)};
    box-sizing: border-box;
    gap: 16px;
    -moz-box-align: center;
    align-items: center;
    align-content: start;
    border-radius: 4px;
    min-height: 36px;
    padding: 16px;
    pointer-events: none;
`;

const getCardVariant = variant => {
    switch (variant) {
        case 'warning':
            return 'rgb(255, 231, 214)';
        case 'info':
            return 'rgb(213, 234, 244)';
        case 'danger':
            return 'rgb(255, 193, 193)';
        default:
            return 'rgb(255, 255, 255)';
    }
}

const getIcon = type => {
    switch (type) {
        case 'danger':
            return <FontAwesomeIcon icon={faExclamationTriangle} size="1x" style={{ color: '#FF1243', fontSize: '20px', marginRight: '6px' }} />
        default:
            return <FontAwesomeIcon icon={faInfoCircle} size="1x" style={{ color: '#1E92F4', marginRight: '6px' }} />
    }
}

const CustomContent = (props) => {
    const { type, message } = props;
    const icon = getIcon(type)

    return (
        <Card variant={type}>
            <FontAwesomeIcon icon={faTimes} size="1x" style={{ float: 'right', pointerEvents: 'auto' }} />
            <p>{icon} Code: {message}</p>
            <span>
                <p style={{ display: 'inline', fontSize: '14px' }}>
                    $(errorMessage_here) <br/><br/>
                    Please contact support. Providing the following Event Id could make it easier to locate the problem: $eventId
                </p>
            </span>
        </Card>
    );
};

export const show = (type, message) => {
    store.addNotification({
        title: 'Error',
        content: <CustomContent type={type} message={message} />,
        type: 'danger',
        insert: 'top',
        container: 'top-center',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
            duration: 10000,
            onScreen: true,
            showIcon: true,
            touch: false,
            click: true
        },
        width: width
    });
};
