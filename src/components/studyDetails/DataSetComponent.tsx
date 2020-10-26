import React, { useState, useEffect } from 'react';
import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { close } from '@equinor/eds-icons';
import { Icon } from '@equinor/eds-core-react';
import { Link, useHistory } from 'react-router-dom';
import { getDatasetList, addStudyDataset, removeStudyDataset } from '../../services/Api';
import { StudyObj } from '../common/interfaces';
import SearchWithDropdown from '../common/customComponents/SearchWithDropdown';
import DatasetsTable from '../common//customComponents/DatasetsTable';
import * as notify from '../common/notify';

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
    grid-template-columns: 1fr 0.3fr 220px;
    margin-left: auto;
    z-index:99;
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
    study:StudyObj,
    setStudy:any
  };

const DataSetComponent: React.FC<StudyComponentFullProps> = ({ study, setStudy }) => {
    const history = useHistory();
    const [datasetsList, setDatasetsList] = useState<any>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const removeDataset = (row:any) => {
        const studyId = window.location.pathname.split('/')[2];
        //Removing it on clientside, keeping it for now.
        //props.setStudy({...props.study, datasets: props.study.datasets.filter(dataset => dataset.id !== row.id) });
        removeStudyDataset(studyId, row.id).then((result: any) => {
            if (result && !result.Message) {
                setStudy({...study, datasets: result.datasets });
                console.log("result Datasets after delete: ", result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
            }
            setLoading(false);
        });
    }

    const redirectToStudySpecificDataset = () => {
        const studyId = window.location.pathname.split('/')[2];
        history.push('/studies/' + studyId + '/datasets');
    }

    useEffect(() => {
        setIsSubscribed(true);
        getDatasets();
        return () => setIsSubscribed(false);
    }, []);

    const getDatasets = () => {
        setLoading(true);
        getDatasetList().then((result: any) => {
            if (isSubscribed && !result.Message) {
                setDatasetsList(result);
                console.log("resultDatasetLists: ", result);
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
            }
            setLoading(false);
        });
    };

    const addDatasetToStudy = (row:any) => {
        setIsOpen(false);
        if (row && !checkIfDatasetIsAlreadyAdded(row.id)) {
            const studyId = window.location.pathname.split('/')[2];
            //Removing it on clientside. Keep it here for now.
            //let list = props.study.datasets;
            //list.push(row);
            //props.setStudy({...props.study, datasets: list});
            addStudyDataset(studyId, row.id).then((result: any) => {
                if (result && !result.Message) {
                    setStudy({...study, datasets: result.datasets });
                    console.log("resultDatasets: ", result);
                }
                else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
                setLoading(false);
            });
        }
    }

    const checkIfDatasetIsAlreadyAdded = (id:string) => {
        let elementExist = false;
        study.datasets.forEach((element:any) => {
            if (element.id === id) {
                elementExist = true;
            }
        });
        return elementExist;
    }

    return (
        <Wrapper>
            <Bar>
                <Button
                    variant="outlined"
                    data-cy="add_study_specific_dataset"
                    onClick={() => { redirectToStudySpecificDataset(); }}
                >
                        Create study specific data set
                </Button>
                <span style={{ textAlign: 'center' }}>or</span>
                <div
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <SearchWithDropdown
                        handleOnClick={addDatasetToStudy}
                        arrayList={datasetsList}
                        isOpen={isOpen}
                        filter={checkIfDatasetIsAlreadyAdded}
                        label="Add data set from catalogue"
                    />
                </div>
            </Bar>
            <Link to="/datasets" style={{ color: '#007079', float: 'right', marginLeft: 'auto', marginTop: '32px' }}>Advanced search</Link>
            <TableWrapper>
                <DatasetsTable
                    datasets={study.datasets}
                    removeDataset={removeDataset}
                    editMode
                    studyId={study.id}
                />
            </TableWrapper>
        </Wrapper>
    )
}

export default DataSetComponent;
