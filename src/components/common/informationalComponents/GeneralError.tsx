import React from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NoApi = () => {
    return (
        <div
            style={{
                paddingTop: '64px',
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
            <FontAwesomeIcon icon={faExclamationTriangle} size="5x" style={{ margin: '20px' }} />
            <div>
                <b>Seems to be an error..</b>
            </div>
        </div>
    );
};

export default NoApi;
