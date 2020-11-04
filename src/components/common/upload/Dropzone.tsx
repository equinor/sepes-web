import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const ChooseImgdiv = styled.div`
  height: 125px;
  width: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: groove;
  border: 1px dashed #007079;
  background: #F7F7F7;
  @media (max-width: 700px) {
    width: 95%;
  }
`;
interface props {
  onDrop: any;
  accept: string;
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
            Click or drag n drop photo
          </p>
        )}
      </div>
    </ChooseImgdiv>
  );
};

export default Dropzone;
