import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Typography, Icon, Button, Tooltip } from '@equinor/eds-core-react';
import { DatasetObj } from '../common/interfaces';
import { getDataset, getStandardDataset, addFiles, deleteFileInDataset } from '../../services/Api';
import { Link } from 'react-router-dom';
import { arrow_back, delete_forever } from '@equinor/eds-icons';
import { Label } from '../common/StyledComponents';
import { bytesToMB } from '../common/helpers';
import LoadingFull from '../common/LoadingComponentFullscreen';
import CreateEditDataset from './CreateEditDataset';
import Dropzone from '../common/upload/DropzoneFile';
import { makeFileBlobFromUrl } from '../../auth/AuthFunctions';
import useFetch from '../common/hooks/useFetch';
import { Permissions } from '../../index';
import { useLocation } from 'react-router-dom';
import useFetchUrl from '../common/hooks/useFetchUrl';
import * as notify from '../common/notify';

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
    let studyId = window.location.pathname.split('/')[2];
    const isStandard = checkUrlIfGeneralDataset();

    const [dataset, setDataset] = useState<DatasetObj>({
        name: ''
    });
    useFetchUrl(isStandard ? 'datasets/' + studyId : 'studies/' + studyId + '/datasets/' + datasetId, setDataset);
    const [showEditDataset, setShowEditDataset] = useState<boolean>(false);
    const [files, setFiles] = useState<any>([]);
    const datasetResponse = useFetchUrl('datasets/' + datasetId + ' /files', setFiles);
    //const [formData, setFormData] = useState<any>(null);
    const permissions = useContext(Permissions);
    const location = useLocation<passedProps>();

    const uploadFiles = (formData: any): void => {
        console.log(formData);
        datasetResponse.setLoading(true);
        if (!checkUrlIfGeneralDataset()) {
            addFiles(datasetId, formData).then((result) => {
                if (result.Message) {
                    console.log('err', result);
                } else {
                    //removeFiles();
                }
                datasetResponse.setLoading(false);
            });
        } else {
            datasetId = studyId;
            addFiles(datasetId, formData).then((result) => {
                if (result.Message) {
                    console.log('err', result);
                } else {
                    //removeFiles();
                }
                datasetResponse.setLoading(false);
            });
        }
    };

    const removeFiles = () => {
        setFiles([]);
        //setFormData(null);
    };

    const handleEditMetdata = (evt) => {
        setShowEditDataset(true);
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
        const _files = [...files];
        _files.splice(i, 1);
        setFiles(_files);
        deleteFileInDataset(datasetId, file.name).then((result: any) => {
            if (result.Message) {
                notify.show('danger', '500', result.Message, result.RequestId);
            }
        });
        //handleFileDrop(_files);
    };

    const returnField = (fieldName) => {
        return <Typography variant="h6">{fieldName || '-'}</Typography>;
    };

    return !showEditDataset ? (
        <OuterWrapper>
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
                    <Dropzone onDrop={(event: File[]) => handleFileDrop(event)} />
                    <AttachmentWrapper>
                        {files.map((file: any, i: number) => {
                            return (
                                <>
                                    <div>{file.name}</div>
                                    <div>{bytesToMB(file.size) + ' '} MB / 42.00 MB</div>
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
                    {/*files.length > 0 && (
                        <Button onClick={() => uploadFiles(formData)} style={{ float: 'right', width: '128px' }}>
                            Upload
                        </Button>
                    )*/}
                </div>
                {!datasetResponse.loading ? (
                    <RightWrapper>
                        <div>
                            <Label>Data set name</Label>
                            {returnField(dataset?.name)}
                        </div>
                        <div>
                            <Label>location</Label>
                            {returnField(dataset?.location)}
                        </div>
                        <div>
                            <Label>Storage account url</Label>
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
