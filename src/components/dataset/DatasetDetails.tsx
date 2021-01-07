import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Typography, Icon, Button, Tooltip, LinearProgress } from '@equinor/eds-core-react';
import { DatasetObj } from '../common/interfaces';
import { deleteFileInDataset, removeStudyDataset } from '../../services/Api';
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
    grid-template-columns: 1fr 196px 16px;
    grid-gap: 0 8px;
`;

const checkUrlIfGeneralDataset = () => {
    if (window.location.pathname.split('/')[1] === 'datasets') {
        return true;
    }
    return false;
};

const DatasetDetails = (props: any) => {
    let datasetId = window.location.pathname.split('/')[4];
    const studyId = window.location.pathname.split('/')[2];
    const isStandard = checkUrlIfGeneralDataset();
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataset, setDataset] = useState<DatasetObj>({
        name: '',
        permissions: {
            deleteDataset: false,
            editDataset: false
        }
    });
    useFetchUrl(
        isStandard ? getStandardDatasetUrl(studyId) : getStudySpecificDatasetUrl(datasetId, studyId),
        setDataset
    );
    const [showEditDataset, setShowEditDataset] = useState<boolean>(false);
    const [files, setFiles] = useState<any>([]);
    const datasetResponse = useFetchUrl(
        isStandard ? getDatasetsFilesUrl(studyId) : getDatasetsFilesUrl(datasetId),
        setFiles,
        !isStandard
    );
    const permissions = useContext(Permissions);
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const history = useHistory();
    const [percentComplete, setPercentComplete] = useState<any>(0);
    let keyCount: number = 0;

    const getKey = () => {
        return keyCount++;
    };

    const uploadFiles = (formData: any): void => {
        setPercentComplete(0);
        updateOnNextVisit();
        if (!checkUrlIfGeneralDataset()) {
            postFile('api/datasets/' + datasetId + '/files', formData).then((result: any) => {
                if (result.Message) {
                    console.log('err', result);
                }
            });
        } else {
            datasetId = studyId;
            postFile('api/datasets/' + datasetId + '/files', formData).then((result: any) => {
                if (result.Message) {
                    console.log('err', result);
                }
            });
        }
    };

    const postFile = async (url, files: any) => {
        return new Promise(() => {
            myMSALObj
                .acquireTokenSilent(loginRequest)
                .then((tokenResponse: any) => {
                    if (tokenResponse.accessToken) {
                        const bearer = `Bearer ${tokenResponse.accessToken}`;
                        var xhr = new XMLHttpRequest();
                        xhr.upload.addEventListener(
                            'progress',
                            (evt) => {
                                if (evt.lengthComputable) {
                                    const percentCalculated = (evt.loaded / evt.total) * 100;
                                    setPercentComplete(percentCalculated);
                                }
                            },
                            false
                        );
                        xhr.open('POST', `${process.env.REACT_APP_SEPES_BASE_API_URL}${url}`);
                        xhr.setRequestHeader('Authorization', bearer);
                        xhr.send(files);

                        xhr.onreadystatechange = function () {
                            // Call a function when the state changes.
                            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                                // Request finished. Do processing here.
                                return this.response;
                            }
                        };
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
        const tempFiles = [...files];
        tempFiles.push(..._files);
        setFiles(tempFiles);
        let _formData = new FormData();
        if (_files.length) {
            _files.forEach(async (file) => {
                await makeFileBlobFromUrl(URL.createObjectURL(file), file.name)
                    .then((blob) => {
                        _formData.append(`files`, blob);
                    })
                    .then(() => {
                        uploadFiles(_formData);
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
        !datasetResponse.loading && !dataset.id ? (
            <NotFound />
        ) : (
            <OuterWrapper>
                {loading && <LoadingFull />}
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
                            disabled={!dataset.permissions?.editDataset}
                        />
                        {percentComplete > 0 && (
                            <LinearProgress
                                style={{ marginTop: '8px' }}
                                value={percentComplete}
                                variant="determinate"
                            />
                        )}
                        <div style={{ paddingTop: '8px' }}>
                            {files &&
                                files.map((file: any, i: number) => {
                                    return (
                                        <AttachmentWrapper key={getKey()}>
                                            <div>{file.name}</div>
                                            <div>{bytesToMB(file.size) + ' '} MB</div>
                                            <Icon
                                                onClick={() => removeFile(i, file)}
                                                color="#007079"
                                                name="delete_forever"
                                                size={24}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </AttachmentWrapper>
                                    );
                                })}
                        </div>
                    </div>
                    {!datasetResponse.loading ? (
                        <RightWrapper>
                            <div>
                                <Label>Storage account</Label>
                                <a href={dataset?.storageAccountLink} target="_blank" rel="noopener noreferrer">
                                    <span style={{ marginRight: '8px' }}>{dataset?.storageAccountName}</span>
                                    {EquinorIcon('external_link', '#007079', 24)}
                                </a>
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
                        <LoadingFull />
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
            cache={datasetResponse.cache}
        />
    );
};

export default DatasetDetails;
