import React, { useState, useEffect, useContext } from 'react';
import { getStandardDatasets } from '../../services/Api';
import DatasetsOverviewTable from './DatasetsOverviewTable';
import LoadingComponentFull from '../common/LoadingComponentFullscreen';
import styled from 'styled-components';
import { Permissions } from '../../index';
import NoAccess from '../common/NoAccess';
import * as notify from '../common/notify';
import useFetch from '../common/hooks/useFetch';
import { UpdateCache } from '../../App';

const Wrapper = styled.div`
  margin: 24px 32px 32px 32px;
  background-color:#ffffff;
  border-radius:4px;
  min-width:512px;
`;

const Dataset = (props: any) => {
    const permissions = useContext(Permissions);
    const [datasets, setDatasets] = useState([]);
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const { loading } = useFetch(getStandardDatasets, setDatasets, 'datasets');

    return (
        permissions.canAdministerDatasets ?
        <Wrapper>
            {loading && <LoadingComponentFull />}
            <DatasetsOverviewTable datasets={datasets} />
        </Wrapper> : <NoAccess />
    )
}

export default Dataset;
