import React from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div
            style={{
                margin: 'auto',
                width: '30%',
                textAlign: 'center',
                marginBottom: '100px'
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
