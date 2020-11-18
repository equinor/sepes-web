import React, { Fragment, useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TopBar, Icon, Tooltip, Button } from '@equinor/eds-core-react';
import NavTabs from './NavTabs';
import { EquinorLink } from '../common/StyledComponents';
import { UserConfig } from '../../index';
import { Link } from 'react-router-dom';

import { account_circle } from '@equinor/eds-icons';
import useClickOutside from '../common/customComponents/useClickOutside';

const { Actions, Header } = TopBar;

const icons = {
    account_circle
};

Icon.add(icons);

const Wrapper = styled.div`
    overflow: auto;
`;

const Icons = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    > * {
        margin-left: 40px;
    }
`;

const LogoutWrapper = styled.div`
    position: absolute;
    right: 8px;
    background-color: #f7f7f7;
    padding: 16px;
    z-index: 99999;
    border-radius: 4px;
    box-shadow: 0 0 4px 4px #e7e7e7;
`;

const LEFT_CHOICES = {
    none: null,
    text: 'Sepes',
    'text+icon': (
        <Fragment>
            <Link to={'/'} style={{ color: '#000000', marginLeft: '16px' }}>
                Sepes
            </Link>
        </Fragment>
    )
};

const CENTER_CHOICES = {
    none: null,
    tabs: <NavTabs />,
    text: ''
};

const Bar = (props: any) => {
    const leftChoice = 'text+icon';
    const centerChoice = 'tabs';
    const rightChoice = 'icons';
    const [toggle, setToggle] = useState<boolean>(false);
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, setToggle);
    const user = useContext(UserConfig);
    const RIGHT_CHOICES = {
        none: null,
        text: '',
        icons: (
            <Icons>
                <Tooltip title="User" placement="left">
                    <Button variant="ghost_icon" onClick={() => setToggle(!toggle)}>
                        <Icon
                            name="account_circle"
                            style={{ cursor: 'pointer' }}
                            size={24}
                            color={'#007079'}
                            className="icon"
                            title="account"
                        />
                    </Button>
                </Tooltip>
            </Icons>
        )
    };

    useEffect(() => {
        document.addEventListener('keydown', listener, false);
        return () => {
            document.removeEventListener('keydown', listener, false);
        };
    }, []);
    const listener = (e: any) => {
        if (e.key === 'Escape') {
            setToggle(false);
        }
    };
    return (
        <Wrapper>
            <TopBar>
                <Header>{LEFT_CHOICES[leftChoice]}</Header>
                {CENTER_CHOICES[centerChoice]}
                <Actions>{RIGHT_CHOICES[rightChoice]}</Actions>
            </TopBar>
            {toggle && (
                <LogoutWrapper ref={wrapperRef}>
                    <div style={{ marginBottom: '8px' }}>{user.getAccount().name}</div>
                    <EquinorLink style={{ marginLeft: '48px' }} to="/" onClick={() => user.logout()}>
                        Log Out
                    </EquinorLink>
                </LogoutWrapper>
            )}
        </Wrapper>
    );
};

export default Bar;
