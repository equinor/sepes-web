import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Tooltip } from '@equinor/eds-core-react';
import { DatasetObj, SandboxPermissions } from '../../common/interfaces';
import { deleteDatasetForSandbox, putDatasetForSandbox } from '../../../services/Api';
import * as notify from '../../common/notify';
import useFetchUrl from '../../common/hooks/useFetchUrl';
import { getDatasetsInSandboxUrl, getDatasetsInStudyUrl, getStudyByIdUrl } from '../../../services/ApiCallStrings';

const { Body, Row, Cell, Head } = Table;

type datasetProps = {
    datasets: any;
    sandboxId: string;
    updateCache: any;
    setUpdateCache: any;
    permissions: SandboxPermissions;
};

const Dataset: React.FC<datasetProps> = ({ datasets, sandboxId, updateCache, setUpdateCache, permissions }) => {
    const studyId = window.location.pathname.split('/')[2];
    const [datasetsInSandbox, setDatasetsInSandbox] = useState<any>([]);
    const [filteredDatasets, setFilteredDatasets] = useState<any>([]);
    useFetchUrl(getDatasetsInSandboxUrl(sandboxId), setDatasetsInSandbox);
    const filteredDatasetsResponse = useFetchUrl(getDatasetsInStudyUrl(studyId), setFilteredDatasets);
    useEffect(() => {
        checkIfDatasetsIsAdded();
    }, [datasetsInSandbox, filteredDatasetsResponse.loading]);

    const handleCheck = (evt: any, dataset: any) => {
        setUpdateCache({
            ...updateCache,
            [getStudyByIdUrl(studyId)]: true,
            [getDatasetsInSandboxUrl(sandboxId)]: true
        });
        const temp: any = [...filteredDatasets];
        temp[temp.indexOf(dataset)].added = evt.target.checked;
        setFilteredDatasets(temp);
        if (evt.target.checked) {
            putDatasetForSandbox(sandboxId, dataset.id).then((result: any) => {
                if (result && result.Message) {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
            });
        } else {
            deleteDatasetForSandbox(sandboxId, dataset.id).then((result: any) => {
                if (result && result.Message) {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
            });
        }
    };

    const checkIfDatasetsIsAdded = () => {
        let res: any = [...filteredDatasets];
        if (!filteredDatasetsResponse.loading && datasetsInSandbox.length === 0) {
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
                } else {
                    res[i].added = false;
                }
            }
        }
        setFilteredDatasets(res);
    };

    return (
        <Table style={{ width: '100%', marginBottom: '24px' }}>
            <Head>
                <Row>
                    <Cell as="th" scope="col">
                        Data sets in sandbox
                    </Cell>
                    <Cell as="th" scope="col">
                        {''}
                    </Cell>
                </Row>
            </Head>
            <Body>
                {datasets.length > 0 ? (
                    filteredDatasets.map((dataset: DatasetObj) => {
                        return (
                            <Row key={dataset.id}>
                                <Cell>
                                    <div style={{ paddingTop: '6px' }}>
                                        <span data-cy="add_dataset_to_sandbox">
                                            <Tooltip
                                                title={
                                                    permissions.update
                                                        ? ''
                                                        : 'You do not have access to update data sets in sandbox'
                                                }
                                                placement="top"
                                            >
                                                <Checkbox
                                                    checked={dataset.added}
                                                    label={dataset.name}
                                                    disabled={!permissions.update}
                                                    onChange={(e: any) => {
                                                        handleCheck(e, dataset);
                                                    }}
                                                />
                                            </Tooltip>
                                        </span>
                                    </div>
                                </Cell>
                                <Cell style={{ width: '32px' }}>{dataset.classification}</Cell>
                            </Row>
                        );
                    })
                ) : (
                    <Row key="1">
                        <Cell>
                            {filteredDatasetsResponse.loading ? 'loading data sets..' : 'No data sets in study'}
                        </Cell>
                        <Cell>{''}</Cell>
                    </Row>
                )}
            </Body>
        </Table>
    );
};

export default Dataset;
