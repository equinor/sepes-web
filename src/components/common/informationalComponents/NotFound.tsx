import React from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Typography } from '@equinor/eds-core-react';

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
                <Typography style={{ textAlign: 'center', marginBottom: '4px' }} variant="h4">
                    This resource does not exist or have been removed..
                </Typography>
            </div>
            <Link to="/">Go back</Link>
        </div>
    );
};

export default NotFound;
