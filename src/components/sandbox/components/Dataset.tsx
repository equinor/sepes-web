import React, { useState } from 'react';
import { Table, Checkbox, Tooltip } from '@equinor/eds-core-react';
import { AvailableDatasetObj, SandboxObj, SandboxPermissions } from '../../common/interfaces';
import { deleteDatasetForSandbox, putDatasetForSandbox } from '../../../services/Api';
import * as notify from '../../common/notify';
import useFetchUrl from '../../common/hooks/useFetchUrl';
import {
    getAvailableDatasetsUrl,
    getDatasetsInSandboxUrl,
    getSandboxByIdUrl,
    getStudyByIdUrl
} from '../../../services/ApiCallStrings';
import '../../../styles/Table.scss';

const { Body, Row, Cell, Head } = Table;

type datasetProps = {
    sandboxId: string;
    updateCache: any;
    setUpdateCache: any;
    permissions: SandboxPermissions;
    setSandbox: any;
    sandbox: SandboxObj;
};

const Dataset: React.FC<datasetProps> = ({
    sandboxId,
    updateCache,
    setUpdateCache,
    permissions,
    setSandbox,
    sandbox
}) => {
    const studyId = window.location.pathname.split('/')[2];
    const [availableDatasets, setAvailableDatasets] = useState<any>([]);
    const availableDatasetsResponse = useFetchUrl(
        getAvailableDatasetsUrl(sandboxId),
        setAvailableDatasets,
        true,
        false
    );
    const [addDatasetInProgress, setAddDatasetInprogress] = useState<any>({});

    const handleCheck = (evt: any, dataset: AvailableDatasetObj) => {
        setAddDatasetInprogress({ ...addDatasetInProgress, [dataset.datasetId]: true });
        setUpdateCache({
            ...updateCache,
            [getStudyByIdUrl(studyId)]: true,
            [getDatasetsInSandboxUrl(sandboxId)]: true,
            [getAvailableDatasetsUrl(sandboxId)]: true,
            [getSandboxByIdUrl(sandboxId)]: true
        });
        if (evt.target.checked) {
            putDatasetForSandbox(sandboxId, dataset.datasetId).then((result: any) => {
                setAddDatasetInprogress({ [dataset.datasetId]: false });
                if (result && result.Message) {
                    notify.show('danger', '500', result);
                    console.log('Err');
                } else {
                    let tempDatasets: any = sandbox.datasets;
                    tempDatasets.push(dataset.datasetId);
                    setSandbox({
                        ...sandbox,
                        datasets: tempDatasets,
                        restrictionDisplayText: result.restrictionDisplayText
                    });
                }
            });
        } else {
            deleteDatasetForSandbox(sandboxId, dataset.datasetId).then((result: any) => {
                setAddDatasetInprogress({ [dataset.datasetId]: false });
                if (result && result.Message) {
                    notify.show('danger', '500', result);
                    console.log('Err');
                } else {
                    let tempDatasets: any = sandbox.datasets;
                    tempDatasets.splice(tempDatasets.indexOf(dataset.datasetId), 1);
                    setSandbox({
                        ...sandbox,
                        datasets: tempDatasets,
                        restrictionDisplayText: result.restrictionDisplayText
                    });
                }
            });
        }
    };

    return (
        <Table style={{ width: '100%', marginBottom: '24px' }}>
            <Head>
                <Row>
                    <Cell scope="col">Data sets in sandbox</Cell>
                    <Cell scope="col">{''}</Cell>
                </Row>
            </Head>
            <Body>
                {availableDatasets.datasets && availableDatasets.datasets.length > 0 ? (
                    availableDatasets.datasets.map((dataset: AvailableDatasetObj) => {
                        return (
                            <Row key={dataset.datasetId} id="tableRowNoPointerNoColor">
                                <Cell>
                                    <div style={{ paddingTop: '6px' }}>
                                        <span data-cy="add_dataset_to_sandbox">
                                            <Tooltip
                                                title={
                                                    permissions && permissions.update
                                                        ? ''
                                                        : 'You do not have access to update data sets in sandbox'
                                                }
                                                placement="right"
                                            >
                                                <Checkbox
                                                    defaultChecked={dataset.addedToSandbox}
                                                    label={dataset.name}
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
                    <Row key="1" id="tableRowNoPointerNoColor">
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
