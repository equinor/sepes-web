/*eslint-disable consistent-return, no-unneeded-ternary */
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Icon, LinearProgress, Chip, Switch, Breadcrumbs, Tooltip } from '@equinor/eds-core-react';
import { DatasetResourcesObj } from '../common/interfaces';
import {
    getDataset,
    getDatasetSasToken,
    getStandardDataset,
    getStudySpecificDatasetFiles,
    getStudySpecificDatasetResources,
    removeStudyDataset
} from '../../services/Api';
import { isIterable, truncate } from '../common/helpers/helpers';
import CreateEditDataset from './CreateEditDataset';
import Dropzone from '../common/upload/DropzoneFile';
import { makeFileBlobFromUrl } from '../../auth/AuthFunctions';
import { Permissions } from '../../index';
import { Label } from '../common/StyledComponents';
import { useHistory, Link } from 'react-router-dom';
import DeleteResourceComponent from '../common/customComponents/DeleteResource';
import { UpdateCache } from '../../App';
import { getStandardDatasetUrl, getStudySpecificDatasetUrl, getStudyByIdUrl } from '../../services/ApiCallStrings';
import NotFound from '../common/informationalComponents/NotFound';
import { resourceStatus, resourceType } from '../common/staticValues/types';
import { uploadFile } from '../../services/BlobStorage';
import Prompt from '../common/Prompt';
import { getStudyId, getDatasetId } from '../../utils/CommonUtil';
import { checkIfFileAlreadyIsUploaded, setFilesProgressToOnePercent } from 'components/common/helpers/datasetHelpers';
import { checkUrlIfGeneralDataset } from 'utils/DatasetUtil';
import DatasetFileList from './DatasetFileList';
import DatasetInformation from './DatasetInformation';
import { truncateLength } from '../common/staticValues/lenghts';
import BreadcrumbTruncate from '../common/customComponents/infoDisplayComponents/BreadcrumbTruncate';
import './DatasetDetailsStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDatasetFromStore } from '../../store/datasets/datasetsSelectors';
import { setDatasetInStore, setDatasetToInitialState } from 'store/datasets/datasetsSlice';
import { getDatasetFolderViewMode } from '../../store/usersettings/userSettingsSelectors';
import { toggleDatasetFolderView } from 'store/usersettings/userSettingsSlice';
import { setScreenLoading } from 'store/screenloading/screenLoadingSlice';
import getScreenLoadingFromStore from 'store/screenloading/screenLoadingSelector';
import LoadingFullScreenNew from 'components/common/LoadingFullScreenNew';

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

let controllerFiles = new AbortController();
let controllerSas = new AbortController();
const interval = 7000;
const intervalUpdateSas = 10000;

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

const DatasetDetails = () => {
    const datasetId = getDatasetId();
    const studyId = getStudyId();
    const dataset = useSelector(getDatasetFromStore());
    const showLoading = useSelector(getScreenLoadingFromStore());
    const dispatch = useDispatch();
    const isDatasetFolderView = useSelector(getDatasetFolderViewMode());
    const isStandard = checkUrlIfGeneralDataset();
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const [loadingFiles, setLoadingFiles] = useState<boolean>(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [controller, setController] = useState<AbortController>(new AbortController());
    const [notFound, setNotFound] = useState(false);
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
    const [totalProgress, setTotalProgress] = useState<number>(0);
    const [numberOfFilesInProgress, setNumberOfFilesInProgress] = useState<number>(0);

    useEffect(() => {
        if (!dataset.id) {
            dispatch(setScreenLoading(true));
            const datasetApiCall = isStandard
                ? getStandardDataset(datasetId, controller.signal)
                : getDataset(datasetId, studyId, controller.signal);

            datasetApiCall.then((result: any) => {
                dispatch(setScreenLoading(false));
                if (result && !result.message) {
                    dispatch(setDatasetInStore(result));
                } else {
                    setNotFound(true);
                }
            });
        }
    }, [studyId, datasetId]);

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
        updateTotalProgress();
    }, [files, progressArray]);

    useEffect(() => {
        return () => {
            cancelGettingFilesCall();
            cancelAllDownloads();
            abortArray = [];
            progressArray = [];
            dispatch(setDatasetToInitialState());
        };
    }, []);

    useEffect(() => {
        const timer = setInterval(async () => {
            setSasKeyExpired(true);
        }, intervalUpdateSas);

        return () => clearInterval(timer);
    }, []);

    const updateTotalProgress = () => {
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
    };

    const getSasKey = (retries = 3, backoff = 300) => {
        return new Promise((resolve) => {
            if (!sasKeyExpired) {
                return resolve(sasKey);
            }
            getDatasetSasToken(datasetId, controllerSas.signal)
                .then((result: any) => {
                    if (retries > 0 && result.message) {
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

    const cancelGettingFilesCall = (): void => {
        controllerFiles.abort();
        controllerFiles = new AbortController();
    };

    const getDatasetResources = () => {
        if (!isStandard) {
            getStudySpecificDatasetResources(datasetId, studyId).then((result: any) => {
                if (result && (result.errors || result.message)) {
                    console.log('Err');
                } else {
                    checkStatusOfStorageAccount(result);
                }
            });
        }
    };

    const getDatasetFiles = () => {
        if (!isStandard && isSubscribed) {
            setLoadingFiles(true);
            getStudySpecificDatasetFiles(datasetId, controllerFiles.signal).then((result: any) => {
                setLoadingFiles(false);
                if (result && (result.errors || result.message)) {
                    console.log('Err');
                } else if (result && isSubscribed && isIterable(result)) {
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
        if (!resources || !Array.isArray(resources)) {
            return res;
        }
        resources.map((resource: DatasetResourcesObj) => {
            setStorageAccountStatus(resource.status);
            if (resource.status === resourceStatus.ok && resource.type === resourceType.storageAccount) {
                res = true;
                dispatch(setDatasetInStore({ ...dataset, storageAccountLink: resource.linkToExternalSystem }));
                const dataCache = isStandard
                    ? getStandardDatasetUrl(studyId)
                    : getStudySpecificDatasetUrl(datasetId, studyId);
                setUpdateCache({ ...updateCache, [dataCache]: true });
            }
        });
        setDatasetStorageAccountIsReady(res);
    };

    const deleteDataset = () => {
        setHasChanged(false);
        controllerFiles.abort();
        controllerFiles = new AbortController();
        dispatch(setScreenLoading(true));
        setUserClickedDelete(false);
        setUpdateCache({ ...updateCache, [getStudyByIdUrl(studyId)]: true });
        removeStudyDataset(datasetId).then((result: any) => {
            dispatch(setScreenLoading(false));
            if (result && !result.message) {
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
            const newFile: FileObj = _file;
            newFile.percent = 1;
            newFile.uploadedBytes = 1;
            newFile.key = _file.path;
            newFile.modified = _file.lastModified;

            progressArray.unshift(newFile);
        });
        setFiles(tempFiles);
        setViewableFiles(tempFiles.slice(0, viewableFiles.length + _files.length));
        if (_files.length) {
            setNumberOfFilesInProgress(numberOfFilesInProgress + _files.length);
            setFilesProgressToOnePercent(_files, abortArray);
            getSasKey().then((result: any) => {
                if (result && !result.message) {
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
                                        _file.name,
                                        _files.length,
                                        updateTotalProgress
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

    return !showEditDataset ? (
        !loadingFiles && !dataset.id && notFound ? (
            <NotFound />
        ) : (
            <>
                <Prompt
                    hasChanged={hasChanged}
                    fallBackAddress={!isStandard ? '/studies/' + studyId : undefined}
                    customText="All downloads will cancel"
                />
                <OuterWrapper>
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
                                {isStandard ? (
                                    <Tooltip
                                        title={
                                            dataset?.name && dataset?.name.length > truncateLength ? dataset?.name : ''
                                        }
                                        placement="top"
                                        enterDelay={200}
                                    >
                                        <Typography variant="h2">{truncate(dataset?.name, truncateLength)}</Typography>
                                    </Tooltip>
                                ) : (
                                    <Breadcrumbs>
                                        <BreadcrumbTruncate
                                            breadcrumbText={dataset?.studyName}
                                            link={'/studies/' + studyId}
                                            datacy="dataset_back_to_study"
                                        />
                                        <BreadcrumbTruncate breadcrumbText={dataset?.name} />
                                    </Breadcrumbs>
                                )}
                                {!isStandard && (
                                    <Typography variant="h6">This data set is only available for this study</Typography>
                                )}
                            </div>
                            {isStandard && (
                                <Link
                                    to="/datasets"
                                    style={{ color: '#007079', fontSize: '22px', margin: '0 0 0 16px' }}
                                >
                                    <Icon color="#007079" name="arrow_back" size={24} style={{ marginRight: '16px' }} />
                                    Back to datasets
                                </Link>
                            )}
                            {!showLoading && (
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
                                    checked={isDatasetFolderView}
                                    onChange={() => dispatch(toggleDatasetFolderView(!isDatasetFolderView))}
                                    label="Folder view"
                                    style={{ float: 'right' }}
                                />
                            </div>
                            {((totalProgress > 0 && totalProgress < 100) || hasChanged) && (
                                <div style={{ marginBottom: '16px' }}>
                                    <Label style={{ marginBottom: '-16px', marginTop: '8px' }}>Total Progress</Label>
                                    <LinearProgress
                                        style={{ marginBottom: '0px', marginTop: '16px' }}
                                        value={totalProgress === 0 ? 1 : totalProgress}
                                        variant="determinate"
                                    />
                                </div>
                            )}
                            <DatasetFileList
                                loadingFiles={loadingFiles}
                                viewableFiles={viewableFiles}
                                setViewableFiles={setViewableFiles}
                                numberOfFilesInProgress={numberOfFilesInProgress}
                                dataset={dataset}
                                progressArray={progressArray}
                                files={files}
                                setFiles={setFiles}
                                setUpdateCache={setUpdateCache}
                                controllerSas={controllerSas}
                                controller={controller}
                                setController={setController}
                                abortArray={abortArray}
                                updateCache={updateCache}
                                getSasKey={getSasKey}
                                folderViewMode={isDatasetFolderView}
                            />
                        </div>
                        {!showLoading ? (
                            <DatasetInformation
                                dataset={dataset}
                                storageAccountStatus={storageAccountStatus}
                                isStandard={isStandard}
                                setShowEditDataset={setShowEditDataset}
                                permissions={permissions}
                                setUserClickedDelete={setUserClickedDelete}
                            />
                        ) : (
                            ''
                        )}
                    </Wrapper>
                </OuterWrapper>
                <LoadingFullScreenNew />
            </>
        )
    ) : (
        <CreateEditDataset setShowEditDataset={setShowEditDataset} editingDataset isStandardDataset={isStandard} />
    );
};

export default DatasetDetails;
