import React, { useState, useEffect } from 'react';
import { Search, Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { close } from '@equinor/eds-icons';
import { Table, Icon } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { getDatasetList, addStudyDataset, removeStudyDataset } from '../../services/Api';
import { StudyObj } from '../common/interfaces';

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
    const [datasets, setDatasets] = useState<any>(props.study.datasets);
    const [searchValue, setSearchValue] = useState('');
    const [datasetsList, setDatasetsList] = useState<any>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const handleOnSearchValueChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
    }
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
                console.log("Err");
            }
            setLoading(false);
        });
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
                <Button variant="outlined">Add study specific data set</Button>
                <span style={{ textAlign: 'center' }}>or</span>
                <div
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <Search onChange={handleOnSearchValueChange} placeHolder="Add data set from catalogue" />
                    <div style={{ backgroundColor: '#ffffff', boxShadow: '2px 2px #E5E5E5', borderRadius: '4px' }}>
                    {(isOpen || searchValue) && datasetsList && datasetsList.map((row: any) => (
                        row.name.includes(searchValue) && !checkIfDatasetIsAlreadyAdded(row.id) ? <DatasetItem key={row.id} onClick={() => { addDatasetToStudy(row); }}>{row.name}</DatasetItem> : null
                    ))}
                    </div>
                </div>
            </Bar>
            <Link to="/" style={{ color: '#007079', float: 'right', marginLeft: 'auto' }}>Advanced search</Link>
            <div>
                <Table style={{ width: '100%' }}>
                    <Head>
                    <Row>
                        <Cell as="th" scope="col">Dataset</Cell>
                        <Cell style={{ width: '10px' }} as="th" scope="col" />
                    </Row>
                    </Head>
                    <Body>
                    {props.study.datasets && props.study.datasets.map((row) => (
                        <Row key={row.id}>
                        <Cell component="th" scope="row">{row.name}</Cell>
                        <Cell><Icon name="close" size={24} onClick={() => removeDataset(row)} /></Cell>
                        </Row>
                    ))}
                    </Body>
                </Table>
            </div>
        </Wrapper>
    )
}

export default DataSetComponent;
