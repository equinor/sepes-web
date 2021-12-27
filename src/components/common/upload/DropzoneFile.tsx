import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { EquinorIcon } from '../StyledComponents';

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

    return (
        <ChooseImgdiv
            {...getRootProps()}
            style={{
                opacity: disabled ? 0.5 : 1,
                pointerEvents: disabled ? 'none' : 'initial'
            }}
            dragActive={isDragActive}
            data-cy="file_upload_check"
        >
            <input className="dropzone-input" {...getInputProps()} data-cy="file_upload" />
            <div className="text-center">
                {isDragActive && !disabled ? (
                    <div className="dropzone-content" style={{ textAlign: 'center' }}>
                        {EquinorIcon('cloud_upload', '#007079', 32)}
                        <div>Drop here</div>
                    </div>
                ) : (
                    <div className="dropzone-content" style={{ textAlign: 'center' }}>
                        {EquinorIcon('cloud_upload', '#007079', 32)}
                        <div>
                            {!loading ? (
                                <>
                                    {!disabled ? (
                                        <>
                                            Drop files or <span style={{ color: '#007079' }}>browse</span> to upload
                                        </>
                                    ) : (
                                        'You do not have access to upload'
                                    )}
                                </>
                            ) : (
                                'File upload will be available when the storage account is ready'
                            )}
                        </div>
                    </div>
                )}
            </div>
        </ChooseImgdiv>
    );
};

export default Dropzone;
