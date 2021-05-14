/* eslint-disable react/jsx-fragments, no-shadow */
import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';
import { TopBar, Icon, Button, Menu, Typography } from '@equinor/eds-core-react';
import NavTabs from './NavTabs';
import { UserConfig, Permissions } from '../../index';
import { Link, useHistory } from 'react-router-dom';
import { account_circle, report_bug, exit_to_app } from '@equinor/eds-icons';
import { requestChangeLink } from '../common/staticValues/commonLinks';

const { MenuItem } = Menu;
const { Header } = TopBar;

const icons = {
    account_circle,
    report_bug,
    exit_to_app
};

Icon.add(icons);

const Wrapper = styled.div`
    overflow: auto;
`;

export const LinkToReport = styled.a`
    font-size: 14px;
    color: #007079;
    text-decoration-line: underline;
`;

const LEFT_CHOICES = {
    none: null,
    text: 'Sepes',
    'text+icon': (
        <Fragment>
            <Link to="/" style={{ color: '#000000', marginLeft: '16px' }}>
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
    const history = useHistory();

    const [state, setState] = React.useState<{
        buttonEl: any;
        focus: 'first' | 'last';
    }>({
        focus: 'first',
        buttonEl: null
    });
    const { buttonEl, focus } = state;
    const isOpen = Boolean(buttonEl);
    const user = useContext(UserConfig);
    const permissions = useContext(Permissions);

    const openMenu = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>,
        focus: 'first' | 'last'
    ) => {
        const target = e.target as HTMLButtonElement;
        setState({ ...state, buttonEl: target, focus });
    };

    const closeMenu = () => {
        setState({ ...state, buttonEl: null, focus });
    };

    const redirectToLink = (url: string) => {
        history.push(url);
    };

    const redirectToExternalLink = (url: string) => {
        window.open(url, '_blank');
    };

    const optionsTemplate = (
        <>
            <MenuItem style={{ borderBottom: '1px solid #dcdcdc' }}>
                <div>
                    <Typography variant="h6">{permissions.fullName}</Typography>
                    <Typography variant="meta">{permissions.userName}</Typography>
                </div>
            </MenuItem>
            <MenuItem onClick={() => redirectToLink('/releasenotes')}>
                <Icon
                    color="#6F6F6F"
                    name="info_circle"
                    style={{ cursor: 'pointer' }}
                    size={24}
                    className="icon"
                    title="Release notes"
                />
                Release notes
            </MenuItem>
            <MenuItem onClick={() => redirectToExternalLink(requestChangeLink)}>
                <Icon
                    color="#6F6F6F"
                    name="report_bug"
                    style={{ cursor: 'pointer' }}
                    size={24}
                    className="icon"
                    title="Release notes"
                />
                Report bug
            </MenuItem>
            <Menu.Section title="">
                <Menu.Item onClick={() => user.logoutRedirect()}>
                    <Icon
                        color="#6F6F6F"
                        name="exit_to_app"
                        style={{ cursor: 'pointer' }}
                        size={24}
                        className="icon"
                        title="Log out"
                    />
                    <Typography group="navigation" variant="menu_title" as="span">
                        Log out
                    </Typography>
                </Menu.Item>
            </Menu.Section>
        </>
    );

    return (
        <Wrapper>
            <TopBar style={{ position: 'initial' }}>
                <Header>{LEFT_CHOICES[leftChoice]}</Header>
                {CENTER_CHOICES[centerChoice]}
                <TopBar.Actions>
                    <Button
                        id="menuButton"
                        variant="ghost_icon"
                        onClick={(e) => (isOpen ? closeMenu() : openMenu(e, 'first'))}
                    >
                        <Icon
                            name="account_circle"
                            style={{ cursor: 'pointer' }}
                            size={24}
                            color="#007079"
                            className="icon"
                            title="account"
                        />
                    </Button>
                    <Menu
                        id="menuButton"
                        aria-labelledby="menuButton"
                        open={isOpen}
                        onClose={closeMenu}
                        anchorEl={buttonEl}
                        focus={focus}
                    >
                        {optionsTemplate}
                    </Menu>
                </TopBar.Actions>
            </TopBar>
        </Wrapper>
    );
};

export default Bar;
