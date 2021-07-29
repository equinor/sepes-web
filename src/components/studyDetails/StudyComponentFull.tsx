/*eslint-disable no-shadow, react/jsx-curly-newline */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, TextField, Icon, Tooltip, Menu, Typography, DotProgress } from '@equinor/eds-core-react';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { dollar, visibility, visibility_off, business, settings, info_circle } from '@equinor/eds-icons';
import { StudyObj } from '../common/interfaces';
import { createStudy, updateStudy, closeStudy, validateWbsCode } from '../../services/Api';
import AddImageAndCompressionContainer from '../common/upload/ImageDropzone';
import CustomLogoComponent from '../common/customComponents/CustomLogoComponent';
import {
    checkIfRequiredFieldsAreNull,
    returnAllowedLengthOfString,
    returnLimitMeta,
    returnTextfieldTypeBasedOninput,
    truncate
} from '../common/helpers/helpers';
import { validateUserInputStudy } from '../common/helpers/studyHelpers';
import { useHistory } from 'react-router-dom';
import { Label } from '../common/StyledComponents';
import Loading from '../common/LoadingComponent';
import DeleteResourceComponent from '../common/customComponents/DeleteResourceComponent';
import { getStudiesUrl, getStudyByIdUrl } from '../../services/ApiCallStrings';

const icons = {
    dollar,
    visibility,
    visibility_off,
    business,
    settings,
    info_circle
};
Icon.add(icons);

const TitleText = styled.span`
    font-size: 28px;
    margin-bottom: 8px;
`;

const DescriptionWrapper = styled.div`
    margin: auto;
    margin-left: 0px;
    margin-right: 48px;
    @media (max-width: 768px) {
        padding: 8px 0 8px 0;
        margin-right: 0px;
        margin-left: 0px;
        order: 3;
        min-width: 424px;
    }
`;

const DescriptioTextfieldnWrapper = styled.div`
    margin: auto 0 auto 32px;
    @media (max-width: 768px) {
        margin-left: 0px;
        width: 50%;
        float: right;
    }
    @media (max-width: 480px) {
        margin-left: 0px;
        width: 100%;
        float: right;
    }
`;

const SmallText = styled.span`
    font-size: 10px;
    margin-top: 8px;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(196px, 296px) minmax(300px, 4fr) 170px;
    width: 100%;
    @media (max-width: 768px) {
        display: inline-flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: center;
        gap: 16px;
    }
`;

const RightWrapper = styled.div<{ editMode: any }>`
    margin-top: ${(props: any) => (props.editMode ? '48px' : '0px')};
    @media (max-width: 768px) {
        margin-top: 0px;
        margin-left: auto;
    }
    @media (max-width: 768px) {
        margin-top: 0px;
        margin-left: auto;
    }

    @media (max-width: 468px) {
        margin-left: ${(props: any) => (props.editMode ? 'auto' : '0px')};
    }
`;

const TitleWrapper = styled.div<{ editMode: any }>`
    display: grid;
    font-size: 10px;
    grid-gap: ${(props: any) => (props.editMode ? '16px' : '0px')};
`;

const SmallIconWrapper = styled.div`
    display: grid;
    grid-template-columns: 30px 1fr;
`;

const SaveCancelWrapper = styled.div`
    display: grid;
    grid-template-columns: 80px 80px;
    grid-gap: 8px;
`;

const PictureWrapper = styled.div<{ editMode: any }>`
    margin-left: 44px;
    @media (max-width: 768px) {
        margin-left: ${(props: any) => (props.editMode ? '44px' : '0px')};
    }
`;

const limits = {
    description: 500,
    name: 128,
    vendor: 128,
    wbsCode: 64
};

const truncateLength = 48;
let wbsController = new AbortController();

type StudyComponentFullProps = {
    study: StudyObj;
    newStudy: boolean;
    setNewStudy: any;
    setLoading: any;
    loading: boolean;
    setStudy: any;
    setHasChanged: any;
    hasChanged: boolean;
    cache: any;
    setUpdateCache: any;
    updateCache: any;
    setDeleteStudyInProgress: any;
    setWbsIsValid: any;
    wbsIsValid: boolean | undefined;
};

const StudyComponentFull: React.FC<StudyComponentFullProps> = ({
    study,
    newStudy,
    setNewStudy,
    setLoading,
    loading,
    setStudy,
    setHasChanged,
    hasChanged,
    cache,
    setUpdateCache,
    updateCache,
    setDeleteStudyInProgress,
    setWbsIsValid,
    wbsIsValid
}) => {
    const history = useHistory();
    const { id, logoUrl, name, description, wbsCode, vendor, restricted } = study;
    const [studyOnChange, setStudyOnChange] = useState<StudyObj>(study);
    const [editMode, setEditMode] = useState<boolean>(newStudy);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const [showImagePicker, setShowImagePicker] = useState<boolean>(false);
    const [userPressedCreate, setUserPressedCreate] = useState<boolean>(false);
    const [wbsOnChangeIsValid, setWbsOnChangeIsValid] = useState<boolean | undefined>(undefined);
    const [validateWbsInProgress, setValidateWbsInProgress] = useState<boolean>(false);

    const [state, setState] = React.useState<{
        buttonEl: any;
        focus: 'first' | 'last';
    }>({
        focus: 'first',
        buttonEl: null
    });
    const { buttonEl, focus } = state;
    const isOpen = Boolean(buttonEl);
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

    useEffect(() => {
        if (!newStudy && !studyOnChange.id) {
            setStudyOnChange(study);
        }
        document.addEventListener('keydown', listener, false);
        return () => {
            document.removeEventListener('keydown', listener, false);
        };
    }, [studyOnChange, study]);

    useEffect(() => {
        if (validateWbsInProgress) {
            wbsController.abort();
            wbsController = new AbortController();
        }

        const timeoutId = setTimeout(() => {
            if (hasChanged) {
                validateWbsOnChange(studyOnChange.wbsCode);
            }
        }, 500);
        return () => {
            setHasChanged(false);
            setWbsOnChangeIsValid(undefined);
            clearTimeout(timeoutId);
        };
    }, [studyOnChange.wbsCode]);

    const listener = (e: any) => {
        if (e.key === 'Escape') {
            handleCancel();
        }
        if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            handleSave();
        }
    };

    const deleteThisStudy = (): void => {
        setDeleteStudyInProgress(true);
        setUserClickedDelete(false);
        setLoading(true);
        setUpdateCache({ ...updateCache, [getStudiesUrl()]: true });
        closeStudy(study.id).then((result: any) => {
            setLoading(false);
            if (result && result.message) {
                setDeleteStudyInProgress(true);
            } else {
                history.push('/');
            }
        });
    };

    const handleSave = () => {
        setUpdateCache({ ...updateCache, [getStudiesUrl()]: true });
        setShowImagePicker(false);
        setHasChanged(false);
        setWbsIsValid(wbsOnChangeIsValid);
        setUserPressedCreate(true);
        if (!validateUserInputStudy(studyOnChange, wbsOnChangeIsValid, validateWbsInProgress, newStudy)) {
            return;
        }
        if (imageUrl) {
            setStudyOnChange({ ...studyOnChange, logoUrl: imageUrl });
        }
        setEditMode(false);
        sendStudyToApi(studyOnChange);
        setNewStudy(false);
    };

    const returnTooltipTextDeleteStudy = () => {
        if (study.sandboxes && study.sandboxes.length > 0) {
            return 'Delete sandboxes before deleting study';
        }
        return 'You do not have permission to delete this study';
    };

    const returnTooltipTextSaveStudy = () => {
        if (
            wbsOnChangeIsValid === false &&
            !newStudy &&
            ((study.sandboxes && study.sandboxes.length) || (study.datasets && study.datasets.length))
        ) {
            return 'Can not change from valid to invalid WBS with active resources';
        }
        if (!validateUserInputStudy(studyOnChange, wbsOnChangeIsValid, validateWbsInProgress, newStudy)) {
            return 'Please fill out all required fields';
        }
        return '';
    };

    const validateWbsOnChange = (wbs: string) => {
        if (wbs !== '') {
            setValidateWbsInProgress(true);
            validateWbsCode(wbs, wbsController.signal).then((result: any) => {
                setValidateWbsInProgress(false);
                setWbsOnChangeIsValid(result);
            });
        } else {
            setWbsOnChangeIsValid(false);
        }
    };

    const studyDeleteEnabled =
        study.sandboxes && study.sandboxes.length === 0 && study.permissions && study.permissions.closeStudy;
    const optionsTemplate = (
        <>
            <Tooltip title={studyDeleteEnabled ? '' : returnTooltipTextDeleteStudy()} placement="left">
                <Menu.Item
                    onClick={() => setUserClickedDelete(true)}
                    data-cy="study_delete"
                    disabled={!studyDeleteEnabled}
                    title="study_delete"
                    className="study_delete"
                    data-testid="study_delete"
                >
                    <Icon name="delete_forever" color="red" size={24} />
                    <span style={{ color: 'red' }}>Delete study</span>
                </Menu.Item>
            </Tooltip>
        </>
    );

    const sendStudyToApi = (study: StudyObj) => {
        setLoading(true);
        if (newStudy) {
            createStudy(study, imageUrl).then((result: any) => {
                if (result && !result.message) {
                    setLoading(false);
                    const newStudy = result;
                    cache[getStudyByIdUrl(study.id)] = result;
                    setStudy(newStudy);
                    history.push('/studies/' + result.id);
                } else {
                    console.log('Err');
                }
            });
        } else {
            study.id = id;
            if (imageUrl) {
                setStudy({ ...studyOnChange, logoUrl: imageUrl });
            } else {
                setStudy(studyOnChange);
            }
            setLoading(false);
            updateStudy(study, imageUrl).then((result: any) => {
                if (result && !result.message) {
                    cache[getStudyByIdUrl(study.id)] = result;
                    setHasChanged(false);
                } else {
                    console.log('Err');
                }
            });
        }
    };

    const handleCancel = () => {
        setHasChanged(false);
        if (newStudy) {
            history.push('/');
            return;
        }
        setEditMode(false);
        setImageUrl('');
        setStudyOnChange(study);
        setShowImagePicker(false);
    };

    const returnWbsVariant = () => {
        if (wbsOnChangeIsValid === undefined) {
            return 'default';
        }
        if (wbsOnChangeIsValid) {
            return 'success';
        }
        return 'error';
    };

    const handleChange = (columnName: string, value: string): void => {
        setHasChanged(true);
        const setterValue = returnAllowedLengthOfString(limits, value, columnName);
        setStudyOnChange({
            ...studyOnChange,
            [columnName]: setterValue
        });
    };

    return (
        <div
            style={{
                backgroundColor: 'white',
                margin: '24px 32px 0px 32px',
                display: 'flex',
                borderRadius: '4px',
                padding: '16px',
                minWidth: '120px'
            }}
        >
            {userClickedDelete && (
                <DeleteResourceComponent
                    ResourceName={study.name}
                    setUserClickedDelete={setUserClickedDelete}
                    onClick={deleteThisStudy}
                    type="study"
                />
            )}
            {!loading ? (
                <Wrapper>
                    <TitleWrapper editMode={editMode}>
                        {!editMode ? (
                            <>
                                <Tooltip
                                    title={name && name.length > truncateLength ? name : ''}
                                    placement="top"
                                    enterDelay={200}
                                >
                                    <TitleText>{truncate(name, truncateLength)}</TitleText>
                                </Tooltip>
                                <Tooltip
                                    title={vendor && vendor.length > truncateLength ? vendor : ''}
                                    placement="top"
                                    enterDelay={500}
                                >
                                    <SmallIconWrapper>
                                        <Icon color="#007079" name="business" size={24} />
                                        <SmallText>{truncate(vendor, truncateLength)}</SmallText>
                                    </SmallIconWrapper>
                                </Tooltip>
                                <SmallIconWrapper>
                                    <Icon color="#007079" name="dollar" size={24} />
                                    <SmallText>{wbsCode || '-'}</SmallText>
                                </SmallIconWrapper>
                            </>
                        ) : (
                            <>
                                <TextField
                                    id="textfield1"
                                    placeholder="Name of study"
                                    variant={returnTextfieldTypeBasedOninput(studyOnChange.name, true)}
                                    onChange={(e: any) => handleChange('name', e.target.value)}
                                    label="Name"
                                    meta="(required)"
                                    style={{ margin: 'auto', marginLeft: '0', resize: 'none' }}
                                    value={studyOnChange.name}
                                    data-cy="study_name"
                                    autoComplete="off"
                                    autoFocus
                                    inputIcon={
                                        <Tooltip
                                            title="The value must be between 3 and 128 characters long (A-Z)"
                                            placement="right"
                                        >
                                            <Icon name="info_circle" />
                                        </Tooltip>
                                    }
                                />
                                <TextField
                                    id="textfield2"
                                    autoComplete="off"
                                    placeholder="Add vendor"
                                    variant={checkIfRequiredFieldsAreNull(studyOnChange.vendor, userPressedCreate)}
                                    onChange={(e: any) => handleChange('vendor', e.target.value)}
                                    value={studyOnChange.vendor}
                                    label="Vendor"
                                    meta="(required)"
                                    data-cy="study_vendor"
                                    inputIcon={<Icon name="business" />}
                                />
                                <TextField
                                    id="textfield3"
                                    autoComplete="off"
                                    placeholder="Add WBS"
                                    onChange={(e: any) => handleChange('wbsCode', e.target.value)}
                                    label="WBS"
                                    value={studyOnChange.wbsCode}
                                    data-cy="study_wbs"
                                    inputIcon={
                                        validateWbsInProgress ? (
                                            <Tooltip title="Validating WBS..." placement="top">
                                                <DotProgress />
                                            </Tooltip>
                                        ) : (
                                            <Icon name="dollar" />
                                        )
                                    }
                                    variant={returnWbsVariant()}
                                    helperText={wbsOnChangeIsValid === false ? 'Invalid WBS code' : ''}
                                />
                            </>
                        )}
                        <div>
                            {!editMode ? (
                                <SmallIconWrapper>
                                    <Icon
                                        color="#007079"
                                        name={restricted ? 'visibility_off' : 'visibility'}
                                        size={24}
                                    />{' '}
                                    <SmallText>{restricted ? 'Hidden' : 'Not hidden'}</SmallText>
                                </SmallIconWrapper>
                            ) : (
                                <FormControlLabel
                                    control={
                                        <CheckBox
                                            style={{ color: '#007079' }}
                                            checked={studyOnChange.restricted}
                                            onChange={() =>
                                                setStudyOnChange({
                                                    ...studyOnChange,
                                                    restricted: !studyOnChange.restricted
                                                })
                                            }
                                        />
                                    }
                                    label="Hidden study"
                                />
                            )}
                        </div>
                        {!editMode ? (
                            <div>
                                <Tooltip
                                    title={
                                        study.permissions && study.permissions.updateMetadata
                                            ? ''
                                            : 'You do not have access to edit this study'
                                    }
                                    placement="right"
                                >
                                    <Button
                                        variant="outlined"
                                        data-cy="edit_study"
                                        onClick={() => setEditMode(true)}
                                        style={{ width: '80px', marginTop: '12px' }}
                                        disabled={study.permissions && !study.permissions.updateMetadata}
                                    >
                                        Edit
                                    </Button>
                                </Tooltip>
                            </div>
                        ) : (
                            <div>
                                <Label
                                    style={{ color: '#000000', margin: '-16px 0 16px 32px', letterSpacing: '0.2px' }}
                                >
                                    Hidden studies are invisible in the Sepes portal except for invited participants.
                                </Label>
                            </div>
                        )}
                    </TitleWrapper>
                    {!editMode ? (
                        <DescriptionWrapper>
                            <Typography variant="body_long">{description}</Typography>
                        </DescriptionWrapper>
                    ) : (
                        <DescriptioTextfieldnWrapper>
                            <TextField
                                id="studyDescription"
                                autoComplete="off"
                                placeholder="Describe the study"
                                multiline
                                onChange={(e: any) => handleChange('description', e.target.value)}
                                meta={returnLimitMeta(500, studyOnChange.description)}
                                label="Description"
                                style={{ height: '152px', resize: 'none' }}
                                value={studyOnChange.description}
                                data-cy="study_description"
                            />
                        </DescriptioTextfieldnWrapper>
                    )}
                    <div>
                        {editMode && !newStudy && (
                            <div style={{ float: 'right', marginBottom: 'auto' }}>
                                <Button
                                    style={{
                                        margin: '-13px',
                                        display: study.permissions && study.permissions.closeStudy ? '' : 'none'
                                    }}
                                    variant="ghost_icon"
                                    data-cy="study_options"
                                    id="menuButton"
                                    aria-labelledby="menuButton"
                                    aria-expanded={isOpen}
                                    onClick={(e) => (isOpen ? closeMenu() : openMenu(e, 'first'))}
                                    data-testid="study_delete_settings"
                                >
                                    <Icon color="#007079" name="settings" size={24} />
                                </Button>

                                <Menu
                                    id="menuButton"
                                    aria-labelledby="menuButton"
                                    open={isOpen}
                                    onClose={closeMenu}
                                    anchorEl={buttonEl}
                                    focus={focus}
                                    placement="bottom-end"
                                >
                                    {optionsTemplate}
                                </Menu>
                            </div>
                        )}
                        <RightWrapper editMode={editMode}>
                            <div>
                                {!showImagePicker && (
                                    <PictureWrapper editMode={editMode}>
                                        <CustomLogoComponent logoUrl={logoUrl} center={editMode} />{' '}
                                    </PictureWrapper>
                                )}
                                {editMode && (
                                    <>
                                        <div>
                                            {showImagePicker && (
                                                <PictureWrapper editMode={editMode}>
                                                    <AddImageAndCompressionContainer
                                                        setImageUrl={setImageUrl}
                                                        imageUrl={imageUrl}
                                                    />
                                                </PictureWrapper>
                                            )}
                                            <Button
                                                onClick={() => {
                                                    if (imageUrl === '') {
                                                        setShowImagePicker(!showImagePicker);
                                                    }

                                                    setImageUrl('');
                                                    setStudyOnChange({ ...studyOnChange, logoUrl: '' });
                                                }}
                                                variant="outlined"
                                                style={{ margin: '16px 0 20px 56px' }}
                                                data-cy="change_logo"
                                            >
                                                Change logo
                                            </Button>
                                            <SaveCancelWrapper>
                                                <Tooltip title={returnTooltipTextSaveStudy()} placement="left">
                                                    <Button
                                                        data-cy="create_study"
                                                        onClick={() => handleSave()}
                                                        disabled={
                                                            !validateUserInputStudy(
                                                                studyOnChange,
                                                                wbsOnChangeIsValid !== undefined
                                                                    ? wbsOnChangeIsValid
                                                                    : wbsIsValid,
                                                                validateWbsInProgress,
                                                                newStudy
                                                            )
                                                        }
                                                    >
                                                        {newStudy ? 'Create' : 'Save'}
                                                    </Button>
                                                </Tooltip>
                                                <Button variant="outlined" onClick={() => handleCancel()}>
                                                    Cancel
                                                </Button>
                                            </SaveCancelWrapper>
                                        </div>
                                    </>
                                )}
                            </div>
                        </RightWrapper>
                    </div>
                </Wrapper>
            ) : (
                <Loading />
            )}
        </div>
    );
};

// readOnly={
//     wbsOnChangeIsValid &&
//     ((study.sandboxes && study.sandboxes.length) ||
//         (study.datasets && study.datasets.length))
// }

export default StudyComponentFull;
