/* eslint-disable react/jsx-fragments, no-shadow */
import React, { Fragment, useContext, useRef } from 'react';
import styled from 'styled-components';
import { TopBar, Icon, Tooltip, Button, Menu, Typography } from '@equinor/eds-core-react';
import NavTabs from './NavTabs';
import { UserConfig } from '../../index';
import { Link, useHistory } from 'react-router-dom';
import { account_circle, report_bug, exit_to_app } from '@equinor/eds-icons';
//import useClickOutside from '../common/customComponents/useClickOutside';
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
    background-color: #ffffff;
    padding: 16px;
    z-index: 99999;
    border-radius: 4px;
    box-shadow: 0 0 4px 4px #e7e7e7;
    text-align: center;
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
    const rightChoice = 'icons';
    //const [, setIsopen] = useState<boolean>(false);
    const wrapperRef = useRef(null);
    // useClickOutside(wrapperRef, setToggle);
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
                <Typography variant="h6">{user.getAllAccounts()[0] && user.getAllAccounts()[0].name}</Typography>
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
    /*
    const RIGHT_CHOICES = {
        none: null,
        text: '',
        icons: (
            <Icons>
                <Tooltip title="User" placement="left">
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
                </Tooltip>
            </Icons>
        )
    };
    */
    /*
    useEffect(() => {
        document.addEventListener('keydown', listener, false);
        return () => {
            document.removeEventListener('keydown', listener, false);
        };
    }, []);
    const listener = (e: any) => {
        if (e.key === 'Escape') {
            //setToggle(false);
        }
    };
*/
    return (
        <Wrapper>
            <TopBar style={{ position: 'initial' }}>
                <Header>{LEFT_CHOICES[leftChoice]}</Header>
                {CENTER_CHOICES[centerChoice]}
                {/*<Actions>{RIGHT_CHOICES[rightChoice]}</Actions>*/}
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
            {/*toggle && (
                <LogoutWrapper ref={wrapperRef}>
                    <div>{user.getAllAccounts()[0] && user.getAllAccounts()[0].name}</div>
                    <Divider color="medium" variant="small" />
                    <EquinorLink style={{ marginBottom: '8px' }} to="/releasenotes" onClick={onChangelogClick}>
                        Release Notes
                    </EquinorLink>
                    <div style={{ marginTop: '8px' }}>
                        <a
                            style={{ marginLeft: '0px' }}
                            href={requestChangeLink}
                            onClick={onChangelogClick}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LinkToReport>Report bug</LinkToReport>
                        </a>
                    </div>
                    <div style={{ marginBottom: '16px' }} />
                    <EquinorLink to="/" onClick={() => user.logoutRedirect()}>
                        Log Out
                    </EquinorLink>
                </LogoutWrapper>
            )*/}
        </Wrapper>
    );
};

export default Bar;
