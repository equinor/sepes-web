import React, { useState, useEffect } from 'react';
import { Button } from '@equinor/eds-core-react';
import { getStandardDatasets } from '../../services/Api';
import DatasetsOverviewTable from '../common/customComponents/DatasetsOverviewTable';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 32px;
  background-color:#ffffff;
  border-radius:4px;
  min-width:512px;
`;

const Dataset = (props: any) => {
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
                console.log("Err");
            }
            setLoading(false);
        });
    }

    return (
        <Wrapper>
            <DatasetsOverviewTable datasets={datasets} />
        </Wrapper>
    )
}

export default Dataset;
