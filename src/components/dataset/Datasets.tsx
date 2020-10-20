import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@equinor/eds-core-react';
import { getStandardDatasets } from '../../services/Api';
import DatasetsOverviewTable from './DatasetsOverviewTable';
import LoadingComponentFull from '../common/LoadingComponentFullscreen';
import styled from 'styled-components';
import { Permissions } from '../../index';
import NoAccess from '../common/NoAccess';
import * as notify from '../common/notify';

const Wrapper = styled.div`
  margin: 24px 32px 32px 32px;
  background-color:#ffffff;
  border-radius:4px;
  min-width:512px;
`;

const Dataset = (props: any) => {
    const permissions = useContext(Permissions)
    const [datasets, setDatasets] = useState<any>();
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        getDatasets();
    }, []);

    const getDatasets = () => {
        getStandardDatasets().then((result: any) => {
            if (result) {
                setDatasets(result);
                console.log("result: ", result);
            }
            else {
                notify.show('danger', '500');
                console.log("Err");
            }
            setLoading(false);
        });
    }

    return (
        permissions.canAdministerDatasets ?
        <Wrapper>
            {loading && <LoadingComponentFull />}
            <DatasetsOverviewTable datasets={datasets} />
        </Wrapper> : <NoAccess />
    )
}

export default Dataset;
