/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Checkbox, Tooltip } from '@equinor/eds-core-react';
import { AvailableDatasetObj, DatasetObj, SandboxObj } from '../../common/interfaces';
import { deleteDatasetForSandbox, putDatasetForSandbox } from '../../../services/Api';
import useFetchUrl from '../../common/hooks/useFetchUrl';
import {
    getAvailableDatasetsUrl,
    getDatasetsInSandboxUrl,
    getStudyByIdUrl
} from '../../../services/ApiCallStrings';
import '../../../styles/Table.scss';
import { getStudyId } from '../../../utils/CommonUtil';
import { truncate } from 'components/common/helpers/helpers';
import { returnTooltipTextDataset } from '../../common/helpers/sandboxHelpers';
import { useDispatch } from 'react-redux';
import { setSandboxInStore } from 'store/sandboxes/sandboxesSlice';

const SatusWrapper = styled.div`
    display: flex;
    margin-top: 4px;
`;

const { Body, Row, Cell, Head } = Table;

type DatasetProps = {
    sandboxId: string;
    updateCache: any;
    setUpdateCache: any;
    sandbox: SandboxObj;
    controller: AbortController;
};

const Dataset: React.FC<DatasetProps> = ({ sandboxId, updateCache, setUpdateCache, sandbox, controller }) => {
    const dispatch = useDispatch();
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
    const { permissions } = sandbox;

    const handleCheck = (evt: any, dataset: AvailableDatasetObj) => {
        setAddDatasetInprogress({ ...addDatasetInProgress, [dataset.datasetId]: true });
        setUpdateCache({
            ...updateCache,
            [getStudyByIdUrl(studyId)]: true,
            [getDatasetsInSandboxUrl(sandboxId)]: true,
            [getAvailableDatasetsUrl(sandboxId)]: true
        });

        if (evt.target.checked) {
            putDatasetForSandbox(sandboxId, dataset.datasetId).then((result: any) => {
                setAddDatasetInprogress({ [dataset.datasetId]: false });
                if (result && result.message) {
                    console.log('Err');
                } else {
                    const filteredDatasets = result.datasets.reduce((acc: DatasetObj[], value: AvailableDatasetObj) => {
                        if (value.addedToSandbox) {
                            acc.push({
                                ...value,
                                studyId,
                                studyName: sandbox.studyName,
                                permissions: {
                                    editDataset: false,
                                    deleteDataset: false
                                }
                            });
                        }
                        return acc;
                    }, []);
                    dispatch(
                        setSandboxInStore({
                            ...sandbox,
                            datasets: filteredDatasets,
                            restrictionDisplayText: result.restrictionDisplayText
                        })
                    );
                }
            });
        } else {
            deleteDatasetForSandbox(sandboxId, dataset.datasetId).then((result: any) => {
                setAddDatasetInprogress({ [dataset.datasetId]: false });
                if (result && result.message) {
                    console.log('Err');
                } else {
                    dispatch(
                        setSandboxInStore({
                            ...sandbox,
                            datasets: sandbox.datasets.filter((d: any) => d.datasetId !== dataset.datasetId),
                            restrictionDisplayText: result.restrictionDisplayText
                        })
                    );
                }
            });
        }
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
                                                title={returnTooltipTextDataset(dataset, permissions)}
                                                placement="right"
                                                enterDelay={500}
                                            >
                                                <span data-cy="add_dataset_to_sandbox">
                                                    <Checkbox
                                                        defaultChecked={dataset.addedToSandbox}
                                                        label={truncate(dataset.name, 32)}
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
