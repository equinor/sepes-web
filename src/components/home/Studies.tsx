import React from 'react';
import StudyComponent from './StudyComponent';

const Studies = (props: any) => {
    return (
        <div>
            {props.studyList ? props.studyList.map(study => {
                return (<StudyComponent study={study} key={study.studyId} url={'/studies/' + study.id} />);
            }) : "No studies yet"}
        </div>
    )
}

export default Studies;
