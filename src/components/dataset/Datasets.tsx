import React, { useState, useContext } from 'react';
import { getStandardDatasets } from '../../services/Api';
import DatasetsOverviewTable from './DatasetsOverviewTable';
import LoadingComponentFull from '../common/LoadingComponentFullscreen';
import styled from 'styled-components';
import { Permissions } from '../../index';
import NoAccess from '../common/NoAccess';
import useFetch from '../common/hooks/useFetch';

const Wrapper = styled.div`
    margin: 24px 32px 32px 32px;
    background-color: #ffffff;
    border-radius: 4px;
`;

const Dataset = (props: any) => {
    const permissions = useContext(Permissions);
    const [datasets, setDatasets] = useState([]);
    const { loading } = useFetch(getStandardDatasets, setDatasets, 'datasets');

    return permissions.canRead_PreApproved_Datasets ? (
        <Wrapper>
            {loading && <LoadingComponentFull />}
            <DatasetsOverviewTable datasets={datasets} permissions={permissions} />
        </Wrapper>
    ) : (
        <NoAccess />
    );
};

export default Dataset;
