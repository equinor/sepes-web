import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Icon, Button } from '@equinor/eds-core-react';
import { DatasetObj } from '../common/interfaces';
import { getDataset, getStandardDataset } from '../../services/Api';
import { Link } from 'react-router-dom';
import { arrow_back, delete_forever } from '@equinor/eds-icons';
import LoadingComponent from '../common/LoadingComponent';
import FileDropzoneContainer from '../common/upload/FileDropzone';
import { EquinorIcon } from '../common/StyledComponents';
import { bytesToMB } from '../common/helpers';
import { useHistory } from 'react-router-dom';
import * as notify from '../common/notify';

const icons = {
    arrow_back,
    delete_forever
  };
  Icon.add(icons);

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
    const [loading, setLoading] = useState<boolean>();
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
        !loading ?
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
                    <div>Data set name</div>
                    {returnField(dataset?.name)}
                </div>
                <div>
                    <div>location</div>
                    {returnField(dataset?.location)}
                </div>
                <div>
                    <div>Storage account url</div>
                    {returnField(dataset?.location)}
                </div>
                <div>
                    <div>Data classification</div>
                    {returnField(dataset?.classification)}
                </div>
                <div>
                    <div>LRA ID</div>
                    {returnField(dataset?.lraId)}
                </div>
                <div>
                    <div>Data ID</div>
                    {returnField(dataset?.dataId)}
                </div>
                <div>
                    <div>Source system</div>
                    {returnField(dataset?.sourceSystem)}
                </div>
                <div>
                    <div>BA data owner</div>
                    {returnField(dataset?.baDataOwner)}
                </div>
                <div>
                    <div>Asset</div>
                    {returnField(dataset?.asset)}
                </div>
                <div>
                    <div>Country of origin</div>
                    {returnField(dataset?.countryOfOrigin)}
                </div>
                <div>
                    <div>Area L1</div>
                    {returnField(dataset?.areaL1)}
                </div>
                <div>
                    <div>Area L2</div>
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
        : <LoadingComponent />
    )
}

export default DatasetDetails;
