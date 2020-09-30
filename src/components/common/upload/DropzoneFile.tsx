import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { Icon } from '@equinor/eds-core-react';
import { cloud_upload } from '@equinor/eds-icons';
import { EquinorIcon } from '../StyledComponents';

const icons = {
    cloud_upload
};
Icon.add(icons);

const ChooseImgdiv = styled.div`
  height: 128px;
  display: flex;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
  border: 1px dashed #007079;
  cursor: pointer;
  box-sizing: border-box;
  background: #FFFFFF;
  @media (max-width: 700px) {
    width: 95%;
  }
`;
interface props {
  onDrop: any;
  accept?: string;
}
const Dropzone = ({ onDrop, accept }: props) => {
  // Initializing useDropzone hooks with options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

  return (
    <ChooseImgdiv {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Drop here</p>
        ) : (
          <p className="dropzone-content">
            {EquinorIcon('cloud_upload', '#007079', 32)}
            <div>Drop files or <span style={{color: '#007079'}}>browse</span> to upload</div>
          </p>
        )}
      </div>
    </ChooseImgdiv>
  );
};

export default Dropzone;
