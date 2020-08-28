import React from 'react';
import loadingGif from '../../assets/loading.gif';
import { CircularProgress } from '@equinor/eds-core-react'

const Loading = () => {
  return (
    <div
      style={{
        margin: '20px auto 100px',
        textAlign: 'center',
        marginBottom: '100px',
        backgroundColor: '',
        width: '300px',
        borderRadius: '4px'
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;
