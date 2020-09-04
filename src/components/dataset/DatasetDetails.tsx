import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Icon, Button } from '@equinor/eds-core-react';
import { DatasetObj } from '../common/interfaces';
import { getDataset, getStandardDataset } from '../../services/Api';
import { Link } from 'react-router-dom';
import { arrow_back, delete_forever } from '@equinor/eds-icons';
import LoadingComponent from '../common/LoadingComponent';
import FileDropzoneContainer from '../common/upload/FileDropzone';
import { Label } from '../common/StyledComponents';
import { bytesToMB } from '../common/helpers';
import { useHistory } from 'react-router-dom';
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
    background-color:#ffffff;
    width: 100%;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap:256px;
    padding:32px;
    background-color:#ffffff;
    @media (max-width: 768px) {
        display: block;
    }
  `;

const RightWrapper = styled.div`
    margin-top:64px;
    display: grid;
    grid-gap:16px;
  `;

  const AttachmentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 196px 16px;
  padding: 8px;
`;
let studyId = '';
let datasetId = '';
const DatasetDetails = (props: any) => {
    const history = useHistory();
    const [dataset, setDataset] = useState<DatasetObj>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean>();
    const [imageUrl, setImageUrl] = useState('');
    const [files, setFiles] = useState<any>([]);

    useEffect(() => {
        setIsSubscribed(true);
        getDatasetFromApi();
        return () => setIsSubscribed(false);
    }, [files, setFiles]);

    const RemoveFile = (i: number):void => {
        setImageUrl('');
        const filesTemp = files;
        filesTemp.splice(i, 1);
        setFiles(filesTemp);
    }
    const getDatasetFromApi = () => {
        setLoading(true);
        datasetId = window.location.pathname.split('/')[4];
        studyId = window.location.pathname.split('/')[2];
        if (checkUrlIfGeneralDataset()) {
            datasetId = studyId;
            getStandardDataset(datasetId).then((result: any) => {
                if (result && !result.Message) {
                    setDataset(result);
                    console.log("result: ", result);
                }
                else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
                setLoading(false);
            });
        }
        else {
            getDataset(datasetId, studyId).then((result: any) => {
                if (result && !result.Message) {
                    setDataset(result);
                    console.log("result: ", result);
                }
                else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
                setLoading(false);
            });
    }
    };

    const checkUrlIfGeneralDataset = () => {
        if (window.location.pathname.split('/')[1] === 'datasets') {
            return true;
        }
        return false;
    }

    const handleEditMetdata = evt => {
        if (checkUrlIfGeneralDataset()) {
            history.push('/datasets/' + datasetId + '/edit');
        }
        else {
            history.push('/studies/' + studyId + '/datasets/' + datasetId + '/edit');
        }
    }

    const returnField = (fieldName) => {
        return <Typography variant="h6">{fieldName || '-'}</Typography>;
    }

    return (
        <OuterWrapper>
            <Wrapper>
                <div>
                    <div style={{ marginBottom: '16px' }}>
                    <Typography variant="h1">{dataset?.name}</Typography>
                        {!checkUrlIfGeneralDataset() ?<span>This data is only available for this study</span>: null}
                    </div>
                    { !checkUrlIfGeneralDataset() ?
                    <Link to={'/studies/' + studyId} 
                        style={{color: '#007079', fontSize: '22px', margin: '0 0 0 16px' }}>
                            <Icon
                            color="#007079"
                            name="arrow_back"
                            size={24}
                            style={{marginRight: '16px'}}
                            />Back to study
                    </Link> : 
                    <Link to={'/datasets'} 
                    style={{color: '#007079', fontSize: '22px', margin: '0 0 0 16px' }}>
                        <Icon
                        color="#007079"
                        name="arrow_back"
                        size={24}
                        style={{marginRight: '16px'}}
                        />Back to datasets
                    </Link> }
                    <FileDropzoneContainer setImageUrl={setImageUrl} setFiles={setFiles} />
                    <AttachmentWrapper>
                        {files.map((file:File, i:number) => {
                            return (
                                <>
                                    <div>{file.name}</div>
                                    <div>{bytesToMB(file.size) + ' '} MB / 42.00 MB</div>
                                    <Icon
                                        onClick={() => RemoveFile(i)}
                                        color='#007079'
                                        name='delete_forever'
                                        size={24}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </>
                            );
                            }
                        )}
                    </AttachmentWrapper>
                </div>
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
                    <Button
                        style={{ width: '150px' }}
                        variant="outlined"
                        onClick={handleEditMetdata}
                    >
                        Edit metadata
                    </Button>
                </RightWrapper>
            </Wrapper>
        </OuterWrapper>
    )
}

export default DatasetDetails;
