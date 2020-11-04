import React, { useState, useContext } from 'react';
import { getStudyList, getResourceStatus } from '../../services/Api';
import Studies from "./Studies";
import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import LoadingFull from '../common/LoadingComponentFullscreen';
import { useHistory } from 'react-router-dom';
import { Permissions } from '../../index';
import useFetch from '../common/hooks/useFetch';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 9fr 400px;
    grid-template-rows: 172px;
    width: 100%;
    grid-gap: 48px;
    margin-Top: 24px;
    @media (max-width: 768px) {
        display: block;
    }
`;

const RightWrapper = styled.div`
    background-color: #D5EAF4;
    padding: 16px;
    border-Radius: 4px;
    margin-Right: 32px;
    @media (max-width: 768px) {
        display: block;
        margin: 0 32px 32px 32px;
    }
`;

let mockText = 'Sepes is great! You should use it and everyone else should as well! Take my word for it. Or someone elses word. It doesn’t really matter whos word it is.';

const Home = () => {
    const history = useHistory();
    const permissions = useContext(Permissions);
    const [studyList, setStudylist] = useState([]);
    const { loading } = useFetch(getStudyList, setStudylist, 'studies');

    return (
        <>
        <Wrapper>
            {!loading ? <Studies studyList={studyList} /> : <div><LoadingFull /></div> }
            <RightWrapper>
                <div>{mockText}</div>
                <div style={{ bottom: '16px' }}>
                    <Button
                        disabled={!permissions.canCreateStudy}
                        data-cy="new_study"
                        style={{ width: '100%', marginTop: '9px' }}
                        onClick={() => { history.push('/studies'); }}
                    >
                        New study
                    </Button>
                </div>
            </RightWrapper>
        </Wrapper>
        </>
    )
}

export default Home;
