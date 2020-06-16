import React, { Fragment } from 'react';
import styled from 'styled-components';
import { TopBar, Icon } from '@equinor/eds-core-react';
import Logo from '../common/Logo';
import NavTabs from './NavTabs';

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

const RIGHT_CHOICES = {
    none: null,
    text: '',
    icons: (
        <Icons>
            <Icon name="account_circle" size={16} title="user" color={'#007079'} className='icon' />
        </Icons>
    ),
}

const Bar = (props:any) => {
    const leftChoice = 'text+icon';
    const centerChoice = 'tabs';
    const rightChoice = 'icons';

    return (
        <Wrapper>
            <TopBar>
                <Header>{LEFT_CHOICES[leftChoice]}</Header>
                {CENTER_CHOICES[centerChoice]}
                <Actions>{RIGHT_CHOICES[rightChoice]}</Actions>
            </TopBar>
        </Wrapper>
    )
}

export default Bar;