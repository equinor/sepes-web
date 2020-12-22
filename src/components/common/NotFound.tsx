import React from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { posix } from 'path';

const NotFound = () => {
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
                <b>This resource does not exist or have been removed..</b>
            </div>
            <Link to="/">Go back</Link>
        </div>
    );
};

export default NotFound;
