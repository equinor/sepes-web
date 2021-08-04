import React, { useState, useEffect } from 'react';
import { Icon, Button, LinearProgress, DotProgress, Search } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { bytesToSize, truncate } from '../common/helpers/helpers';
import { checkIfDeleteIsEnabled, handleScroll } from 'components/common/helpers/datasetHelpers';

type DatasetFileUploadProps = {
    loadingFiles: any;
    viewableFiles: any;
    numberOfFilesInProgress: any;
    dataset: any;
    removeFile: any;
    progressArray: any;
    files: any;
};

const AttachmentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 96px 32px;
    grid-gap: 0 8px;
`;

const DatasetFileUpload: React.FC<DatasetFileUploadProps> = ({
    loadingFiles,
    numberOfFilesInProgress,
    removeFile,
    dataset,
    progressArray,
    files
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [viewableFiles, setViewableFiles] = useState<any>([]);

    useEffect(() => {
        return () => {
            setSearchValue('');
        };
    }, []);

    const handleOnSearchValueChange = (event, _viewableFiles) => {
        if (event.target.value === '') {
            setViewableFiles(files.slice(0, 20));
            setSearchValue('');
        }
        if (event.target.value.length >= 3) {
            setSearchValue(event.target.value.toLowerCase());
            const temp = _viewableFiles
                .filter((x) => x.name.toLowerCase().includes(event.target.value.toLowerCase()))
                .slice(0, 20);
            setViewableFiles(temp);
        }
    };

    const fetchMoreData = () => {
        setTimeout(() => {
            if (searchValue !== '') {
                const temp = files
                    .filter((x) => x.name.includes(searchValue.toLowerCase()))
                    .slice(0, viewableFiles.length + 20);
                setViewableFiles(temp);
            } else if (viewableFiles.length + 20 <= files.length) {
                setViewableFiles(files.slice(0, viewableFiles.length + 10));
            } else {
                setViewableFiles(files);
            }
        }, 200);
    };
    return (
        <>
            <div>
                <Search
                    onChange={(e) => {
                        handleOnSearchValueChange(e, files);
                    }}
                    placeholder="Type minimum three characters to search"
                />
            </div>

            <div>
                {!loadingFiles ? (
                    viewableFiles.length > 0 ? (
                        <div
                            id="scrollableDiv"
                            style={{ height: 428, overflowY: 'auto', overflowX: 'hidden' }}
                            onScroll={(e) => handleScroll(e, fetchMoreData)}
                        >
                            <div style={{ paddingTop: '10px' }} />
                            {viewableFiles.map((_file: any, i: number) => {
                                return (
                                    <div
                                        key={_file.path ?? _file.name}
                                        style={{ marginTop: '4px', marginRight: '8px' }}
                                    >
                                        <AttachmentWrapper>
                                            <div>{truncate(_file.path, 100) ?? truncate(_file.name, 100)}</div>
                                            <div>{bytesToSize(_file.size)}</div>
                                            <Button
                                                variant="ghost_icon"
                                                onClick={() => removeFile(_file, i)}
                                                style={{ marginTop: '-14px' }}
                                                data-cy="dataset_remove_file"
                                                disabled={checkIfDeleteIsEnabled(_file, dataset, progressArray)}
                                            >
                                                <Icon
                                                    color="#007079"
                                                    name="delete_forever"
                                                    size={24}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </Button>
                                        </AttachmentWrapper>
                                        {_file.percent && numberOfFilesInProgress <= 100 && (
                                            <LinearProgress
                                                style={{
                                                    marginBottom: '16px',
                                                    marginTop: '-4px'
                                                }}
                                                value={_file.percent}
                                                variant="determinate"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
                            {dataset.storageAccountLink ? 'No files uploaded yet.' : ''}
                        </div>
                    )
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <DotProgress color="primary" />
                        <div style={{ marginTop: '8px' }}>Loading files..</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DatasetFileUpload;
