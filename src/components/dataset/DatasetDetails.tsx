import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Icon, Button, Tooltip, LinearProgress, DotProgress, Chip } from '@equinor/eds-core-react';
import { DatasetObj, DatasetResourcesObj } from '../common/interfaces';
import {
    deleteFileInDataset,
    getDatasetSasToken,
    getStudySpecificDatasetFiles,
    getStudySpecificDatasetResources,
    removeStudyDataset
} from '../../services/Api';
import { Link } from 'react-router-dom';
import { arrow_back, delete_forever } from '@equinor/eds-icons';
import { Label } from '../common/StyledComponents';
import { bytesToSize } from '../common/helpers';
import LoadingFull from '../common/LoadingComponentFullscreen';
import CreateEditDataset from './CreateEditDataset';
import Dropzone from '../common/upload/DropzoneFile';
import { makeFileBlobFromUrl } from '../../auth/AuthFunctions';
import { Permissions } from '../../index';
import useFetchUrl from '../common/hooks/useFetchUrl';
import * as notify from '../common/notify';
import { EquinorIcon } from '../common/StyledComponents';
import { useHistory } from 'react-router-dom';
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
import { uploadFile } from '../../services/BlobStorage';
import Prompt from '../common/Promt';
import LinearProgressComponent from './LinearProgressComponent';

const icons = {
    arrow_back,
    delete_forever
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
    grid-gap: 256px;
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
`;

const AttachmentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 96px 32px;
    grid-gap: 0 8px;
`;

const checkUrlIfGeneralDataset = () => {
    if (window.location.pathname.split('/')[1] === 'datasets') {
        return true;
    }
    return false;
};
let controller = new AbortController();
let controllerFiles = new AbortController();
let controllerSas = new AbortController();
const interval = 7000;
let percentComplete2 = {};

let progressArray: any = [];
//let progressArray: any = [];

const DatasetDetails = (props: any) => {
    const datasetId = window.location.pathname.split('/')[4];
    const studyId = window.location.pathname.split('/')[2];
    const isStandard = checkUrlIfGeneralDataset();
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const [datasetDeleteInProgress, setDatasetDeleteInProgress] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingFiles, setLoadingFiles] = useState<boolean>(false);
    const [fileUploadInProgress, setFileUploadInProgress] = useState<boolean>(false);
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
    const [prevFiles, setPrevFiles] = useState<any>([]);
    const [datasetStorageAccountIsReady, setDatasetStorageAccountIsReady] = useState<Boolean>(
        dataset.storageAccountLink !== '' || false
    );
    const permissions = useContext(Permissions);
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const history = useHistory();
    //const [percentComplete, setPercentComplete] = useState<any>({});
    const [percentComplete, setPercentComplete] = useState<any>(progressArray);
    const [percentUpdater, setPercentUpdater] = useState<any>(0);
    const [filesHandled, setFilesHandled] = useState<any>(0);
    const [totalFiles, setTotalFiles] = useState<any>(0);
    const [storageAccountStatus, setStorageAccountStatus] = useState<string>('');
    let keyCount: number = 0;

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
        return () => {
            //Aborts the getting files call
            controllerFiles.abort();
            controllerFiles = new AbortController();
            //Abort any files currently being uploaded
            controller.abort();
            controller = new AbortController();
        };
    }, []);
    /*
    useEffect(() => {
        if (percentComplete === 0 || percentComplete === 100) {
            setHasChanged(false);
            setFileUploadInProgress(false);
        } else if (percentComplete.length === 0) {
            setFileUploadInProgress(false);
            setHasChanged(false);
        } else {
            setFileUploadInProgress(true);
        }
    }, [percentComplete, percentComplete2, setPercentComplete]);
    */

    useEffect(() => {
        const filesInProgress = percentComplete.filter((x) => x.percent > 0 && x.percent < 100);
        if (filesInProgress.length > 0) {
            setHasChanged(true);
        } else {
            setHasChanged(false);
        }
    }, [percentComplete, percentUpdater]);

    useEffect(() => {
        return () => {
            cancelAllDownloads();
            progressArray = [];
        };
    }, []);

    const getDatasetResources = () => {
        if (!checkUrlIfGeneralDataset()) {
            getStudySpecificDatasetResources(datasetId, studyId).then((result: any) => {
                if (result && (result.errors || result.Message)) {
                    notify.show('danger', '500', result.Message, result.RequestId);
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
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                } else if (result && isSubscribed) {
                    setFiles(result);
                }
            });
        }
    };

    const checkStatusOfStorageAccount = (resources: any) => {
        let res = false;
        if (!resources) {
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

    const getKey = () => {
        return keyCount++;
    };
    /*
    const uploadFiles = (formData: any, previousFiles: any) => {
        setPercentComplete(0);
        updateOnNextVisit();
        if (!checkUrlIfGeneralDataset()) {
            postFile('api/datasets/' + datasetId + '/files', formData, previousFiles).then((result: any) => {
                if (result.Message) {
                    console.log('err', result);
                }
            });
        } else {
            datasetId = studyId;
            postFile('api/datasets/' + datasetId + '/files', formData, previousFiles).then((result: any) => {
                if (result.Message) {
                    console.log('err', result);
                }
            });
        }
    };
    

    const postFile = async (url, files: any, previousFiles: any) => {
        return new Promise(() => {
            myMSALObj
                .acquireTokenSilent(loginRequest)
                .then((tokenResponse: any) => {
                    if (tokenResponse.accessToken) {
                        const bearer = `Bearer ${tokenResponse.accessToken}`;

                        axios({
                            headers: { Authorization: bearer },
                            method: 'post',
                            url: `${process.env.REACT_APP_SEPES_BASE_API_URL}${url}`,
                            data: files,
                            timeout: 1000000,
                            onUploadProgress: (p) => {
                                const percentCalculated = Math.floor((p.loaded * 100) / p.total);
                                setPercentComplete(percentCalculated);
                            },
                            cancelToken: source.token
                        }).catch((thrown) => {
                            console.log('error', thrown);
                            setFiles(previousFiles);
                        });
                    }
                })
                .catch((error: string) => {
                    console.log(error);
                });
        });
    };
    */

    const handleEditMetdata = (evt) => {
        setShowEditDataset(true);
    };

    const updateOnNextVisit = () => {
        const dataCache = isStandard ? getDatasetsFilesUrl(studyId) : getDatasetsFilesUrl(datasetId);
        setUpdateCache({ ...updateCache, [dataCache]: true });
    };

    const deleteDataset = () => {
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
                notify.show('danger', '500', result.Message, result.RequestId);
            }
        });
    };
    /*
    const uploadFile3 = async (
        blobUri: string,
        blobName: string,
        data: any,
        totalSize: any,
        setPercentComplete: any,
        percentComplete: any,
        controller: any,
        progressArray: any
    ) => {
        const blobServiceClient = new BlobServiceClient(blobUri);
        const containerClient = blobServiceClient.getContainerClient('files');
        const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);

        try {
            blockBlobClient.uploadBrowserData(data, {
                onProgress: (progress: TransferProgressEvent) => {
                    const percentCalculated = Math.floor((progress.loadedBytes * 100) / totalSize);
                    if (percentCalculated > 0) {
                        let filePercent = {
                            blobName: blobName,
                            percent: percentCalculated
                        };

                        var index = progressArray.findIndex((x: any) => x.blobName == blobName);

                        index === -1
                            ? progressArray.push(filePercent)
                            : (progressArray[index].percent = percentCalculated);
                    }
                    setPercentComplete3(progressArray);
                    setPercentUpdater(percentCalculated);
                },
                abortSignal: controller.signal
            });
        } catch (e) {
            if (e.name === 'AbortError') {
                // abort was called on our abortSignal
                console.log('Operation was aborted by the user');
            } else {
                // some other error occurred 🤷‍♂️
                console.log('Uploading file failed');
            }
        }
    };
    */

    const setFilesProgressToOnePercent = (_files: any) => {
        _files.forEach(async (file: any) => {
            let filePercent = { blobName: file.name, percent: 1, controller: new AbortController() };
            progressArray.push(filePercent);
        });
        setPercentComplete(progressArray);
        setPercentUpdater(1);
    };

    const handleFileDrop = async (_files: File[]): Promise<void> => {
        setFileUploadInProgress(true);
        setDuplicateFiles(false);
        _files = checkIfFileAlreadyIsUploaded(_files);

        if (_files.length === 0) {
            return;
        }
        setHasChanged(true);
        const previousFiles = [...files];
        setPrevFiles(previousFiles);
        const tempFiles = [...files];
        tempFiles.push(..._files);
        setFiles(tempFiles);
        if (_files.length) {
            setFilesProgressToOnePercent(_files);
            setTotalFiles(_files.length);
            getDatasetSasToken(datasetId, controllerSas.signal).then((result: any) => {
                if (result && !result.Message) {
                    let filesHandledCount = 0;
                    _files.forEach(async (file) => {
                        await makeFileBlobFromUrl(URL.createObjectURL(file), file.name)
                            .then((blob) => {
                                filesHandledCount++;
                                setFilesHandled(filesHandledCount);
                                try {
                                    uploadFile(
                                        result,
                                        file.name,
                                        blob,
                                        file.size,
                                        setPercentComplete,
                                        controller,
                                        progressArray,
                                        setPercentUpdater
                                    );
                                    /*
                                if (result && 1 === 2) {
                                    const blobServiceClient = new BlobServiceClient(result);
                                    const containerClient = blobServiceClient.getContainerClient('files');
                                    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(
                                        file.name
                                    );

                                    try {
                                        blockBlobClient.uploadBrowserData(blob, {
                                            onProgress: (progress: TransferProgressEvent) => {
                                                const percentCalculated = Math.floor(
                                                    (progress.loadedBytes * 100) / file.size
                                                );
                                                if (percentCalculated > 0) {
                                                    let filePercent = {
                                                        blobName: file.name,
                                                        percent: percentCalculated
                                                    };

                                                    var index = progressArray.findIndex(
                                                        (x: any) => x.blobName == file.name
                                                    );

                                                    index === -1
                                                        ? progressArray.push(filePercent)
                                                        : (progressArray[index].percent = percentCalculated);
                                                }
                                                setPercentComplete3(progressArray);
                                                setTest(percentCalculated);
                                            },
                                            abortSignal: controller.signal
                                        });
                                    } catch (e) {
                                        if (e.name === 'AbortError') {
                                            // abort was called on our abortSignal
                                            console.log('Operation was aborted by the user');
                                        } else {
                                            // some other error occurred 🤷‍♂️
                                            console.log('Uploading file failed');
                                        }
                                    }
                                }*/
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
                    notify.show('danger', '500', result.Message, result.RequestId);
                }
            });
        }
    };

    const checkIfFileAlreadyIsUploaded = (_files) => {
        let newArray: any = [];
        _files.forEach((file: File) => {
            const res = files
                .map((e) => {
                    return e.name;
                })
                .indexOf(file.name);
            if (res === -1) newArray.push(file);
        });

        if (_files.length !== newArray.length) {
            setDuplicateFiles(true);
        }

        return newArray;
    };

    const removeFile = (i: number, file: any): void => {
        try {
            controller.abort();
            //controllerSas.abort();
            controller = new AbortController();
            //controllerSas = new AbortController();
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
        const index = progressArray.findIndex((x) => x.blobName === file.name);

        if (index !== -1) {
            const progressItem = progressArray[index];
            if (progressItem && progressItem.percent === 1) {
                controllerSas.abort();
                controllerSas = new AbortController();
                progressArray.splice(index, 1);
                setPercentComplete(progressArray);
                return;
            } else if (progressItem.percent < 100) {
                progressItem.controller.abort();
                progressArray.splice(index, 1);
                setPercentComplete(progressArray);
                return;
            }
        }
        deleteFileInDataset(datasetId, file.name).then((result: any) => {
            if (result.Message) {
                notify.show('danger', '500', result.Message, result.RequestId);
            }
        });
    };

    const returnField = (fieldName) => {
        return <Typography variant="h6">{fieldName || '-'}</Typography>;
    };

    const cancelAllDownloads = () => {
        progressArray.forEach((file: any) => {
            file.controller.abort();
        });
    };

    const returnPercentForFile = (blobName: string) => {
        const percent = percentComplete.filter((progress: any) => progress.blobName === blobName);

        if (percent.length > 0) {
            return percent[0].percent;
        }

        return 0;
    };

    const checkIfDeleteIsEnabled = (_file): boolean => {
        if (!dataset.permissions.editDataset) {
            return true;
        }
        const index = progressArray.findIndex((x: any) => x.blobName === _file.name);
        if (index === -1) {
            return false;
        }
        if (progressArray[index].percent === 1) {
            return true;
        }
        return false;
    };

    return !showEditDataset ? (
        !loadingFiles && !dataset.id && datasetResponse.notFound ? (
            <NotFound />
        ) : (
            <>
                <Prompt
                    hasChanged={hasChanged}
                    fallBackAddress={!checkUrlIfGeneralDataset() ? '/studies/' + studyId : undefined}
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
                        <div>
                            <div style={{ marginBottom: '16px' }}>
                                <Typography variant="h1">{dataset?.name}</Typography>
                                {!checkUrlIfGeneralDataset() ? (
                                    <span>This data is only available for this study</span>
                                ) : null}
                            </div>
                            {!checkUrlIfGeneralDataset() ? (
                                <Link
                                    to={'/studies/' + studyId}
                                    style={{ color: '#007079', fontSize: '22px', margin: '0 0 0 16px' }}
                                    data-cy="dataset_back_to_study"
                                >
                                    <Icon color="#007079" name="arrow_back" size={24} style={{ marginRight: '16px' }} />
                                    Back to study
                                </Link>
                            ) : (
                                <Link
                                    to={'/datasets'}
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
                            <div style={{ paddingTop: '8px' }}>
                                {!loadingFiles ? (
                                    files.length > 0 ? (
                                        files.map((file: any, i: number) => {
                                            return (
                                                <div>
                                                    <AttachmentWrapper key={getKey()}>
                                                        <div>{file.name}</div>
                                                        <div>{bytesToSize(file.size)} </div>
                                                        <Button
                                                            variant="ghost_icon"
                                                            onClick={() => removeFile(i, file)}
                                                            style={{ marginTop: '-8px' }}
                                                            disabled={checkIfDeleteIsEnabled(file)}
                                                        >
                                                            <Icon
                                                                color="#007079"
                                                                name="delete_forever"
                                                                size={24}
                                                                style={{ cursor: 'pointer' }}
                                                            />
                                                        </Button>
                                                    </AttachmentWrapper>

                                                    <LinearProgressComponent
                                                        percentComplete={percentUpdater}
                                                        blobName={file.name}
                                                    />

                                                    {progressArray.length > 0 &&
                                                        returnPercentForFile(file.name) > 0 && (
                                                            <LinearProgress
                                                                style={{ marginBottom: '16px', marginTop: '-4px' }}
                                                                value={returnPercentForFile(file.name)}
                                                                variant="determinate"
                                                            />
                                                        )}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div style={{ textAlign: 'center' }}>
                                            {dataset.storageAccountLink ? 'No files uploaded yet.' : ''}
                                        </div>
                                    )
                                ) : (
                                    <div style={{ textAlign: 'center' }}>
                                        <DotProgress variant="green" />
                                        <div>Loading files..</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {!datasetResponse.loading ? (
                            <RightWrapper>
                                <div>
                                    <Label>Storage account</Label>
                                    {dataset?.storageAccountLink ? (
                                        <a href={dataset?.storageAccountLink} target="_blank" rel="noopener noreferrer">
                                            <span style={{ marginRight: '8px' }}>{dataset?.storageAccountName}</span>
                                            {EquinorIcon('external_link', '#007079', 24)}
                                        </a>
                                    ) : (
                                        <Tooltip title={storageAccountStatus} placement="top">
                                            <DotProgress variant="green" />
                                        </Tooltip>
                                    )}
                                </div>
                                <div>
                                    <Label>Location</Label>
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
            permissions={dataset.permissions}
        />
    );
};

export default DatasetDetails;
