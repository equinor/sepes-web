import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const ChooseImgdiv = styled.div<{ dragActive: boolean }>`
    height: 125px;
    width: 125px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: groove;
    border: 1px dashed #007079;
    background: ${(props: any) => (props.dragActive ? '#deedee' : '#f7f7f7')};
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
        accept
    });

    /*
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

    return (
        <ChooseImgdiv {...getRootProps()} dragActive={isDragActive}>
            <input className="dropzone-input" {...getInputProps()} />
            <div className="text-center">
                {isDragActive ? (
                    <div className="dropzone-content">Drop here</div>
                ) : (
                    <div className="dropzone-content" style={{ textAlign: 'center' }}>
                        Click or drag n drop photo. <br />
                        <br />
                        <span style={{ fontSize: '10px' }}>
                            <em>Leaving blank removes logo</em>
                        </span>
                    </div>
                )}
            </div>
        </ChooseImgdiv>
    );
};

export default Dropzone;
