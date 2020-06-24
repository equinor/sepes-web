import React, { useEffect, useState } from 'react';
import * as api from '../../services/Api';
import Studies from "./Studies";
import { Button } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../common/LoadingComponent';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 9fr minmax(100px,400px);
    grid-template-rows: 172px;
    width: 100%;
    grid-gap: 24px;
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
        <>
        {!loading ?
        <Wrapper>
            <Studies studyList={studyList} />
            <RightWrapper>
                <p>{mockText}</p>
                <Button style={{ margin: 'auto', width: '80%' }} onClick={() => { window.location.pathname = '/studies'; }}>New study</Button>
            </RightWrapper>
        </Wrapper> : <Loading />}
        </>
    )
}

export default Home;
