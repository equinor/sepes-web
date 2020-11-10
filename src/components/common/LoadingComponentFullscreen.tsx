import React, { useState, useEffect } from 'react';
import loadingGif from '../../assets/loading.gif';
import { CircularProgress, Scrim } from '@equinor/eds-core-react';
import './styles.scss';

const LoadingFull = () => {
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(function(){ setShowLoading(true); }, 2000);
    return () => clearTimeout(timer);
  },[]);
  return (
    <div>
    {showLoading &&
    <Scrim>
      <CircularProgress style={{ marginLeft: '48%', marginBottom: '25%' }} />
    </Scrim>
    }
    </div>
  );
};

export default LoadingFull;
