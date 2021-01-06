import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Tooltip } from '@equinor/eds-core-react';
import { AvailableDatasetObj, DatasetObj, SandboxPermissions } from '../../common/interfaces';
import { deleteDatasetForSandbox, putDatasetForSandbox } from '../../../services/Api';
import * as notify from '../../common/notify';
import useFetchUrl from '../../common/hooks/useFetchUrl';
import { getAvailableDatasetsUrl, getDatasetsInSandboxUrl, getStudyByIdUrl } from '../../../services/ApiCallStrings';

const { Body, Row, Cell, Head } = Table;

type datasetProps = {
    sandboxId: string;
    updateCache: any;
    setUpdateCache: any;
    permissions: SandboxPermissions;
};

const Dataset: React.FC<datasetProps> = ({ sandboxId, updateCache, setUpdateCache, permissions }) => {
    const studyId = window.location.pathname.split('/')[2];
    const [availableDatasets, setAvailableDatasets] = useState<any>([]);
    const availableDatasetsResponse = useFetchUrl(getAvailableDatasetsUrl(sandboxId), setAvailableDatasets);
    const [addDatasetInProgress, setAddDatasetInprogress] = useState<any>({});

    const handleCheck = (evt: any, dataset: AvailableDatasetObj) => {
        setAddDatasetInprogress({ ...addDatasetInProgress, [dataset.datasetId]: true });
        setUpdateCache({
            ...updateCache,
            [getStudyByIdUrl(studyId)]: true,
            [getDatasetsInSandboxUrl(sandboxId)]: true
        });
        if (evt.target.checked) {
            putDatasetForSandbox(sandboxId, dataset.datasetId).then((result: any) => {
                setAddDatasetInprogress({ [dataset.datasetId]: false });
                if (result && result.Message) {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                } else {
                }
            });
        } else {
            deleteDatasetForSandbox(sandboxId, dataset.datasetId).then((result: any) => {
                setAddDatasetInprogress({ [dataset.datasetId]: false });
                if (result && result.Message) {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
            });
        }
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
                {availableDatasets.length > 0 ? (
                    availableDatasets.map((dataset: AvailableDatasetObj) => {
                        return (
                            <Row key={dataset.datasetId}>
                                <Cell>
                                    <div style={{ paddingTop: '6px' }}>
                                        <span data-cy="add_dataset_to_sandbox">
                                            <Tooltip
                                                title={
                                                    permissions && permissions.update
                                                        ? ''
                                                        : 'You do not have access to update data sets in sandbox'
                                                }
                                                placement="top"
                                            >
                                                <Checkbox
                                                    defaultChecked={dataset.addedToSandbox}
                                                    label={dataset.name}
                                                    enterKeyHint="Add dataset to sandbox"
                                                    disabled={
                                                        (permissions && !permissions.update) ||
                                                        addDatasetInProgress[dataset.datasetId] === true
                                                    }
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
                            {availableDatasetsResponse.loading ? 'loading data sets..' : 'No data sets in study'}
                        </Cell>
                        <Cell>{''}</Cell>
                    </Row>
                )}
            </Body>
        </Table>
    );
};

export default Dataset;
