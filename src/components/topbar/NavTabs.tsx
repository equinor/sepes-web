import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { Tabs } from '@equinor/eds-core-react';
import { Permissions } from '../../index';

const { TabList, Tab } = Tabs;

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 400px;
`;

const NavTabs = (props: any) => {
    const history = useHistory();
    const permissions = useContext(Permissions);
    const getActiveTab = () => {
        const location = window.location.pathname;
        return !location.includes('datasets') ? 0 : 1;
    }

    const redirect = (e: any) => {
        return e === 0 ? history.push('/') : history.push('/datasets');
    }

    return (
        <Wrapper>
            <Tabs activeTab={getActiveTab()} onChange={(e: any) => redirect(e)} variant="fullWidth">
                <TabList>
                    <Tab>Studies</Tab>
                    <Tab disabled={!permissions.canAdministerDatasets}>Data sets</Tab>
                </TabList>
            </Tabs>
        </Wrapper>
    )
}

export default NavTabs;