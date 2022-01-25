import React from 'react';
import { Typography, Icon } from '@equinor/eds-core-react';
import { close_circle_outlined } from '@equinor/eds-icons';

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
            <Icon data={close_circle_outlined} size={48} style={{ margin: '20px' }} />
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

export default NoAccess;
