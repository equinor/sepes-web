/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Checkbox, Tooltip } from '@equinor/eds-core-react';
import { AvailableDatasetObj, SandboxObj, SandboxPermissions } from '../../common/interfaces';
import { deleteDatasetForSandbox, putDatasetForSandbox } from '../../../services/Api';
import useFetchUrl from '../../common/hooks/useFetchUrl';
import {
    getAvailableDatasetsUrl,
    getDatasetsInSandboxUrl,
    getSandboxByIdUrl,
    getStudyByIdUrl
} from '../../../services/ApiCallStrings';
import '../../../styles/Table.scss';
import { getStudyId } from 'utils/CommonUtil';
import { truncate } from 'components/common/helpers/helpers';

const SatusWrapper = styled.div`
    display: flex;
    margin-top: 4px;
`;

const { Body, Row, Cell, Head } = Table;

type datasetProps = {
    sandboxId: string;
    updateCache: any;
    setUpdateCache: any;
    permissions: SandboxPermissions;
    setSandbox: any;
    sandbox: SandboxObj;
    controller: AbortController;
};

const Dataset: React.FC<datasetProps> = ({
    sandboxId,
    updateCache,
    setUpdateCache,
    permissions,
    setSandbox,
    sandbox,
    controller
}) => {
    const studyId = getStudyId();
    const [availableDatasets, setAvailableDatasets] = useState<any>([]);
    const availableDatasetsResponse = useFetchUrl(
        getAvailableDatasetsUrl(sandboxId),
        setAvailableDatasets,
        true,
        controller,
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
                if (result && result.message) {
                    console.log('Err');
                } else {
                    const tempDatasets: any = sandbox.datasets;
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
                if (result && result.message) {
                    console.log('Err');
                } else {
                    const tempDatasets: any = sandbox.datasets;
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

    const returnTooltipTextDataset = (_dataset: AvailableDatasetObj) => {
        if (permissions && !permissions.update) {
            return 'You do not have access to update data sets in sandbox';
        }
        if (_dataset.name.length > 23) {
            return _dataset.name;
        }
        return '';
    };

    return (
        <div style={{ height: '331px', overflow: 'auto' }}>
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
                                        <SatusWrapper style={{ paddingBottom: '0px' }}>
                                            <Tooltip
                                                title={returnTooltipTextDataset(dataset)}
                                                placement="right"
                                                enterDelay={500}
                                            >
                                                <span data-cy="add_dataset_to_sandbox">
                                                    <Checkbox
                                                        defaultChecked={dataset.addedToSandbox}
                                                        label={truncate(dataset.name, 23)}
                                                        data-cy="add_dataset_to_sandbox_check"
                                                        disabled={
                                                            (permissions && !permissions.update) ||
                                                            addDatasetInProgress[dataset.datasetId] === true
                                                        }
                                                        onChange={(e: any) => {
                                                            handleCheck(e, dataset);
                                                        }}
                                                    />
                                                </span>
                                            </Tooltip>
                                        </SatusWrapper>
                                    </Cell>
                                    <Cell>
                                        <div>{dataset.classification}</div>
                                    </Cell>
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
        </div>
    );
};

export default Dataset;
