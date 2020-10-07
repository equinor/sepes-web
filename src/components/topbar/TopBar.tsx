import React, { Fragment, useState, useContext } from 'react';
import styled from 'styled-components';
import { TopBar, Icon } from '@equinor/eds-core-react';
import Logo from '../common/Logo';
import NavTabs from './NavTabs';
import { EquinorLink } from '../common/StyledComponents';
import { UserConfig } from '../../index';

import {
    account_circle
} from '@equinor/eds-icons'

const { Actions, Header } = TopBar;

const icons = {
    account_circle
}

Icon.add(icons);

const Wrapper = styled.div`
  overflow: auto;
`

const Icons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  > * {
    margin-left: 40px;
  }
`

const LogoutWrapper = styled.div`
    position:absolute;
    right: 8px;
    background-color:#F7F7F7;
    padding:16px;
    z-index:99999;
    border-radius:4px;
    box-shadow: 0 0 4px 4px #E7E7E7;
`;

const LEFT_CHOICES = {
    none: null,
    icon: <Logo />,
    text: 'Sepes',
    'text+icon': (
        <Fragment>
            <Logo />
            Sepes
        </Fragment>
    ),
}

const CENTER_CHOICES = {
    none: null,
    tabs: (
        <NavTabs />
    ),
    text: '',
}



const Bar = (props:any) => {
    const leftChoice = 'text+icon';
    const centerChoice = 'tabs';
    const rightChoice = 'icons';
    const [toggle, setToggle] = useState<boolean>(false);
    const user = useContext(UserConfig);

    const RIGHT_CHOICES = {
        none: null,
        text: '',
        icons: (
            <Icons>
                <Icon name="account_circle" style={{ cursor: 'pointer' }} onClick={() => setToggle(!toggle)} size={24} color={'#007079'} className='icon' />
            </Icons>
        ),
    }

    return (
        <Wrapper>
            <TopBar>
                <Header>{LEFT_CHOICES[leftChoice]}</Header>
                {CENTER_CHOICES[centerChoice]}
                <Actions>{RIGHT_CHOICES[rightChoice]}</Actions>
            </TopBar>
            {toggle &&
            <LogoutWrapper>
                <div style={{ marginBottom: '8px' }}>{user.getAccount().name}</div>
                <EquinorLink style={{ marginLeft: '48px' }} to="/" onClick={() => user.logout()}>Log Out</EquinorLink>
            </LogoutWrapper>}
        </Wrapper>
    )
}

export default Bar;