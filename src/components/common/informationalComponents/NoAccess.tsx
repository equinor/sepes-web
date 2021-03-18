import React from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NoAccess = () => {
    return (
        <div
            style={{
                top: '64px',
                left: '0',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                marginBottom: '100px',
                position: 'absolute',
                backgroundColor: '#FFFFFF',
                zIndex: 1000
            }}
        >
            <FontAwesomeIcon icon={faTimesCircle} size="5x" style={{ margin: '20px' }} />
            <div>
                <b>It seems like you don´t have access to this content.</b>
            </div>
        </div>
    );
};

export default NoAccess;
