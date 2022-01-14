import React, { useContext, useEffect, useState } from 'react';
import { Button, Tooltip } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { addStudyDataset, unlinkStudyDataset } from '../../services/Api';
import { StudyObj } from '../common/interfaces';
//import SearchWithDropdown from '../common/customComponents/SearchWithDropdown';
import DatasetsTable from './Tables/DatasetsTable';
//import { Permissions } from '../../index';
//import useFetchUrl from '../common/hooks/useFetchUrl';
import { getDatasetsInStudyUrl, getDatasetsUrl, getStudyByIdUrl } from '../../services/ApiCallStrings';
import { getStudyId } from '../../utils/CommonUtil';
import StandardDatasetFeatureToggle from '../common/constants/StudyFeatureToggle';
import { Permissions } from 'index';
import useFetchUrl from 'components/common/hooks/useFetchUrl';
import SearchWithDropdown from 'components/common/customComponents/SearchWithDropdown';

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 20px minmax(301px, 1fr);
    grid-gap: 23px;
`;
// Might have to change back when general datasets is added back
// grid-template-rows: 20px 20px minmax(299px, 1fr);

const TableWrapper = styled.div`
    margin-top: 32px;
    @media (max-width: 500px) {
        margin-top: 64px;
    }
`;
// This is needed for standard data set functionality
// const Bar = styled.div`
//     display: grid;
//     grid-template-columns: 1fr 0.3fr 296px;
//     margin-left: auto;
//     margin-top: 32px;
//     @media (max-width: 768px) {
//         margin-left: 0;
//         grid-template-columns: 1fr 0.3fr 1fr;
//     }
//     @media (max-width: 500px) {
//         grid-template-columns: 1fr;
//         grid-template-rows: 1fr 0.3fr 1fr;
//         grid-gap: 8px;
//     }
// `;

type DatasetComponentProps = {
    study: StudyObj;
    setStudy: any;
    setUpdateCache: any;
    updateCache: any;
    wbsIsValid: boolean | undefined;
    studySaveInProgress: boolean;
    onFallAddressBackChange: any;
};

const DataSetComponent: React.FC<DatasetComponentProps> = ({
    study,
    setStudy,
    setUpdateCache,
    updateCache,
    wbsIsValid,
    studySaveInProgress,
    onFallAddressBackChange
}) => {
    const history = useHistory();
    const [datasetsList, setDatasetsList] = useState<any>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const permissions = useContext(Permissions);
    const datasetsResponse = useFetchUrl(
        getDatasetsUrl(),
        setDatasetsList,
        permissions.canRead_PreApproved_Datasets && StandardDatasetFeatureToggle.AddDatasetToStudy
    );

    const [canCreateDataset, setCanCreateDataset] = useState<any>(false);
    const removeDataset = (row: any) => {
        const studyId = getStudyId();
        setStudy({ ...study, datasets: study.datasets.filter((dataset: any) => dataset.id !== row.id) });
        setUpdateCache({
            ...updateCache,
            [getStudyByIdUrl(studyId)]: true,
            [getDatasetsInStudyUrl(study.id)]: true
        });
        unlinkStudyDataset(studyId, row.id).then((result: any) => {
            if (result && result.message) {
                console.log('Err');
            }
            //datasetsResponse.setLoading(false);
        });
    };

    useEffect(() => {
        setCanCreateDataset(
            study.permissions &&
                study.permissions.addRemoveDataset &&
                study.wbsCode &&
                wbsIsValid &&
                !studySaveInProgress
        );
    }, [wbsIsValid, studySaveInProgress]);

    const redirectToStudySpecificDataset = () => {
        const studyId = getStudyId();
        const url = '/studies/' + studyId + '/datasets';
        history.push({
            pathname: url,
            state: {
                canCreateStudySpecificDataset: study.permissions.addRemoveDataset,
                canEditStudySpecificDataset: study.permissions.addRemoveDataset,
                datasets: study.datasets
            }
        });
    };

    const addDatasetToStudy = (row: any) => {
        setUpdateCache({ ...updateCache, [getStudyByIdUrl(study.id)]: true, [getDatasetsInStudyUrl(study.id)]: true });
        setIsOpen(false);
        if (row && !checkIfDatasetIsAlreadyAdded(row.id)) {
            const studyId = window.location.pathname.split('/')[2];
            const datasetList: any = [...study.datasets];
            datasetList.push(row);
            setStudy({ ...study, datasets: datasetList });
            addStudyDataset(studyId, row.id).then((result: any) => {
                if (result && result.message) {
                    console.log('Err');
                }
                datasetsResponse.setLoading(false);
            });
        }
    };
    const checkIfDatasetIsAlreadyAdded = (id: string) => {
        let elementExist = false;
        if (study.datasets) {
            study.datasets.forEach((element: any) => {
                if (element.id === id) {
                    elementExist = true;
                }
            });
        }
        return elementExist;
    };

    const returnTooltipText = () => {
        if (study.permissions && !study.permissions.addRemoveDataset) {
            return 'You do not have access to create a study specific data set';
        }
        if (!wbsIsValid) {
            return 'WBS code for study is invalid. Can not create data set';
        }
        return '';
    };

    return (
        <Wrapper>
            <div style={{ marginLeft: 'auto', marginTop: '32px', marginBottom: '8px' }}>
                <Tooltip title={canCreateDataset && wbsIsValid ? '' : returnTooltipText()} placement="left">
                    <Button
                        variant="outlined"
                        data-cy="add_study_specific_dataset"
                        onClick={() => {
                            redirectToStudySpecificDataset();
                        }}
                        disabled={!(canCreateDataset && wbsIsValid)}
                        data-testid="study_add_dataset"
                    >
                        Create study specific data set
                    </Button>
                </Tooltip>
            </div>
            {StandardDatasetFeatureToggle.AddDatasetToStudy && (
                <>
                    <span style={{ textAlign: 'center' }}>or</span>
                    <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                        <SearchWithDropdown
                            handleOnClick={addDatasetToStudy}
                            arrayList={datasetsList}
                            isOpen={isOpen}
                            filter={checkIfDatasetIsAlreadyAdded}
                            label="Add data set from catalogue"
                            disabled={study.permissions && !study.permissions.addRemoveDataset}
                        />
                    </div>

                    <Link
                        to="/datasets"
                        style={{ color: '#007079', float: 'right', marginLeft: 'auto', marginTop: '32px' }}
                    >
                        Advanced search
                    </Link>
                </>
            )}
            <TableWrapper style={{ marginTop: '44px' }}>
                <DatasetsTable
                    datasets={study.datasets}
                    removeDataset={removeDataset}
                    editMode
                    studyId={study.id}
                    disabled={study.permissions && study.permissions.addRemoveDataset}
                    onFallAddressBackChange={onFallAddressBackChange}
                />
            </TableWrapper>
        </Wrapper>
    );
};

export default DataSetComponent;
