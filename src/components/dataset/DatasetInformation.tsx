import React, { useState, useEffect } from 'react';
import { Icon, Button, DotProgress, Tooltip, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { bytesToSize, truncate } from '../common/helpers/helpers';
import { checkIfDeleteIsEnabled, handleScroll } from 'components/common/helpers/datasetHelpers';
import { Label } from '../common/StyledComponents';

const RightWrapper = styled.div`
    margin-top: 64px;
    display: grid;
    grid-gap: 16px;
    max-height: 660px;
`;

const StorageAccountWrapper = styled.div`
    margin-top: 7px;
    display: flex;
    color: #007079;
`;

type DatasetInformationProps = {
    storageAccountStatus: any;
    dataset: any;
    isStandard: boolean;
    setShowEditDataset: any;
    permissions: any;
    setUserClickedDelete: any;
};

const returnField = (fieldName) => {
    return (
        <Typography style={{ marginTop: '4px' }} variant="body_short">
            {fieldName || '-'}
        </Typography>
    );
};

const DatasetInformation: React.FC<DatasetInformationProps> = ({
    dataset,
    storageAccountStatus,
    isStandard,
    setShowEditDataset,
    permissions,
    setUserClickedDelete
}) => {
    const handleEditMetdata = () => {
        setShowEditDataset(true);
    };
    return (
        <RightWrapper>
            <div>
                <Label>Azure storage account</Label>
                {dataset?.storageAccountLink ? (
                    <a href={dataset?.storageAccountLink} target="_blank" rel="noopener noreferrer">
                        <StorageAccountWrapper>
                            <span style={{ marginRight: '8px' }}>{dataset?.storageAccountName}</span>
                            <Icon color="#007079" name="external_link" size={24} style={{ marginTop: '-6px' }} />
                        </StorageAccountWrapper>
                    </a>
                ) : (
                    <Tooltip title={storageAccountStatus} placement="top" style={{ marginTop: '4px' }}>
                        <DotProgress color="primary" style={{ marginRight: '8px' }} />
                    </Tooltip>
                )}
            </div>
            <div>
                <Label>Azure Location</Label>
                {returnField(dataset?.location)}
            </div>
            <div>
                <Label>Data classification</Label>
                {returnField(dataset?.classification)}
            </div>
            <div>
                <Label>LRA ID</Label>
                {returnField(dataset?.lraId)}
            </div>
            <div>
                <Label>Data ID</Label>
                {returnField(dataset?.dataId)}
            </div>
            <div>
                <Label>Source system</Label>
                {returnField(dataset?.sourceSystem)}
            </div>
            <div>
                <Label>BA data owner</Label>
                {returnField(dataset?.baDataOwner)}
            </div>
            <div>
                <Label>Asset</Label>
                {returnField(dataset?.asset)}
            </div>
            <div>
                <Label>Country of origin</Label>
                {returnField(dataset?.countryOfOrigin)}
            </div>
            <div>
                <Label>Area L1</Label>
                {returnField(dataset?.areaL1)}
            </div>
            <div>
                <Label>Area L2</Label>
                {returnField(dataset?.areaL2)}
            </div>
            <div>
                <div style={{ display: 'inline-block', marginRight: '8px' }}>
                    <Tooltip
                        title={
                            !(
                                (isStandard && permissions.canEdit_PreApproved_Datasets) ||
                                dataset.permissions?.editDataset
                            )
                                ? 'You do not have permission to edit metadata'
                                : ''
                        }
                        placement="top"
                    >
                        <Button
                            style={{ width: '150px' }}
                            variant="outlined"
                            onClick={handleEditMetdata}
                            data-cy="dataset_edit"
                            disabled={
                                !(
                                    (isStandard && permissions.canEdit_PreApproved_Datasets) ||
                                    dataset.permissions?.editDataset
                                )
                            }
                        >
                            Edit metadata
                        </Button>
                    </Tooltip>
                </div>
                {!isStandard && (
                    <div style={{ display: 'inline-block', marginTop: '8px' }}>
                        <Tooltip
                            title={
                                !(permissions.canEdit_PreApproved_Datasets || dataset.permissions?.deleteDataset)
                                    ? 'You do not have permission to edit metadata'
                                    : ''
                            }
                            placement="top"
                        >
                            <Button
                                style={{ width: '150px' }}
                                variant="outlined"
                                color="danger"
                                onClick={() => setUserClickedDelete(true)}
                                data-cy="dataset_delete"
                                disabled={
                                    !(
                                        (permissions.canEdit_PreApproved_Datasets && isStandard) ||
                                        dataset.permissions?.deleteDataset
                                    )
                                }
                            >
                                Delete data set
                            </Button>
                        </Tooltip>
                    </div>
                )}
            </div>
        </RightWrapper>
    );
};

export default DatasetInformation;
