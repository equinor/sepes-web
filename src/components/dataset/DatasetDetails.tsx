import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Typography, Icon, Button, Tooltip, LinearProgress } from '@equinor/eds-core-react';
import { DatasetObj } from '../common/interfaces';
import { addFiles, deleteFileInDataset, removeStudyDataset } from '../../services/Api';
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
    padding: 8px;
`;

const checkUrlIfGeneralDataset = () => {
    if (window.location.pathname.split('/')[1] === 'datasets') {
        return true;
    }
    return false;
};

interface passedProps {
    pathname: string;
    canEditStudySpecificDataset: boolean;
}

const DatasetDetails = (props: any) => {
    let datasetId = window.location.pathname.split('/')[4];
    const studyId = window.location.pathname.split('/')[2];
    const isStandard = checkUrlIfGeneralDataset();
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataset, setDataset] = useState<DatasetObj>({
        name: ''
    });
    const location = useLocation<passedProps>();
    useFetchUrl(isStandard ? 'datasets/' + studyId : 'studies/' + studyId + '/datasets/' + datasetId, setDataset);
    const [showEditDataset, setShowEditDataset] = useState<boolean>(false);
    const [files, setFiles] = useState<any>([]);
    const datasetResponse = useFetchUrl(
        isStandard ? 'datasets/' + studyId + '/files' : 'datasets/' + datasetId + '/files',
        setFiles,
        !isStandard
    );
    const permissions = useContext(Permissions);
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const history = useHistory();
    const [percentComplete, setPercentComplete] = useState<any>(0);
    //let percentComplete: any = 0;

    const uploadFiles = (formData: any): void => {
        setPercentComplete(0);
        updateOnNextVisit();
        console.log('aiiiiiii');
        //datasetResponse.setLoading(false);
        if (!checkUrlIfGeneralDataset()) {
            postFile('api/datasets/' + datasetId + '/files', formData).then((result: any) => {
                if (result.Message) {
                    console.log('err', result);
                }
                console.log('aiiiiiii22');
                console.log(result);
                //datasetResponse.setLoading(false);
            });
        } else {
            datasetId = studyId;
            postFile('api/datasets/' + datasetId + '/files', formData).then((result: any) => {
                if (result.Message) {
                    console.log('err', result);
                }
                console.log('aiiiiiii22');
                // datasetResponse.setLoading(false);
            });
        }
    };

    const postFile = async (url, files: any) => {
        return new Promise(function (resolve, reject) {
            myMSALObj
                .acquireTokenSilent(loginRequest)
                .then((tokenResponse: any) => {
                    if (tokenResponse.accessToken) {
                        const headers = new Headers();
                        const bearer = `Bearer ${tokenResponse.accessToken}`;
                        headers.append('Authorization', bearer);

                        const options = {
                            method: 'POST',
                            headers: headers,
                            body: files
                        };

                        const config = {
                            headers: {
                                Authorization: `Bearer ${bearer}`
                            }
                        };

                        var xhr = new XMLHttpRequest();
                        xhr.upload.addEventListener(
                            'progress',
                            function (evt) {
                                if (evt.lengthComputable) {
                                    let test = (evt.loaded / evt.total) * 100;
                                    setPercentComplete(test);
                                    console.log(percentComplete);
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
        const dataCache = isStandard ? 'datasets/' + studyId + '/files' : 'datasets/' + datasetId + '/files';
        setUpdateCache({ ...updateCache, [dataCache]: true });
    };

    const deleteDataset = () => {
        setLoading(true);
        setUserClickedDelete(false);
        setUpdateCache({ ...updateCache, ['studies/' + studyId]: true });
        removeStudyDataset(datasetId).then((result: any) => {
            if (result && !result.Message) {
                history.push('/studies/' + studyId);
            } else {
                console.log('Err');
                notify.show('danger', '500', result.Message, result.RequestId);
            }
            setLoading(false);
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
                        {!checkUrlIfGeneralDataset() ? <span>This data is only available for this study</span> : null}
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
                        disabled={location.state && !location.state.canEditStudySpecificDataset}
                    />
                    {percentComplete > 0 && (
                        <LinearProgress style={{ marginTop: '8px' }} value={percentComplete} variant="determinate" />
                    )}
                    <AttachmentWrapper>
                        {files &&
                            files.map((file: any, i: number) => {
                                return (
                                    <>
                                        <div>{file.name}</div>
                                        <div>{bytesToMB(file.size) + ' '} MB</div>
                                        <Icon
                                            onClick={() => removeFile(i, file)}
                                            color="#007079"
                                            name="delete_forever"
                                            size={24}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </>
                                );
                            })}
                    </AttachmentWrapper>
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
                                            (location.state && location.state.canEditStudySpecificDataset)
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
                                                (location.state && location.state.canEditStudySpecificDataset)
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
                                                (location.state && location.state.canEditStudySpecificDataset)
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
                                                    (location.state && location.state.canEditStudySpecificDataset)
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
