import React from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@equinor/eds-core-react';

type GeneralErrorProps = {
    errorMessage: any;
};

const NoApi: React.FC<GeneralErrorProps> = ({ errorMessage }) => {
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
                <Typography style={{ textAlign: 'center' }} variant="h4">
                    Seems to be an error: {errorMessage} Cy token : {localStorage.getItem('cyToken')}
                </Typography>
            </div>
        </div>
    );
};

export default NoApi;
