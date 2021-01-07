import React, { useState, useContext } from 'react';
import { Button, Tooltip } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { close } from '@equinor/eds-icons';
import { Icon } from '@equinor/eds-core-react';
import { Link, useHistory } from 'react-router-dom';
import { getDatasetList, addStudyDataset, removeStudyDataset, unlinkStudyDataset } from '../../services/Api';
import { StudyObj } from '../common/interfaces';
import SearchWithDropdown from '../common/customComponents/SearchWithDropdown';
import DatasetsTable from './Tables/DatasetsTable';
import * as notify from '../common/notify';
import { Permissions } from '../../index';
import useFetchUrl from '../common/hooks/useFetchUrl';
import { getDatasetsInStudyUrl, getDatasetsUrl, getStudyByIdUrl } from '../../services/ApiCallStrings';

const icons = {
    close
};
Icon.add(icons);

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 20px 20px minmax(299px, 1fr);
    grid-gap: 23px;
`;

const TableWrapper = styled.div`
    margin-top: 32px;
    @media (max-width: 500px) {
        margin-top: 64px;
    }
`;

const Bar = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.3fr 296px;
    margin-left: auto;
    margin-top: 32px;
    @media (max-width: 768px) {
        margin-left: 0;
        grid-template-columns: 1fr 0.3fr 1fr;
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 0.3fr 1fr;
        grid-gap: 8px;
    }
`;

type StudyComponentFullProps = {
    study: StudyObj;
    setStudy: any;
    setUpdateCache: any;
    updateCache: any;
};

const DataSetComponent: React.FC<StudyComponentFullProps> = ({ study, setStudy, setUpdateCache, updateCache }) => {
    const history = useHistory();
    const [datasetsList, setDatasetsList] = useState<any>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const permissions = useContext(Permissions);
    const datasetsResponse = useFetchUrl(getDatasetsUrl(), setDatasetsList, permissions.canRead_PreApproved_Datasets);
    const removeDataset = (row: any) => {
        const studyId = window.location.pathname.split('/')[2];
        setStudy({ ...study, datasets: study.datasets.filter((dataset: any) => dataset.id !== row.id) });
        setUpdateCache({
            ...updateCache,
            [getStudyByIdUrl(studyId)]: true,
            [getDatasetsInStudyUrl(study.id)]: true
        });
        unlinkStudyDataset(studyId, row.id).then((result: any) => {
            if (result && result.Message) {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log('Err');
            }
            datasetsResponse.setLoading(false);
        });
    };

    const redirectToStudySpecificDataset = () => {
        const studyId = window.location.pathname.split('/')[2];
        history.push({
            pathname: '/studies/' + studyId + '/datasets',
            state: {
                canCreateStudySpecificDataset: study.permissions.addRemoveDataset,
                canEditStudySpecificDataset: study.permissions.addRemoveDataset
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
                if (result && result.Message) {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
                datasetsResponse.setLoading(false);
            });
        }
    };

    const checkIfDatasetIsAlreadyAdded = (id: string) => {
        let elementExist = false;
        study.datasets &&
            study.datasets.forEach((element: any) => {
                if (element.id === id) {
                    elementExist = true;
                }
            });
        return elementExist;
    };

    return (
        <Wrapper>
            {/*<Bar>*/}
            <div style={{ marginLeft: 'auto', marginTop: '32px', marginBottom: '8px' }}>
                <Tooltip
                    title={
                        study.permissions && study.permissions.addRemoveDataset
                            ? ''
                            : 'You do not have access to create a study specific data set'
                    }
                    placement="top"
                >
                    <Button
                        variant="outlined"
                        data-cy="add_study_specific_dataset"
                        onClick={() => {
                            redirectToStudySpecificDataset();
                        }}
                        disabled={study.permissions && !study.permissions.addRemoveDataset}
                    >
                        Create study specific data set
                    </Button>
                </Tooltip>
            </div>
            {/* 
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
                
            </Bar>
            <Link to="/datasets" style={{ color: '#007079', float: 'right', marginLeft: 'auto', marginTop: '32px' }}>
                Advanced search
            </Link>
            */}
            <TableWrapper style={{ marginTop: '44px' }}>
                <DatasetsTable
                    datasets={study.datasets}
                    removeDataset={removeDataset}
                    editMode
                    studyId={study.id}
                    disabled={study.permissions && study.permissions.addRemoveDataset}
                />
            </TableWrapper>
        </Wrapper>
    );
};

export default DataSetComponent;
