import React, {useEffect, useState} from 'react';
import * as api from '../../services/Api';
import Studies from "./Studies";
import { Button, Card } from '@equinor/eds-core-react'

const Home = () => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [studyList, setStudyList] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    /* Commented out to prevent errors when testing on dev. Same as clicking button
    useEffect(() => {
        setIsSubscribed(true);
        getStudyList();
        return () => setIsSubscribed(false);
    }, []);
    */
    const getStudyList = () => {
        setLoading(true);
        api.callStudyList().then((result:any) => {
            if(isSubscribed){
                setStudyList(result);
                console.log("result: " + result)
            }
            else{
                console.log("Err");
            }
            setLoading(false);
        })
    }
    
    return (
        <>
        <h2>In Development</h2><button onClick={() => getStudyList()}>Send request to Back-End</button>Response: {studyList}
        <div style={{marginTop: "20px"}}>
            <div style={{width: "70%", float:"left"}}>
                <Studies />
            </div>
            <div style={{width: "29%", float:"right", padding:"10px"}}>
                <Button style={{width:"15em"}}>New study</Button>
            </div>
        </div>
        
        </>
    )
}

/*
<Card style={{backgroundColor: "#D5EAF4",, width: "20%", borderRadius: "4px"}}>

</Card>
*/
//const mockData = [{name: "study1"}, {name: "study2"}]

export default Home; 