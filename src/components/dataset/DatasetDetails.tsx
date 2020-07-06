import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Typography, TextField  } from '@equinor/eds-core-react';
import { DatasetObj } from '../common/interfaces';
import { getDataset } from '../../services/Api';

const Wrapper = styled.div`
    display: grid;
    grid-gap:16px;
    padding:32px;
    width:400px;
  `;

const datasetId = window.location.pathname.split('/')[5];

const DatasetDetails = (props: any) => {
    const [dataset, setDataset] = useState<DatasetObj>();
    const [loading, setLoading] = useState<boolean>();
    const [isSubscribed, setIsSubscribed] = useState<boolean>();

    useEffect(() => {
        setIsSubscribed(true);
        getStudyList();
        return () => setIsSubscribed(false);
    }, []);

    const getStudyList = () => {
        setLoading(true);
        getDataset(datasetId).then((result: any) => {
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

    return (
        <div>
            DatasetDetails page to name {dataset?.name}
        </div>
    )
}

export default DatasetDetails;
