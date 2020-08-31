import React, { useState } from 'react';
import { DatasetObj } from '../common/interfaces'
import { Typography, Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

type DatasetSidesheetViewProps = {
    dataset: DatasetObj;
};

const Wrapper = styled.div`
    display: grid;
    grid-gap:16px;
  `;

const BtnWrapper = styled.div`
    margin-top: 16px;
`;

const DatasetSidesheetView: React.FC<DatasetSidesheetViewProps> = ({ dataset }) => {
    const history = useHistory();
    const returnField = (fieldName) => {
        if (fieldName === null) {
            fieldName = '';
        }
        return <Typography variant="h6">{fieldName || '-'}</Typography>;
    }
    return (
        <div>
        <Wrapper>
                <div>
                    <div>Area L1/L2</div>
                    <Typography variant="h6">{dataset.areaL1}{' / '}{dataset.areaL2}</Typography>
                </div>
                <div>
                    <div>Domain</div>
                    {returnField('Domain')}
                </div>
                <div>
                    <div>BA data owner</div>
                    {returnField(dataset.baDataOwner)}
                </div>
                <div>
                    <div>Source system</div>
                    {returnField(dataset.sourceSystem)}
                </div>
                <div>
                    <div>Data classification</div>
                    {returnField(dataset.classification)}
                </div>
                <div>
                    <div>Country of origin</div>
                    {returnField(dataset.countryOfOrigin)}
                </div>

                <div>
                    <div>Asset</div>
                    {returnField(dataset.asset)}
                </div>
                <div>
                    <div>Description</div>
                    {returnField(dataset.description)}
                </div>
                <div>
                    <div>Policies</div>
                    {returnField('Policies')}
                </div>
                <div>
                    <div>Data ID</div>
                    {returnField(dataset.dataId)}
                </div>
                <div>
                    <div>Policies</div>
                    {returnField(dataset.lraId)}
                </div>
        </Wrapper>
        <BtnWrapper>
            <Button variant="outlined" onClick={() => history.push('/datasets/' + dataset.id)}>Edit</Button>
            <Button variant="outlined" style={{ float: 'right' }}>View in Data Catalog</Button>
        </BtnWrapper>
        </div>
    )
}

export default DatasetSidesheetView;
