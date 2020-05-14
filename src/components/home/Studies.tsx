import React, { useState } from 'react';
import StudyComponent from './StudyComponent';


const Studies = (props:any) => {
    console.log("Studylist", props.studyList, )
    return (
        <div>
            {props.studyList ? props.studyList.map(study => {
                return (<StudyComponent name={study.studyName} description= "test2"/>);
            }): "No studies yet"}     
        </div>         
    )
}

export default Studies; 