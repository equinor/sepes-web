import React from 'react';
import StudyComponent from './StudyComponent';
import { StudyObj } from '../common/interfaces';

const Studies = (props: any) => {
    return (
        <div>
            {props.studyList ? props.studyList.map((study:StudyObj) => {
                return (<StudyComponent study={study} key={study.id} />);
            }) : 'No studies yet'}
        </div>
    )
}

export default Studies;
