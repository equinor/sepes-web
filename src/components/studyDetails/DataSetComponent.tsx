import React, { useState } from 'react';
import { Button, Tooltip } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { close } from '@equinor/eds-icons';
import { Icon } from '@equinor/eds-core-react';
import { Link, useHistory } from 'react-router-dom';
import { getDatasetList, addStudyDataset, removeStudyDataset } from '../../services/Api';
import { StudyObj } from '../common/interfaces';
import SearchWithDropdown from '../common/customComponents/SearchWithDropdown';
import DatasetsTable from './Tables/DatasetsTable';
import * as notify from '../common/notify';
import useFetch from '../common/hooks/useFetch';
import { PropertiesPlugin } from '@microsoft/applicationinsights-web';

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
    z-index: 99;
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
    const { setLoading } = useFetch(getDatasetList, setDatasetsList);

    const removeDataset = (row: any) => {
        const studyId = window.location.pathname.split('/')[2];
        setStudy({ ...study, datasets: study.datasets.filter((dataset: any) => dataset.id !== row.id) });
        setUpdateCache({ ...updateCache, ['study' + studyId]: true });
        removeStudyDataset(studyId, row.id).then((result: any) => {
            if (result && !result.Message) {
                //setStudy({...study, datasets: result.datasets });
            } else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log('Err');
            }
            setLoading(false);
        });
    };

    const redirectToStudySpecificDataset = () => {
        const studyId = window.location.pathname.split('/')[2];
        history.push('/studies/' + studyId + '/datasets');
    };

    const addDatasetToStudy = (row: any) => {
        setUpdateCache({ ...updateCache, ['study' + study.id]: true });
        setIsOpen(false);
        if (row && !checkIfDatasetIsAlreadyAdded(row.id)) {
            const studyId = window.location.pathname.split('/')[2];
            const datasetList: any = [...study.datasets];
            datasetList.push(row);
            setStudy({ ...study, datasets: datasetList });
            addStudyDataset(studyId, row.id).then((result: any) => {
                if (result && !result.Message) {
                    //setStudy({...study, datasets: result.datasets });
                } else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
                setLoading(false);
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
            <Bar>
                <div>
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
            <TableWrapper>
                <DatasetsTable
                    datasets={study.datasets}
                    removeDataset={removeDataset}
                    editMode
                    studyId={study.id}
                    disabled={study.permissions && !study.permissions.addRemoveDataset}
                />
            </TableWrapper>
        </Wrapper>
    );
};

export default DataSetComponent;
