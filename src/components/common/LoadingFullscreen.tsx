import React from 'react';
import { CircularProgress, Scrim } from '@equinor/eds-core-react';
import './styles.scss';
import getScreenLoadingFromStore from 'store/screenloading/screenLoadingSelector';
import { useSelector } from 'react-redux';

const LoadingFullScreen = () => {
    const showLoading = useSelector(getScreenLoadingFromStore());

    return (
        <div>
            <Scrim open={showLoading}>
                <CircularProgress style={{ marginLeft: '48%', marginBottom: '25%' }} />
            </Scrim>
        </div>
    );
};

LoadingFullScreen.defaultProps = {
    showLoading: false
};

export default LoadingFullScreen;
