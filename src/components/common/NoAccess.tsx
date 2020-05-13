import React from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NoAccess = () => {
  return (
    <div
      style={{
        margin: 'auto',
        width: '30%',
        textAlign: 'center',
        marginBottom: '100px'
      }}
    >
      <FontAwesomeIcon
        icon={faTimesCircle}
        size="5x"
        style={{ margin: '20px' }}
      />
      <div>
        <b>It seems like you don´t have access to this content.</b>
      </div>
    </div>
  );
};

export default NoAccess;
