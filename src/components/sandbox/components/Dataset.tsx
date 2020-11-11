import React, { useEffect, useState } from 'react';
import { Table, Checkbox } from '@equinor/eds-core-react';
import { DatasetObj } from '../../common/interfaces';
import { deleteDatasetForSandbox, getDatasetForSandbox, getDatasetsForStudy, putDatasetForSandbox } from '../../../services/Api';
import * as notify from '../../common/notify';
import useFetch from '../../common/hooks/useFetch';
const { Body, Row, Cell, Head } = Table;

type datasetProps = {
    datasets:any,
    sandboxId:string
  };

const Dataset: React.FC<datasetProps> = ({ datasets, sandboxId }) => {
    const studyId = window.location.pathname.split('/')[2];
    const [datasetsInSandbox, setDatasetsInSandbox] = useState<any>([]);
    const [filteredDatasets, setFilteredDatasets] = useState<any>([]);
    useFetch(getDatasetForSandbox, setDatasetsInSandbox, null, sandboxId);
    const {loading } = useFetch(getDatasetsForStudy, setFilteredDatasets, null, studyId);
    useEffect(() => {
        checkIfDatasetsIsAdded();
    },[datasetsInSandbox, loading])

    const handleCheck = (evt:any, dataset:any) => {
       const temp:any = [...filteredDatasets];
       temp[temp.indexOf(dataset)].added = evt.target.checked;
       setFilteredDatasets(temp);
        if (evt.target.checked) {

            putDatasetForSandbox(sandboxId, dataset.id).then((result: any) => {
                if (result && !result.Message) {}
                else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
            });
        }
        else {
            deleteDatasetForSandbox(sandboxId, dataset.id).then((result: any) => {
                if (result && !result.Message) {}
                else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
            });
        }
    }

    const checkIfDatasetsIsAdded = () => {
        let res:any = [...filteredDatasets];
        if (!loading && datasetsInSandbox.length === 0) {
            res = [...datasets];
            for (let i = 0; i < res.length; i++) {
                res[i].added = false;
            }
            return res;
        }

        for (let i = 0; i < filteredDatasets.length; i++) {
            for (let j = 0; j < datasetsInSandbox.length; j++) {
                if (filteredDatasets[i] && filteredDatasets[i].id === datasetsInSandbox[j].datasetId) {
                    res[i].added = true;
                    break;
                }
                else {
                    res[i].added = false;
                }
            }
        }
        setFilteredDatasets(res)
    }

    return (
        <Table style={{ width: '100%', marginBottom: '24px' }}>
                    <Head>
                    <Row>
                        <Cell as="th" scope="col">Data sets in sandbox</Cell>
                        <Cell as="th" scope="col">{""}</Cell>
                    </Row>
                    </Head>
                    <Body>
                        {datasets.length > 0 ? filteredDatasets.map((dataset:DatasetObj) => {
                            return(
                                <Row key={dataset.id}>
                                    <Cell component="th" scope="row">
                                    <div style={{ paddingTop: '6px' }}>
                                        <Checkbox
                                            checked={dataset.added}
                                            label={dataset.name}
                                            onChange={(e:any) => { handleCheck(e, dataset)}}
                                        />
                                    </div>
                                    </Cell>
                                    <Cell style={{ width: '32px' }}>{dataset.classification}</Cell>
                                </Row>
                            )
                        }):
                        <Row key="1">
                            <Cell component="th" scope="row">{loading ? 'loading data sets..' : 'No data sets in study'}</Cell>
                            <Cell component="th" scope="row">{""}</Cell>
                        </Row>}
                    </Body>
        </Table>
    )
}

export default Dataset;
