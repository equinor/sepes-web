import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Typography, Tabs } from '@equinor/eds-core-react';
import { webAppChangelog, apiChangelog } from '../common/staticValues/commonLinks';

//const { TabList, Tab } = Tabs;

const Wrapper = styled.div`
    background-color: #ffffff;
    width: 100%;
`;

const divStyle = {
    gridAutoColumns: 'minmax(1%,1600px)'
};

const ReleaseNotes = () => {
    const [releaseNotesFrontend, setReleaseNotesFrontend] = useState<string>('');
    const [releaseNotesBackend, setReleaseNotesBackend] = useState<string>('');
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        getChangeLog(webAppChangelog, setReleaseNotesFrontend);
        getChangeLog(apiChangelog, setReleaseNotesBackend);
    });
    const getChangeLog = (url: string, setter): void => {
        fetch(url)
            .then((response) => {
                if (response.ok) return response.text();
                return '';
            })
            .then((text) => {
                setter(text);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeComponent = () => {
        switch (activeTab) {
            case 1:
                return (
                    <>
                        <Typography variant="body_short">
                            <ReactMarkdown skipHtml source={releaseNotesBackend} />
                        </Typography>
                    </>
                );
            default:
                return (
                    <>
                        <Typography variant="body_short">
                            <ReactMarkdown skipHtml source={releaseNotesFrontend} />
                        </Typography>
                    </>
                );
        }
    };

    return (
        <Wrapper>
            <Tabs activeTab={activeTab} variant="fullWidth" onChange={(e: any) => setActiveTab(e)}>
                <Tabs.List style={divStyle}>
                    <Tabs.Tab style={{ marginLeft: '32px' }}>Web App</Tabs.Tab>
                    <Tabs.Tab style={{ marginRight: '32px' }}>Api</Tabs.Tab>
                </Tabs.List>
            </Tabs>
            <div style={{ margin: '32px 32px 32px 32px' }}>{changeComponent()}</div>
        </Wrapper>
    );
};
//
export default ReleaseNotes;
