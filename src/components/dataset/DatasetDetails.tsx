/*eslint-disable consistent-return, no-unneeded-ternary */
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import {
    Typography,
    Icon,
    Button,
    Tooltip,
    LinearProgress,
    DotProgress,
    Chip,
    Search,
    Switch
} from '@equinor/eds-core-react';
import { DatasetObj, DatasetResourcesObj } from '../common/interfaces';
import {
    getDatasetSasToken,
    getStudySpecificDatasetFiles,
    getStudySpecificDatasetResources,
    removeStudyDataset,
    getDatasetSasTokenDelete
} from '../../services/Api';
import { arrow_back, delete_forever, folder, file, folder_open } from '@equinor/eds-icons';
import { bytesToSize, round, truncate } from '../common/helpers/helpers';
import LoadingFull from '../common/LoadingComponentFullscreen';
import CreateEditDataset from './CreateEditDataset';
import Dropzone from '../common/upload/DropzoneFile';
import { makeFileBlobFromUrl } from '../../auth/AuthFunctions';
import { Permissions } from '../../index';
import useFetchUrl from '../common/hooks/useFetchUrl';
import { Label } from '../common/StyledComponents';
import { useHistory, Link } from 'react-router-dom';
import DeleteResourceComponent from '../common/customComponents/DeleteResourceComponent';
import { UpdateCache } from '../../App';
import {
    getDatasetsFilesUrl,
    getStandardDatasetUrl,
    getStudySpecificDatasetUrl,
    getStudyByIdUrl
} from '../../services/ApiCallStrings';
import NotFound from '../common/informationalComponents/NotFound';
import { resourceStatus, resourceType } from '../common/staticValues/types';
import { uploadFile, deleteFile } from '../../services/BlobStorage';
import Prompt from '../common/Promt';
import { getStudyId, getDatasetId } from 'utils/CommonUtil';
import {
    checkIfDeleteIsEnabled,
    checkIfFileAlreadyIsUploaded,
    setFilesProgressToOnePercent
} from 'components/common/helpers/datasetHelpers';
import { checkUrlIfGeneralDataset } from 'utils/DatasetUtil';
import FileBrowser from 'react-keyed-file-browser';
import './DatasetDetailsStyle.css';

const icons = {
    arrow_back,
    delete_forever,
    folder,
    file,
    folder_open
};
Icon.add(icons);

const OuterWrapper = styled.div`
    position: absolute;
    top: 64px;
    bottom: 0px;
    background-color: #ffffff;
    width: 100%;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 196px;
    padding: 32px;
    background-color: #ffffff;
    @media (max-width: 768px) {
        display: block;
    }
`;

const RightWrapper = styled.div`
    margin-top: 64px;
    display: grid;
    grid-gap: 16px;
    max-height: 660px;
`;

const AttachmentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 96px 32px;
    grid-gap: 0 8px;
`;

const StorageAccountWrapper = styled.div`
    margin-top: 7px;
    display: flex;
    color: #007079;
`;

let controller = new AbortController();
let controllerFiles = new AbortController();
let controllerSas = new AbortController();
const interval = 7000;
const intervalUpdateSas = 1740000;
const intervalUpdateSasDelete = 285000;

let abortArray: any = [];
let progressArray: any = [];

export interface FileObj {
    name: string;
    path: string;
    percent: number;
    uploadedBytes: number;
    key: string;
    size: number;
    modified: string;
}

const DatasetDetails = (props: any) => {
    const datasetId = getDatasetId();
    const studyId = getStudyId();
    const isStandard = checkUrlIfGeneralDataset();
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const [datasetDeleteInProgress, setDatasetDeleteInProgress] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingFiles, setLoadingFiles] = useState<boolean>(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [dataset, setDataset] = useState<DatasetObj>({
        name: '',
        storageAccountLink: undefined,
        permissions: {
            deleteDataset: false,
            editDataset: false
        }
    });

    const datasetResponse = useFetchUrl(
        isStandard ? getStandardDatasetUrl(studyId) : getStudySpecificDatasetUrl(datasetId, studyId),
        setDataset,
        undefined,
        controller
    );
    const [showEditDataset, setShowEditDataset] = useState<boolean>(false);
    const [duplicateFiles, setDuplicateFiles] = useState<boolean>(false);
    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const [files, setFiles] = useState<any>([]);
    const [viewableFiles, setViewableFiles] = useState<any>([]);
    const [datasetStorageAccountIsReady, setDatasetStorageAccountIsReady] = useState<Boolean>(
        dataset.storageAccountLink !== '' || false
    );
    const permissions = useContext(Permissions);
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const history = useHistory();
    const [storageAccountStatus, setStorageAccountStatus] = useState<string>('');
    const [sasKey, setSasKey] = useState<string>('');
    const [sasKeyExpired, setSasKeyExpired] = useState<boolean>(true);
    const [sasKeyDelete, setSasKeyDelete] = useState<string>('');
    const [sasKeyDeleteExpired, setSasKeyDeleteExpired] = useState<boolean>(true);
    const [searchValue, setSearchValue] = useState('');
    const [totalProgress, setTotalProgress] = useState<number>(0);
    const [folderViewMode, setFolderViewMode] = useState<boolean>(false);
    const handleOnSearchValueChange = (event) => {
        setViewableFiles(files);
        setSearchValue(event.target.value.toLowerCase());
    };

    useEffect(() => {
        let timer: any;
        try {
            timer = setInterval(async () => {
                if (dataset.storageAccountLink === '' || dataset.storageAccountLink === null) {
                    getDatasetResources();
                }
            }, interval);
        } catch (e) {
            console.log(e);
        }

        return () => {
            clearInterval(timer);
            setIsSubscribed(false);
        };
    }, [dataset.storageAccountLink]);

    useEffect(() => {
        if (
            dataset.storageAccountLink !== '' &&
            dataset.storageAccountLink !== undefined &&
            dataset.storageAccountLink !== null
        ) {
            setIsSubscribed(true);
            getDatasetFiles();
        }
        return () => setIsSubscribed(false);
    }, [datasetStorageAccountIsReady, dataset]);

    useEffect(() => {
        const filesInProgress = progressArray.filter((x) => x.percent && x.percent > 0 && x.percent < 100);

        if (filesInProgress.length > 0) {
            setHasChanged(true);
        } else {
            setHasChanged(false);
        }
        let totalSizeUploaded = 0;
        let totalSizeToUpload = 0;
        progressArray.forEach((_filesInProgress: any) => {
            if (_filesInProgress.percent !== undefined) {
                totalSizeUploaded += _filesInProgress.uploadedBytes;
                totalSizeToUpload += _filesInProgress.size;
            }
        });
        let percent = Math.floor((totalSizeUploaded * 100) / totalSizeToUpload);
        if (percent === 0 && hasChanged) {
            percent = 1;
        }
        setTotalProgress(percent);
    }, [files, progressArray]);

    useEffect(() => {
        return () => {
            cancelGettingFilesCall();
            cancelAllDownloads();
            abortArray = [];
            progressArray = [];
        };
    }, []);

    useEffect(() => {
        const timer = setInterval(async () => {
            setSasKeyExpired(true);
        }, intervalUpdateSas);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const timer = setInterval(async () => {
            setSasKeyDeleteExpired(true);
        }, intervalUpdateSasDelete);

        return () => clearInterval(timer);
    }, []);

    const getSasKey = (retries = 3, backoff = 300) => {
        return new Promise((resolve) => {
            if (!sasKeyExpired) {
                return resolve(sasKey);
            }
            getDatasetSasToken(datasetId, controllerSas.signal)
                .then((result: any) => {
                    if (retries > 0 && result.Message) {
                        setTimeout(() => {
                            return getSasKey(retries - 1);
                        }, backoff);
                    }

                    setSasKeyExpired(false);
                    setSasKey(result);
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

    const getSasKeyDelete = (retries = 3, backoff = 300) => {
        return new Promise((resolve) => {
            if (!sasKeyDeleteExpired) {
                return resolve(sasKeyDelete);
            }
            getDatasetSasTokenDelete(datasetId, controllerSas.signal)
                .then((result: any) => {
                    if (retries > 0 && result.Message) {
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

    const cancelGettingFilesCall = (): void => {
        controllerFiles.abort();
        controllerFiles = new AbortController();
    };

    const getDatasetResources = () => {
        if (!checkUrlIfGeneralDataset()) {
            getStudySpecificDatasetResources(datasetId, studyId).then((result: any) => {
                if (result && (result.errors || result.Message)) {
                    console.log('Err');
                } else {
                    checkStatusOfStorageAccount(result);
                }
            });
        }
    };

    const getDatasetFiles = () => {
        if (!checkUrlIfGeneralDataset() && isSubscribed) {
            setLoadingFiles(true);
            getStudySpecificDatasetFiles(datasetId, controllerFiles.signal).then((result: any) => {
                setLoadingFiles(false);
                if (result && (result.errors || result.Message)) {
                    console.log('Err');
                } else if (result && isSubscribed) {
                    const temp: any = [...result];
                    setFiles(temp);
                    setViewableFiles(result.slice(0, 20));
                    progressArray = result;
                }
            });
        }
    };

    const checkStatusOfStorageAccount = (resources: any) => {
        let res = false;
        if (!resources && !Array.isArray(resources)) {
            return res;
        }
        resources.map((resource: DatasetResourcesObj) => {
            setStorageAccountStatus(resource.status);
            if (resource.status === resourceStatus.ok && resource.type === resourceType.storageAccount) {
                res = true;
                setDataset({ ...dataset, storageAccountLink: resource.linkToExternalSystem });
                const dataCache = isStandard
                    ? getStandardDatasetUrl(studyId)
                    : getStudySpecificDatasetUrl(datasetId, studyId);
                setUpdateCache({ ...updateCache, [dataCache]: true });
            }
        });
        setDatasetStorageAccountIsReady(res);
    };

    const handleEditMetdata = () => {
        setShowEditDataset(true);
    };

    const updateOnNextVisit = () => {
        const dataCache = isStandard ? getDatasetsFilesUrl(studyId) : getDatasetsFilesUrl(datasetId);
        setUpdateCache({ ...updateCache, [dataCache]: true });
    };

    const deleteDataset = () => {
        setHasChanged(false);
        controllerFiles.abort();
        controllerFiles = new AbortController();
        setLoading(true);
        setDatasetDeleteInProgress(true);
        setUserClickedDelete(false);
        setUpdateCache({ ...updateCache, [getStudyByIdUrl(studyId)]: true });
        removeStudyDataset(datasetId).then((result: any) => {
            setLoading(false);
            if (result && !result.Message) {
                history.push('/studies/' + studyId);
            } else {
                console.log('Err');
            }
        });
    };

    const handleFileDrop = async (_files: File[]): Promise<void> => {
        setDuplicateFiles(false);
        _files = checkIfFileAlreadyIsUploaded(_files, files, setDuplicateFiles);

        if (_files.length === 0) {
            return;
        }

        setHasChanged(true);
        const previousFiles = [...files];
        const tempFiles = [...files];
        tempFiles.unshift(..._files);
        progressArray.forEach((_progress) => {
            if (_progress.percent === 100) {
                progressArray[progressArray.indexOf(_progress)].percent = undefined;
            }
        });

        _files.forEach((_file: any) => {
            const newFile: any = _file;
            newFile.percent = 1;
            newFile.uploadedBytes = 1;
            newFile.key = _file.path;

            newFile.modified = _file.lastModified;
            progressArray.unshift(newFile);
        });
        setFiles(tempFiles);
        setViewableFiles(tempFiles.slice(0, viewableFiles.length + _files.length));
        if (_files.length) {
            setFilesProgressToOnePercent(_files, abortArray);
            getSasKey().then((result: any) => {
                if (result && !result.Message) {
                    _files.forEach(async (_file: any) => {
                        await makeFileBlobFromUrl(URL.createObjectURL(_file), _file.name)
                            .then((blob) => {
                                try {
                                    let filePath = _file.path;
                                    if (_file.path[0] === '/') {
                                        filePath = filePath.substring(1);
                                    }

                                    uploadFile(
                                        result || sasKey,
                                        filePath,
                                        blob,
                                        _file.size,
                                        abortArray,
                                        setFiles,
                                        progressArray,
                                        _file.name
                                    );
                                } catch (ex) {
                                    console.log(ex);
                                    setFiles(previousFiles);
                                }
                            })
                            .catch((ex) => {
                                console.log(ex);
                            });
                    });
                } else {
                    setFiles(previousFiles);
                    console.log('Err');
                }
            });
        }
    };

    const removeFile = (i: number, _file: any): void => {
        try {
            controller.abort();
            controller = new AbortController();
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
        _files.splice(i, 1);
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
        getSasKeyDelete()
            .then((result: any) => {
                deleteFile(result, _file.path ?? _file.name);
            })
            .catch((ex: any) => {
                console.log(ex);
            });
    };

    const returnField = (fieldName) => {
        return (
            <Typography style={{ marginTop: '4px' }} variant="body_short">
                {fieldName || '-'}
            </Typography>
        );
    };

    const cancelAllDownloads = () => {
        try {
            controllerSas.abort();
            controllerSas = new AbortController();
        } catch (error) {
            console.log(error);
        }

        abortArray.forEach((_file: any) => {
            try {
                _file.controller.abort();
            } catch (ex) {
                console.log(ex);
            }
        });
    };

    const fetchMoreData = () => {
        setTimeout(() => {
            if (viewableFiles.length + 20 <= files.length) {
                setViewableFiles(files.slice(0, viewableFiles.length + 10));
            } else {
                setViewableFiles(files);
            }
        }, 200);
    };

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - round(e.target.scrollTop, 2); // === e.target.clientHeight;
        if (bottom <= e.target.clientHeight + 5 && bottom >= e.target.clientHeight - 5) {
            fetchMoreData();
        }
    };

    return !showEditDataset ? (
        !loadingFiles && !dataset.id && datasetResponse.notFound ? (
            <NotFound />
        ) : (
            <>
                <Prompt
                    hasChanged={hasChanged}
                    fallBackAddress={!checkUrlIfGeneralDataset() ? '/studies/' + studyId : undefined}
                    customText="All downloads will cancel"
                />
                <OuterWrapper>
                    {loading && <LoadingFull noTimeout={datasetDeleteInProgress} />}
                    {userClickedDelete && (
                        <DeleteResourceComponent
                            ResourceName={dataset?.name}
                            setUserClickedDelete={setUserClickedDelete}
                            onClick={deleteDataset}
                            type="dataset"
                        />
                    )}
                    <Wrapper>
                        <div style={{}}>
                            <div style={{ marginBottom: '16px' }}>
                                <Typography variant="h2">{dataset?.name}</Typography>
                                {!checkUrlIfGeneralDataset() ? (
                                    <Typography variant="h6">This data set is only available for this study</Typography>
                                ) : null}
                            </div>
                            {!checkUrlIfGeneralDataset() ? (
                                <Link
                                    to={'/studies/' + studyId}
                                    style={{
                                        color: '#007079',
                                        fontSize: '16px',
                                        margin: '32px 0 0 16px',
                                        display: 'flex',
                                        lineHeight: '16px'
                                    }}
                                    data-cy="dataset_back_to_study"
                                >
                                    <Icon color="#007079" name="arrow_back" size={16} style={{ marginRight: '16px' }} />
                                    Back to study
                                </Link>
                            ) : (
                                <Link
                                    to="/datasets"
                                    style={{ color: '#007079', fontSize: '22px', margin: '0 0 0 16px' }}
                                >
                                    <Icon color="#007079" name="arrow_back" size={24} style={{ marginRight: '16px' }} />
                                    Back to datasets
                                </Link>
                            )}
                            {!datasetResponse.loading && (
                                <Dropzone
                                    onDrop={(event: File[]) => handleFileDrop(event)}
                                    loading={
                                        dataset.storageAccountLink !== '' && dataset.storageAccountLink !== null
                                            ? false
                                            : true
                                    }
                                    disabled={!(dataset.permissions?.editDataset && dataset.storageAccountLink)}
                                />
                            )}
                            {duplicateFiles && (
                                <div>
                                    <Chip
                                        variant="active"
                                        onDelete={() => {
                                            setDuplicateFiles(false);
                                        }}
                                        style={{ marginLeft: 'auto' }}
                                    >
                                        Already uploaded files are skipped
                                    </Chip>
                                </div>
                            )}
                            <div style={{ textAlign: 'end' }}>
                                <Switch
                                    checked={folderViewMode}
                                    onChange={() => setFolderViewMode(!folderViewMode)}
                                    label="Folder view"
                                    style={{ float: 'right' }}
                                />
                            </div>
                            {totalProgress > 0 && (
                                <div style={{ marginBottom: '16px' }}>
                                    <Label style={{ marginBottom: '-16px', marginTop: '8px' }}>Total Progress</Label>
                                    <LinearProgress
                                        style={{ marginBottom: '0px', marginTop: '16px' }}
                                        value={totalProgress}
                                        variant="determinate"
                                    />
                                </div>
                            )}
                            {folderViewMode && (
                                <FileBrowser
                                    files={files ?? []}
                                    headerRenderer={null}
                                    icons={{
                                        File: <Icon name="file" color="#007079" style={{ marginBottom: '-6px' }} />,
                                        Folder: <Icon name="folder" color="#FF9200" style={{ marginBottom: '-6px' }} />,
                                        FolderOpen: (
                                            <Icon name="folder_open" color="#FF9200" style={{ marginBottom: '-6px' }} />
                                        )
                                    }}
                                />
                            )}

                            {!folderViewMode && (
                                <>
                                    <div>
                                        <Search onChange={handleOnSearchValueChange} placeholder="Type to search" />
                                    </div>

                                    <div>
                                        {!loadingFiles ? (
                                            viewableFiles.length > 0 ? (
                                                <div
                                                    id="scrollableDiv"
                                                    style={{ height: 428, overflowY: 'auto', overflowX: 'hidden' }}
                                                    onScroll={handleScroll}
                                                >
                                                    <div style={{ paddingTop: '10px' }} />
                                                    {viewableFiles.map((_file: any, i: number) => {
                                                        if (
                                                            searchValue === '' ||
                                                            (_file.name &&
                                                                _file.name.toLowerCase().includes(searchValue))
                                                        ) {
                                                            return (
                                                                <div
                                                                    key={_file.path ?? _file.name}
                                                                    style={{ marginTop: '4px', marginRight: '8px' }}
                                                                >
                                                                    <AttachmentWrapper>
                                                                        <div>
                                                                            {truncate(_file.path, 100) ??
                                                                                truncate(_file.name, 100)}
                                                                        </div>
                                                                        <div>{bytesToSize(_file.size)}</div>
                                                                        <Button
                                                                            variant="ghost_icon"
                                                                            onClick={() => removeFile(i, _file)}
                                                                            style={{ marginTop: '-14px' }}
                                                                            disabled={checkIfDeleteIsEnabled(
                                                                                _file,
                                                                                dataset,
                                                                                progressArray
                                                                            )}
                                                                        >
                                                                            <Icon
                                                                                color="#007079"
                                                                                name="delete_forever"
                                                                                size={24}
                                                                                style={{ cursor: 'pointer' }}
                                                                            />
                                                                        </Button>
                                                                    </AttachmentWrapper>
                                                                    {_file.percent && (
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
                                                        }
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
                            )}
                        </div>
                        {!datasetResponse.loading ? (
                            <RightWrapper>
                                <div>
                                    <Label>Azure storage account</Label>
                                    {dataset?.storageAccountLink ? (
                                        <a href={dataset?.storageAccountLink} target="_blank" rel="noopener noreferrer">
                                            <StorageAccountWrapper>
                                                <span style={{ marginRight: '8px' }}>
                                                    {dataset?.storageAccountName}
                                                </span>
                                                <Icon
                                                    color="#007079"
                                                    name="external_link"
                                                    size={24}
                                                    style={{ marginTop: '-6px' }}
                                                />
                                            </StorageAccountWrapper>
                                        </a>
                                    ) : (
                                        <Tooltip
                                            title={storageAccountStatus}
                                            placement="top"
                                            style={{ marginTop: '4px' }}
                                        >
                                            <DotProgress color="primary" style={{ marginRight: '8px' }} />
                                        </Tooltip>
                                    )}
                                </div>
                                <div>
                                    <Label>Azure Location</Label>
                                    {returnField(dataset?.location)}
                                </div>
                                <div>
                                    <Label>Data classification</Label>
                                    {returnField(dataset?.classification)}
                                </div>
                                <div>
                                    <Label>LRA ID</Label>
                                    {returnField(dataset?.lraId)}
                                </div>
                                <div>
                                    <Label>Data ID</Label>
                                    {returnField(dataset?.dataId)}
                                </div>
                                <div>
                                    <Label>Source system</Label>
                                    {returnField(dataset?.sourceSystem)}
                                </div>
                                <div>
                                    <Label>BA data owner</Label>
                                    {returnField(dataset?.baDataOwner)}
                                </div>
                                <div>
                                    <Label>Asset</Label>
                                    {returnField(dataset?.asset)}
                                </div>
                                <div>
                                    <Label>Country of origin</Label>
                                    {returnField(dataset?.countryOfOrigin)}
                                </div>
                                <div>
                                    <Label>Area L1</Label>
                                    {returnField(dataset?.areaL1)}
                                </div>
                                <div>
                                    <Label>Area L2</Label>
                                    {returnField(dataset?.areaL2)}
                                </div>
                                <div>
                                    <div style={{ display: 'inline-block', marginRight: '8px' }}>
                                        <Tooltip
                                            title={
                                                !(
                                                    permissions.canEdit_PreApproved_Datasets ||
                                                    dataset.permissions?.editDataset
                                                )
                                                    ? 'You do not have permission to edit metadata'
                                                    : ''
                                            }
                                            placement="top"
                                        >
                                            <Button
                                                style={{ width: '150px' }}
                                                variant="outlined"
                                                onClick={handleEditMetdata}
                                                data-cy="dataset_edit"
                                                disabled={
                                                    !(
                                                        permissions.canEdit_PreApproved_Datasets ||
                                                        dataset.permissions?.editDataset
                                                    )
                                                }
                                            >
                                                Edit metadata
                                            </Button>
                                        </Tooltip>
                                    </div>
                                    {!checkUrlIfGeneralDataset() && (
                                        <div style={{ display: 'inline-block', marginTop: '8px' }}>
                                            <Tooltip
                                                title={
                                                    !(
                                                        permissions.canEdit_PreApproved_Datasets ||
                                                        dataset.permissions?.editDataset
                                                    )
                                                        ? 'You do not have permission to edit metadata'
                                                        : ''
                                                }
                                                placement="top"
                                            >
                                                <Button
                                                    style={{ width: '150px' }}
                                                    variant="outlined"
                                                    color="danger"
                                                    onClick={() => setUserClickedDelete(true)}
                                                    data-cy="dataset_delete"
                                                    disabled={
                                                        !(
                                                            (permissions.canEdit_PreApproved_Datasets &&
                                                                checkUrlIfGeneralDataset()) ||
                                                            dataset.permissions?.deleteDataset
                                                        )
                                                    }
                                                >
                                                    Delete data set
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                            </RightWrapper>
                        ) : (
                            <LoadingFull noTimeout={datasetDeleteInProgress} />
                        )}
                    </Wrapper>
                </OuterWrapper>
            </>
        )
    ) : (
        <CreateEditDataset
            datasetFromDetails={dataset}
            setDatasetFromDetails={setDataset}
            setShowEditDataset={setShowEditDataset}
            editingDataset
        />
    );
};

export default DatasetDetails;
