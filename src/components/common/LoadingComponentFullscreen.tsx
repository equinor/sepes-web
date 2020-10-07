import React, { useState, useEffect } from 'react';
import loadingGif from '../../assets/loading.gif';
import { CircularProgress } from '@equinor/eds-core-react';
import './styles.scss';

const LoadingFull = () => {
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(function(){ setShowLoading(true); }, 2000);
    return () => clearTimeout(timer);
  },[]);
  return (
    <div>
    {showLoading && <><div
    className="container"
      style={{
        textAlign: 'center',
        alignContent: 'center',
        marginTop: '64px',
        borderRadius: '4px',
        width: '',
        backgroundColor: '#ffffff',
        marginLeft: 'auto',
        marginRight: '0px',
        marginBottom: '0px',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      
    </div>
    <div id="spinner">
      <CircularProgress style={{ marginLeft: '48%', marginBottom: '25%' }} />
    </div></> }
    </div>
  );
};

export default LoadingFull;
