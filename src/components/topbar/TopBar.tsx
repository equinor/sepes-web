/* eslint-disable react/jsx-fragments, no-shadow */
import React, { Fragment, useContext, useState } from 'react';
import styled from 'styled-components';
import { TopBar, Icon, Button, Menu, Typography, Dialog, TextField } from '@equinor/eds-core-react';
// import NavTabs from './NavTabs';
import { UserConfig, Permissions } from '../../index';
import { Link, useHistory } from 'react-router-dom';
import { requestChangeLink, documentationLink } from '../common/staticValues/commonLinks';
import { getEnvironment } from 'components/common/helpers/helpers';
import { comment_chat, exit_to_app, info_circle, report_bug, account_circle } from '@equinor/eds-icons';
import createEnquiry from 'services/serviceNowApiService';

export const environmentLabel = 'This is a non-production build. Data can and will be removed. Environment: ';

const { Header } = TopBar;
const Wrapper = styled.div`
    z-index: 99;
    top: 0;
    position: fixed;
    width: 100%;
    flex: 0 1 auto;
    margin-bottom: 32px;
    overflow: auto;
`;

const EnvironmentMessage = styled(Typography)`
    margin-left: 15px;
    margin-right: 15px;
    font-weight: 600;
    line-height: 36px;
    font-style: italic;
    color: #eb0000;
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

// const CENTER_CHOICES = {
//     none: null,
//     tabs: <NavTabs />,
//     text: ''
// };

const Bar = () => {
    const leftChoice = 'text+icon';
    // const centerChoice = 'tabs';
    const history = useHistory();
    const [state, setState] = useState<{
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
    const [description, setDescription] = useState('');
    const [isFeedbackDialogVisible, setIsFeedbackDialogVisible] = useState(false);
    const [isServiceNowRefDialogVisible, setIServiceNowRefDialogVisible] = useState(false);
    const [serviceNowReference, setServiceNowReference] = useState('');

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

    const listUserRoles = () => {
        const roles: string[] = [];
        if (permissions.admin) {
            roles.push('Admin');
        }
        if (permissions.sponsor) {
            roles.push('Sponsor');
        }
        if (permissions.datasetAdmin) {
            roles.push('Dataset admin');
        }
        return roles.join(', ');
    };

    const returnRolesListIfUserHasRoles = () => {
        const listWithUserRoles = listUserRoles();
        if (listWithUserRoles.length) {
            return <Typography variant="meta">Role(s): {listWithUserRoles}</Typography>;
        }
        return null;
    };

    const handleCloseFeedbackDialog = () => {
        setIsFeedbackDialogVisible(false);
    };

    const handleSendFeedback = () => {
        const category = 'incident';
        createEnquiry(category, description).then((response: any) => {
            setIsFeedbackDialogVisible(false);
            if (response.result.status === 'success') {
                setIServiceNowRefDialogVisible(true);
                setServiceNowReference(response.result.details.number);
            } else {
                console.log('Err');
            }
        });
    };

    const optionsTemplate = (
        <>
            <Menu.Item data-cy="top-bar-user-info" style={{ borderBottom: '1px solid #dcdcdc' }}>
                <div>
                    <Typography variant="h6">{permissions.fullName}</Typography>
                    <Typography variant="meta">{permissions.userName}</Typography>
                    {returnRolesListIfUserHasRoles()}
                </div>
            </Menu.Item>
            <Menu.Item onClick={() => redirectToLink('/releasenotes')}>
                <Icon
                    color="#6F6F6F"
                    style={{ cursor: 'pointer' }}
                    size={24}
                    className="icon"
                    title="Release notes"
                    data={info_circle}
                />
                Release notes
            </Menu.Item>
            <Menu.Item onClick={() => redirectToExternalLink(requestChangeLink)}>
                <Icon
                    color="#6F6F6F"
                    style={{ cursor: 'pointer' }}
                    size={24}
                    className="icon"
                    title="Release notes"
                    data={report_bug}
                />
                Report bug
            </Menu.Item>
            <Menu.Section title="">
                <Menu.Item onClick={() => user.logoutRedirect()}>
                    <Icon
                        color="#6F6F6F"
                        style={{ cursor: 'pointer' }}
                        size={24}
                        className="icon"
                        title="Log out"
                        data={exit_to_app}
                    />
                    <Typography group="navigation" variant="menu_title" as="span">
                        Log out
                    </Typography>
                </Menu.Item>
            </Menu.Section>
        </>
    );

    const environment = getEnvironment();
    return (
        <Wrapper>
            <TopBar data-cy="top-bar">
                <Header data-cy="home-link">{LEFT_CHOICES[leftChoice]}</Header>
                {/*CENTER_CHOICES[centerChoice]*/}
                {environment !== 'PROD' && environment !== 'MOCKUSER' && (
                    <EnvironmentMessage data-cy="environment-msg">
                        {environmentLabel} {environment}
                    </EnvironmentMessage>
                )}
                <TopBar.Actions>
                    <Button
                        id="openWiki"
                        variant="ghost"
                        style={{ marginLeft: '25px' }}
                        onClick={() => redirectToExternalLink(documentationLink)}
                        data-cy="documentation-link"
                    >
                        Documentation
                    </Button>
                    <Button data-cy="feedback-btn" id="sendFeedbackButton" variant="ghost" onClick={() => setIsFeedbackDialogVisible(true)}>
                        <Icon
                            style={{ cursor: 'pointer' }}
                            size={24}
                            color="#007079"
                            className="icon"
                            title="sendFeeback"
                            data={comment_chat}
                        />
                    </Button>
                    <Button
                        id="menuButton"
                        variant="ghost_icon"
                        onClick={(e) => (isOpen ? closeMenu() : openMenu(e, 'first'))}
                        data-cy="top-bar-menu-btn"
                    >
                        <Icon
                            style={{ cursor: 'pointer' }}
                            size={24}
                            color="#007079"
                            className="icon"
                            title="account"
                            data={account_circle}
                        />
                    </Button>
                    <Menu
                        id="menuButton"
                        aria-labelledby="menuButton"
                        open={isOpen}
                        onClose={closeMenu}
                        anchorEl={buttonEl}
                        focus={focus}
                        placement="bottom-start"
                        data-cy="top-bar-menu"
                    >
                        {optionsTemplate}
                    </Menu>
                </TopBar.Actions>
            </TopBar>
            <Dialog
                style={{ width: '500px', height: '370px' }}
                open={isFeedbackDialogVisible}
                isDismissable
                onClose={() => setIsFeedbackDialogVisible(!isFeedbackDialogVisible)}
                data-cy="feedback-dialog"
            >
                <Dialog.Header>
                    <Typography variant="h2">Feedback form</Typography>
                </Dialog.Header>
                <Dialog.Content>
                    <TextField
                        label="Description"
                        placeholder="Please provide a short description"
                        multiline
                        rows={7}
                        id="descriptionField"
                        style={{ resize: 'none' }}
                        onChange={(e) => setDescription(e.target.value)}
                        variant="default"
                        autoFocus
                    />
                    <Typography variant="caption" style={{ marginTop: '5px' }}>
                        Please note that your feedback will be sent to ServiceNow.
                    </Typography>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onClick={handleSendFeedback} disabled={!description} style={{ marginRight: '5px' }}>
                        Send
                    </Button>
                    <Button onClick={handleCloseFeedbackDialog} data-cy="feedback-cancel-btn" variant="ghost">
                        Cancel
                    </Button>
                </Dialog.Actions>
            </Dialog>
            <Dialog
                style={{ width: '450px', height: '250px' }}
                open={isServiceNowRefDialogVisible}
                isDismissable
                onClose={() => setIServiceNowRefDialogVisible(!isServiceNowRefDialogVisible)}
            >
                <Dialog.Header>Thank you for your feedback!</Dialog.Header>
                <Dialog.Content>
                    <Typography variant="body_short">
                        We have created a ServiceNow enquiry with the following task reference. You will receive an
                        email shortly. Please click the link to the task in the email to follow up in ServiceNow.
                    </Typography>
                    <Typography variant="body_short_bold" style={{ marginTop: '20px' }}>
                        {serviceNowReference}
                    </Typography>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onClick={() => setIServiceNowRefDialogVisible(false)}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Wrapper>
    );
};

export default Bar;
