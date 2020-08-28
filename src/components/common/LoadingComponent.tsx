import React from 'react';
import loadingGif from '../../assets/loading.gif';
import { CircularProgress } from '@equinor/eds-core-react'

const Loading = () => {
  return (
    <div
      style={{
        margin: '0px auto 100px',
        textAlign: 'center',
        marginTop: '100px',
        backgroundColor: '',
        width: '300px',
        borderRadius: '4px',
        display: 'absolute'
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;
