import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Icon, Button } from '@equinor/eds-core-react';
import { DatasetObj } from '../common/interfaces';
import { getDataset } from '../../services/Api';
import { Link } from 'react-router-dom';
import { arrow_back } from '@equinor/eds-icons';
import LoadingComponent from '../common/LoadingComponent';

const icons = {
    arrow_back
  };
  Icon.add(icons);

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap:16px;
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

const linkStyle = {
    marginTop: '16px',
    color: '#007079',
    fontSize: '22px'
};
let studyId = '';
let datasetId = '';
const DatasetDetails = (props: any) => {
    const [dataset, setDataset] = useState<DatasetObj>();
    const [loading, setLoading] = useState<boolean>();
    const [isSubscribed, setIsSubscribed] = useState<boolean>();

    useEffect(() => {
        setIsSubscribed(true);
        getDatasetFromApi();
        return () => setIsSubscribed(false);
    }, []);

    const getDatasetFromApi = () => {
        setLoading(true);
        datasetId = window.location.pathname.split('/')[4];
        studyId = window.location.pathname.split('/')[2];
        getDataset(datasetId, studyId).then((result: any) => {
            if (result) {
                setDataset(result);
                console.log("result: ", result);
            }
            else {
                console.log("Err");
            }
            setLoading(false);
        });
    };

    const handleEditMetdata = evt => {
        window.location.pathname = '/studies/' + studyId + '/datasets/' + datasetId + '/edit';
    }

    const returnField = (fieldName) => {
        return <Typography variant="h6">{fieldName || '-'}</Typography>;
    }

    return (
        !loading ?
        <Wrapper>
            <div>
                <div style={{ marginBottom: '16px' }}>
                    <Typography variant="h2">{dataset?.name}</Typography>
                    <span>This data is only available for this study</span>
                </div>
                <Link to={'/studies/' + studyId} style={linkStyle}><Icon color="#007079" name="arrow_back" size={24} />Back to study</Link>
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
