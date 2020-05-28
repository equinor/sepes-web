import React, { useEffect, useState } from 'react';
import * as api from '../../services/Api';
import Studies from "./Studies";
import { Button } from '@equinor/eds-core-react'
import styled from 'styled-components';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 9fr 3fr;
    grid-template-rows: 142px;
    width: 100%;
    grid-gap: 20px;
    margin-Top: 20px;
`;

const Home = () => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [studyList, setStudyList] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Commented out to prevent errors when testing on dev. Same as clicking button

    useEffect(() => {
        setIsSubscribed(true);
        getStudyList();
        return () => setIsSubscribed(false);
    }, []);

    const getStudyList = () => {
        setLoading(true);
        api.callStudyList().then((result: any) => {
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
        <Wrapper>
            <Studies studyList={studyList} />
            <Button style={{ marginRight: '20px' }}>New study</Button>
        </Wrapper>
    )
}

/*
<>
                <div style={{ marginTop: "20px" }}>
                    <div style={{ width: "70%", float: "left" }}>
                        <Studies studyList={studyList} />
                    </div>
                    <div style={{ width: "29%", float: "right", padding: "10px" }}>
                        <button style={{ width: "15em" }}>New study</button>
                    </div>
                </div>

            </>


            <h2>In Development</h2><button onClick={() => getStudyList()}>Send request to Back-End</button>Response: {studyList}
            <Card style={{ backgroundColor: "#D5EAF4",, width: "20%", borderRadius: "4px"}}>

</Card>
        * /}
//const mockData = [{name: "study1"}, {name: "study2"}]
*/
export default Home; 