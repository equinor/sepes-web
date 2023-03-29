import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const ChooseImgdiv = styled.div<{ dragActive: boolean }>`
    height: 128px;
    display: flex;
    margin-top: 40px;
    justify-content: center;
    align-items: center;
    border: 1px dashed #007079;
    cursor: pointer;
    box-sizing: border-box;
    background: #ffffff;
    background: ${(props: any) => (props.dragActive ? '#deedee' : '#ffffff')};
`;

type DropzoneProps = {
    onDrop: any;
    accept?: string;
    disabled?: boolean;
    loading?: boolean;
};

const Dropzone: React.FC<DropzoneProps> = ({ onDrop, accept, disabled, loading }) => {
    // Initializing useDropzone hooks with options
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
    });

    return <div />;
};

Dropzone.defaultProps = {
    accept: undefined,
    disabled: undefined,
    loading: undefined
};

export default Dropzone;
