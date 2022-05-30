import React, { useState, useContext } from 'react';
import DatasetsOverviewTable from './DatasetsOverviewTable';
import LoadingComponentFull from '../../common/LoadingFull';
import styled from 'styled-components';
import { Permissions } from '../../../index';
import NoAccess from '../../common/informationalComponents/NoAccess';
import useFetchUrl from '../../common/hooks/useFetchUrl';
import { getDatasetsUrl } from '../../../services/ApiCallStrings';

const Wrapper = styled.div`
    margin: 24px 32px 32px 32px;
    background-color: #ffffff;
    border-radius: 4px;
`;

const Dataset = () => {
    const permissions = useContext(Permissions);
    const [datasets, setDatasets] = useState([]);
    const datasetsResponse = useFetchUrl(getDatasetsUrl(), setDatasets);

    return permissions.canRead_PreApproved_Datasets ? (
        <Wrapper>
            {datasetsResponse.loading && <LoadingComponentFull />}
            <DatasetsOverviewTable datasets={datasets} permissions={permissions} />
        </Wrapper>
    ) : (
        <NoAccess />
    );
};

export default Dataset;
