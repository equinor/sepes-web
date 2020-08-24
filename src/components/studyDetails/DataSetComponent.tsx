import React, { useState, useEffect } from 'react';
import { Search, Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { close } from '@equinor/eds-icons';
import { Table, Icon } from '@equinor/eds-core-react';
import { Link, useHistory } from 'react-router-dom';
import { getDatasetList, addStudyDataset, removeStudyDataset } from '../../services/Api';
import { StudyObj } from '../common/interfaces';
import SearchWithDropdown from '../common/customComponents/SearchWithDropdown';
import DatasetsTable from '../common//customComponents/DatasetsTable';
import * as notify from '../common/notify';

const { Body, Row, Cell, Head } = Table;
const icons = {
    close
};
Icon.add(icons);

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 20px 20px 1fr;
    grid-gap: 23px;
`;

const Bar = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.3fr 1fr;
    margin-left: 50%;
    z-index:99;
    @media (max-width: 768px) {
        margin-left: 0;
    }
`;

const DatasetItem = styled.div`
    margin-bottom: 10px;
    &:hover {
        background-color: #D5EAF4;
    }
`;

const DataSetComponent = (props: any) => {
    const history = useHistory();
    const [datasets, setDatasets] = useState<any>(props.study.datasets);
    const [datasetsList, setDatasetsList] = useState<any>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const removeDataset = (row:any) => {
        const studyId = window.location.pathname.split('/')[2];
        //Removing it on clientside, keeping it for now.
        //props.setStudy({...props.study, datasets: props.study.datasets.filter(dataset => dataset.id !== row.id) });
        removeStudyDataset(studyId, row.id).then((result: any) => {
            if (result) {
                props.setStudy({...props.study, datasets: result.datasets });
                console.log("result Datasets after delete: ", result);
            }
            else {
                notify.show('danger', '500');
                console.log("Err");
            }
            setLoading(false);
        });
    }

    const redirectToStudySpecificDataset = () => {
        const studyId = window.location.pathname.split('/')[2];
        history.push('/studies/' + studyId + '/datasets');
        //window.location.pathname = '/studies/' + studyId + '/datasets';
    }

    useEffect(() => {
        setIsSubscribed(true);
        getDatasets();
        return () => setIsSubscribed(false);
    }, []);

    const getDatasets = () => {
        setLoading(true);
        getDatasetList().then((result: any) => {
            if (isSubscribed) {
                setDatasetsList(result);
                console.log("resultDatasetLists: ", result);
            }
            else {
                notify.show('danger', '500');
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
                if (result) {
                    props.setStudy({...props.study, datasets: result.datasets });
                    console.log("resultDatasets: ", result);
                }
                else {
                    notify.show('danger', '500');
                    console.log("Err");
                }
                setLoading(false);
            });
        }
    }

    const checkIfDatasetIsAlreadyAdded = (id:string) => {
        let elementExist = false;
        props.study.datasets.forEach((element) => {
            if (element.id === id) {
                elementExist = true;
            }
        });
        return elementExist;
    }

    return (
        <Wrapper>
            <Bar>
                <Button variant="outlined" onClick={() => { redirectToStudySpecificDataset(); }}>Add study specific data set</Button>
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
                    />
                </div>
            </Bar>
            <Link to="/" style={{ color: '#007079', float: 'right', marginLeft: 'auto' }}>Advanced search</Link>
            <DatasetsTable
                datasets={props.study.datasets}
                removeDataset={removeDataset}
                editMode={true}
                studyId={props.study.id}
                />
        </Wrapper>
    )
}

export default DataSetComponent;
