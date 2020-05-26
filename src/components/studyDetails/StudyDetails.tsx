import React from 'react';

const StudyDetails = () => {
    return <h2>Study details of study with Id {window.location.pathname.split('/')[2]}</h2>;
};

export default StudyDetails;
