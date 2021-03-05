import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Icon, Button, Tooltip, LinearProgress, DotProgress, Chip } from '@equinor/eds-core-react';
import { DatasetObj, DatasetResourcesObj } from '../common/interfaces';
import {
    getDatasetSasToken,
    getStudySpecificDatasetFiles,
    getStudySpecificDatasetResources,
    removeStudyDataset,
    getDatasetSasTokenDelete
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
import { uploadFile, deleteFile } from '../../services/BlobStorage';
import Prompt from '../common/Promt';

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
const intervalUpdateSas = 1740000;
const intervalUpdateSasDelete = 285000;

let abortArray: any = [];
let progressArray: any = [];

const DatasetDetails = (props: any) => {
    const datasetId = window.location.pathname.split('/')[4];
    const studyId = window.location.pathname.split('/')[2];
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
    }, [files, progressArray]);

    useEffect(() => {
        return () => {
            cancelGettingFilesCall();
            cancelAllDownloads();
            abortArray = [];
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
                            /* 2 */
                            return getSasKey(retries - 1); /* 3 */
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
                            /* 2 */
                            return getSasKey(retries - 1); /* 3 */
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
                            /* 2 */
                            return getSasKeyDelete(retries - 1); /* 3 */
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
                            /* 2 */
                            return getSasKey(retries - 1); /* 3 */
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

    const setFilesProgressToOnePercent = (_files: any) => {
        _files.forEach(async (file: any) => {
            let filePercent = { blobName: file.name, percent: 1, controller: new AbortController() };
            abortArray.push(filePercent);
        });
    };

    const handleFileDrop = async (_files: File[]): Promise<void> => {
        setDuplicateFiles(false);
        _files = checkIfFileAlreadyIsUploaded(_files);

        if (_files.length === 0) {
            return;
        }

        setHasChanged(true);
        const previousFiles = [...files];
        const tempFiles = [...files];
        tempFiles.push(..._files);

        _files.forEach((_file: any) => {
            _file.percent = 1;
            progressArray.push(_file);
        });

        setFiles(tempFiles);
        if (_files.length) {
            setFilesProgressToOnePercent(_files);
            getSasKey().then((result: any) => {
                if (result && !result.Message) {
                    _files.forEach(async (file) => {
                        await makeFileBlobFromUrl(URL.createObjectURL(file), file.name)
                            .then((blob) => {
                                try {
                                    uploadFile(
                                        result || sasKey,
                                        file.name,
                                        blob,
                                        file.size,
                                        abortArray,
                                        setFiles,
                                        progressArray
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
        const index = abortArray.findIndex((x) => x.blobName === file.name);
        const progIndex = progressArray.findIndex((x) => x.name === file.name);
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
                deleteFile(result, file.name);
            })
            .catch((ex: any) => {
                console.log(ex);
            });
    };

    const returnField = (fieldName) => {
        return <Typography variant="h6">{fieldName || '-'}</Typography>;
    };

    const cancelAllDownloads = () => {
        try {
            controllerSas.abort();
            controllerSas = new AbortController();
        } catch (error) {
            console.log(error);
        }

        abortArray.forEach((file: any) => {
            try {
                file.controller.abort();
            } catch (ex) {
                console.log(ex);
            }
        });
    };

    const checkIfDeleteIsEnabled = (_file): boolean => {
        if (!dataset.permissions.editDataset) {
            return true;
        }
        const index = progressArray.findIndex((x: any) => x.name === _file.name);
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
                                                <div key={file.name}>
                                                    <AttachmentWrapper>
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
                                                    {file.percent && (
                                                        <LinearProgress
                                                            style={{ marginBottom: '16px', marginTop: '-4px' }}
                                                            value={file.percent}
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
                                        <DotProgress color="primary" />
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
                                            <DotProgress color="primary" />
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
