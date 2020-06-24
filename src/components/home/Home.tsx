import React, { useEffect, useState } from 'react';
import * as api from '../../services/Api';
import Studies from "./Studies";
import { Button } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../common/LoadingComponent'

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 9fr minmax(100px,400px);
    grid-template-rows: 142px;
    width: 100%;
    grid-gap: 20px;
    margin-Top: 20px;
`;

const Home = () => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [studyList, setStudyList] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsSubscribed(true);
        getStudyList();
        return () => setIsSubscribed(false);
    }, []);

    const getStudyList = () => {
        setLoading(true);
        api.getStudyList().then((result: any) => {
            if (isSubscribed) {
                setStudyList(result);
                console.log("result: ", result)
            }
            else {
                console.log("Err");
            }
            setLoading(false);
        })
    }

    return (
        <> {!loading ?
        <Wrapper>
            <Studies studyList={studyList} />
            <Button onClick={() => { window.location.pathname = '/studies'; }} style={{ marginRight: '20px' }}>New study</Button>
        </Wrapper> : <Loading />}
        </>
    )
}

export default Home;
