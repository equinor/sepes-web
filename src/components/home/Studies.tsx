import React, { useState } from 'react';
import StudyComponent from './StudyComponent';


const Studies = (props:any) => {
    
    return (
        <div>
            <StudyComponent name="test1" description= "test2"/>
            <StudyComponent name="test1" description= "test2"/>
            <StudyComponent name="test1" description= "test2"/>
            <StudyComponent name="test1" description= "test2"/>      
        </div>         
    )
}

export default Studies; 