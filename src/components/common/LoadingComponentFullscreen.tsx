import React, { useState, useEffect } from 'react';
import { CircularProgress, Scrim } from '@equinor/eds-core-react';
import './styles.scss';

type StudyComponentFullProps = {
    noTimeout?: boolean;
};

const LoadingFull: React.FC<StudyComponentFullProps> = ({ noTimeout = false }) => {
    const [showLoading, setShowLoading] = useState<boolean>(noTimeout);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            {showLoading && (
                <Scrim>
                    <CircularProgress style={{ marginLeft: '48%', marginBottom: '25%' }} />
                </Scrim>
            )}
        </div>
    );
};

export default LoadingFull;
