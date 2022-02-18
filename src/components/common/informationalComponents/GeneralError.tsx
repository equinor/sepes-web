import React from 'react';
import { Typography, Icon } from '@equinor/eds-core-react';
import { warning_outlined } from '@equinor/eds-icons';

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
            <Icon data={warning_outlined} size={48} style={{ margin: '20px' }} />
            <div>
                <Typography style={{ textAlign: 'center' }} variant="h4">
                    Seems to be an error..
                </Typography>
            </div>
        </div>
    );
};

export default NoApi;
