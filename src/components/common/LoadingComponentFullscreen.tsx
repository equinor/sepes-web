import React from 'react';
import loadingGif from '../../assets/loading.gif';
import { CircularProgress } from '@equinor/eds-core-react';
import './styles.scss';

const LoadingFull = () => {
  return (
    <div
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
      <CircularProgress style={{ marginLeft: '48%', marginBottom: '25%' }} />
    </div>
  );
};

export default LoadingFull;
