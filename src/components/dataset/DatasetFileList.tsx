/*eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Icon, Button, LinearProgress, DotProgress, Search, EdsProvider } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { bytesToSize, truncate } from '../common/helpers/helpers';
import { checkIfDeleteIsEnabled, handleScroll, returnFileListText } from 'components/common/helpers/datasetHelpers';
import { getDatasetSasTokenDelete } from 'services/Api';
import { getDatasetId, getStudyId } from 'utils/CommonUtil';
import { getDatasetsFilesUrl } from 'services/ApiCallStrings';
import { deleteFile } from 'services/BlobStorage';
import { checkUrlIfGeneralDataset } from 'utils/DatasetUtil';
import { DatasetObj } from 'components/common/interfaces';

const AttachmentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 96px 32px;
    grid-gap: 0 8px;
`;

type DatasetFileListProps = {
    loadingFiles: boolean;
    viewableFiles: any;
    setViewableFiles: React.Dispatch<any>;
    numberOfFilesInProgress: number;
    dataset: DatasetObj;
    progressArray: any;
    files: any;
    setFiles: React.Dispatch<any>;
    setUpdateCache: any;
    controllerSas: AbortController;
    controller: AbortController;
    setController: React.Dispatch<React.SetStateAction<AbortController>>;
    abortArray: any;
    updateCache: any;
    getSasKey: any;
};

const intervalUpdateSasDelete = 285000;

const DatasetFileList: React.FC<DatasetFileListProps> = ({
    loadingFiles,
    numberOfFilesInProgress,
    dataset,
    progressArray,
    files,
    setFiles,
    setUpdateCache,
    controllerSas,
    setController,
    abortArray,
    updateCache,
    viewableFiles,
    setViewableFiles,
    getSasKey
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [sasKeyDeleteExpired, setSasKeyDeleteExpired] = useState<boolean>(true);
    const [sasKeyDelete, setSasKeyDelete] = useState<string>('');
    const datasetId = getDatasetId();
    const studyId = getStudyId();
    const isStandard = checkUrlIfGeneralDataset();

    useEffect(() => {
        return () => {
            setSearchValue('');
        };
    }, []);

    useEffect(() => {
        const timer = setInterval(async () => {
            setSasKeyDeleteExpired(true);
        }, intervalUpdateSasDelete);

        return () => clearInterval(timer);
    }, []);

    const getSasKeyDelete = (retries = 3, backoff = 300) => {
        return new Promise((resolve) => {
            if (!sasKeyDeleteExpired) {
                return resolve(sasKeyDelete);
            }
            getDatasetSasTokenDelete(datasetId, controllerSas.signal)
                .then((result: any) => {
                    if (retries > 0 && result.message) {
                        setTimeout(() => {
                            return getSasKeyDelete(retries - 1);
                        }, backoff);
                    }
                    setSasKeyDeleteExpired(false);
                    setSasKeyDelete(result);
                    return resolve(result);
                })
                .catch((ex: any) => {
                    console.log(ex);
                    if (retries > 0) {
                        setTimeout(() => {
                            return getSasKey(retries - 1);
                        }, backoff);
                    }
                });
        });
    };

    const updateOnNextVisit = () => {
        const dataCache = isStandard ? getDatasetsFilesUrl(studyId) : getDatasetsFilesUrl(datasetId);
        setUpdateCache({ ...updateCache, [dataCache]: true });
    };

    const removeFile = (_file: any, _fileindex): void => {
        try {
            // controller.abort();
            // controller = new AbortController();
            setController(new AbortController());
        } catch (e) {
            if (e.name === 'AbortError') {
                // abort was called on our abortSignal
                console.log('Operation was aborted by the user');
            } else {
                // some other error occurred 🤷‍♂️
                console.log('Uploading file failed');
            }
        }

        updateOnNextVisit();
        const _files = [...files];
        _files.splice(_fileindex, 1);
        setFiles(_files);
        setViewableFiles(_files.slice(0, viewableFiles.length));
        const index = abortArray.findIndex((x) => x.blobName === _file.name);
        const progIndex = progressArray.findIndex((x) => x.name === _file.name);
        if (progIndex !== -1) {
            progressArray.splice(progIndex, 1);
        }

        if (index !== -1) {
            const progressItem = abortArray[index];
            if (progressItem && progressItem.percent === 1) {
                try {
                    controllerSas.abort();
                    controllerSas = new AbortController();
                    abortArray.splice(index, 1);
                    return;
                } catch (error) {
                    console.log(error);
                }
            } else if (progressItem.percent < 100) {
                try {
                    progressItem.controller.abort();
                } catch (error) {
                    console.log(error);
                }

                abortArray.splice(index, 1);
                return;
            }
        }
        const fileName = _file.path ?? _file.name;

        getSasKeyDelete()
            .then((result: any) => {
                deleteFile(result, fileName ?? _file[0]);
            })
            .catch((ex: any) => {
                console.log(ex);
            });
    };

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
                                        style={{ marginTop: '16px', marginRight: '8px' }}
                                    >
                                        <AttachmentWrapper>
                                            <div>{truncate(_file.path, 100) ?? truncate(_file.name, 100)}</div>
                                            <div>{bytesToSize(_file.size)}</div>
                                            <EdsProvider density="compact">
                                                <Button
                                                    variant="ghost_icon"
                                                    onClick={() => removeFile(_file, i)}
                                                    style={{ marginTop: '-10px' }}
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
                                            </EdsProvider>
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
                            {returnFileListText(dataset, searchValue)}
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

export default DatasetFileList;
