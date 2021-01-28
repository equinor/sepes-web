import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Icon, Button, Tooltip, LinearProgress, DotProgress } from '@equinor/eds-core-react';
import { DatasetObj, DatasetResourcesObj } from '../common/interfaces';
import {
    deleteFileInDataset,
    getStudySpecificDatasetFiles,
    getStudySpecificDatasetResources,
    removeStudyDataset
} from '../../services/Api';
import { Link } from 'react-router-dom';
import { arrow_back, delete_forever } from '@equinor/eds-icons';
import { Label } from '../common/StyledComponents';
import { bytesToMB } from '../common/helpers';
import LoadingFull from '../common/LoadingComponentFullscreen';
import CreateEditDataset from './CreateEditDataset';
import Dropzone from '../common/upload/DropzoneFile';
import { loginRequest, makeFileBlobFromUrl } from '../../auth/AuthFunctions';
import { Permissions } from '../../index';
import { useLocation } from 'react-router-dom';
import useFetchUrl from '../common/hooks/useFetchUrl';
import * as notify from '../common/notify';
import { EquinorIcon } from '../common/StyledComponents';
import { useHistory } from 'react-router-dom';
import DeleteResourceComponent from '../common/customComponents/DeleteResourceComponent';
import { UpdateCache } from '../../App';
import myMSALObj from '../../auth/AuthConfig';
import {
    getDatasetsFilesUrl,
    getStandardDatasetUrl,
    getStudySpecificDatasetUrl,
    getStudyByIdUrl
} from '../../services/ApiCallStrings';
import NotFound from '../common/NotFound';
import axios from 'axios';
import { resourceStatus, resourceType } from '../common/types';

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

let cancelToken = axios.CancelToken;
let source = cancelToken.source();
const interval = 7000;

const DatasetDetails = (props: any) => {
    let datasetId = window.location.pathname.split('/')[4];
    const studyId = window.location.pathname.split('/')[2];
    const isStandard = checkUrlIfGeneralDataset();
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const [datasetDeleteInProgress, setDatasetDeleteInProgress] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingFiles, setLoadingFiles] = useState<boolean>(false);
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
        setDataset
    );
    const [showEditDataset, setShowEditDataset] = useState<boolean>(false);
    const [files, setFiles] = useState<any>([]);
    const [datasetStorageAccountIsReady, setDatasetStorageAccountIsReady] = useState<Boolean>(
        dataset.storageAccountLink !== '' || false
    );
    const permissions = useContext(Permissions);
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const history = useHistory();
    const [percentComplete, setPercentComplete] = useState<any>(0);
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
        };
    }, [dataset.storageAccountLink]);

    useEffect(() => {
        if (
            dataset.storageAccountLink !== '' &&
            dataset.storageAccountLink !== undefined &&
            dataset.storageAccountLink !== null
        ) {
            getDatasetFiles();
        }
    }, [datasetStorageAccountIsReady]);

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
        if (!checkUrlIfGeneralDataset()) {
            setLoadingFiles(true);
            getStudySpecificDatasetFiles(datasetId).then((result: any) => {
                setLoadingFiles(false);
                if (result && (result.errors || result.Message)) {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                } else {
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
        resources.map((resource: DatasetResourcesObj, i: number) => {
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
                            onUploadProgress: (p) => {
                                const percentCalculated = Math.floor((p.loaded * 100) / p.total);
                                setPercentComplete(percentCalculated);
                            },
                            cancelToken: source.token
                        }).catch((thrown) => {
                            if (axios.isCancel(thrown)) {
                                setFiles(previousFiles);
                            }
                        });
                    }

                    // Callback code here
                })
                .catch((error: string) => {
                    console.log(error);
                });
        });
    };

    const handleEditMetdata = (evt) => {
        setShowEditDataset(true);
    };

    const updateOnNextVisit = () => {
        const dataCache = isStandard ? getDatasetsFilesUrl(studyId) : getDatasetsFilesUrl(datasetId);
        setUpdateCache({ ...updateCache, [dataCache]: true });
    };

    const deleteDataset = () => {
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

    const handleFileDrop = async (_files: File[]): Promise<void> => {
        const previousFiles = [...files];
        const tempFiles = [...files];
        tempFiles.push(..._files);
        setFiles(tempFiles);
        let _formData = new FormData();
        if (_files.length) {
            let filesHandledCount = 0;
            await _files.forEach(async (file) => {
                await makeFileBlobFromUrl(URL.createObjectURL(file), file.name)
                    .then((blob) => {
                        filesHandledCount++;
                        _formData.append(`files`, blob);
                    })
                    .then(() => {
                        if (filesHandledCount === _files.length) {
                            uploadFiles(_formData, previousFiles);
                        }
                    });
            });
        }
    };

    const removeFile = (i: number, file: any): void => {
        setPercentComplete(0);
        updateOnNextVisit();
        const _files = [...files];
        _files.splice(i, 1);
        setFiles(_files);
        deleteFileInDataset(datasetId, file.name).then((result: any) => {
            if (result.Message) {
                notify.show('danger', '500', result.Message, result.RequestId);
            }
        });
    };

    const returnField = (fieldName) => {
        return <Typography variant="h6">{fieldName || '-'}</Typography>;
    };

    return !showEditDataset ? (
        !loadingFiles && !dataset.id && datasetResponse.notFound ? (
            <NotFound />
        ) : (
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
                            <Link to={'/datasets'} style={{ color: '#007079', fontSize: '22px', margin: '0 0 0 16px' }}>
                                <Icon color="#007079" name="arrow_back" size={24} style={{ marginRight: '16px' }} />
                                Back to datasets
                            </Link>
                        )}
                        <Dropzone
                            onDrop={(event: File[]) => handleFileDrop(event)}
                            loading={
                                dataset.storageAccountLink !== '' && dataset.storageAccountLink !== null ? false : true
                            }
                            disabled={
                                !(
                                    dataset.permissions?.editDataset &&
                                    (percentComplete === 0 || percentComplete === 100) &&
                                    dataset.storageAccountLink
                                )
                            }
                        />
                        {percentComplete > 0 && (
                            <div style={{ display: 'flex' }}>
                                <LinearProgress
                                    style={{ marginTop: '16px' }}
                                    value={percentComplete}
                                    variant="determinate"
                                />
                                <Button
                                    onClick={() => {
                                        source.cancel();
                                        setPercentComplete(0);

                                        cancelToken = axios.CancelToken;
                                        source = cancelToken.source();
                                    }}
                                    style={{ float: 'right', padding: '4px' }}
                                    variant="ghost_icon"
                                    disabled={percentComplete === 0 || percentComplete === 100}
                                >
                                    {percentComplete === 0 || percentComplete === 100
                                        ? EquinorIcon('check', '', 24)
                                        : EquinorIcon('clear', '', 24)}
                                </Button>
                            </div>
                        )}
                        <div style={{ paddingTop: '8px' }}>
                            {files &&
                                files.map((file: any, i: number) => {
                                    return (
                                        <AttachmentWrapper key={getKey()}>
                                            <div>{file.name}</div>
                                            <div>{bytesToMB(file.size) + ' '} MB</div>
                                            <Button
                                                variant="ghost_icon"
                                                onClick={() => removeFile(i, file)}
                                                style={{ marginTop: '-8px' }}
                                                disabled={!(percentComplete === 0 || percentComplete === 100)}
                                            >
                                                <Icon
                                                    color="#007079"
                                                    name="delete_forever"
                                                    size={24}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </Button>
                                        </AttachmentWrapper>
                                    );
                                })}
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
                                    <DotProgress variant="green" />
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
                                                        permissions.canEdit_PreApproved_Datasets ||
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
