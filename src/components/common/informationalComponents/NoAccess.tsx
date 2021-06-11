import React from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@equinor/eds-core-react';

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
                <Typography style={{ textAlign: 'center' }} variant="h4">
                    You do not have the required study role to view this page.
                    <td /> Contact relevant study owner/sponsor rep to give you a role that allows you do to this
                    action.
                </Typography>
            </div>
        </div>
    );
};
//It seems like you don´t have access to this content.
export default NoAccess;
