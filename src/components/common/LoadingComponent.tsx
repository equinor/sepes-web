import React from 'react';
import loadingGif from '../../assets/loading.gif';

const Loading = () => {
  return (
    <div
      style={{
        margin: '20px auto 100px',
        textAlign: 'center',
        marginBottom: '100px',
        backgroundColor: '#ffffff',
        width: '300px',
        borderRadius: '4px'
      }}
    >
      <img src={loadingGif} alt="loading..." />
    </div>
  );
};

export default Loading;
