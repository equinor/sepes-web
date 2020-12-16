import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, TextField, Icon, Tooltip, Menu } from '@equinor/eds-core-react';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { dollar, visibility, visibility_off, business, settings } from '@equinor/eds-icons';
import { StudyObj } from '../common/interfaces';
import { createStudy, deleteStudy, putStudy } from '../../services/Api';
import AddImageAndCompressionContainer from '../common/upload/ImageDropzone';
import CustomLogoComponent from '../common/CustomLogoComponent';
import { checkIfRequiredFieldsAreNull, returnLimitMeta } from '../common/helpers';
import { useHistory } from 'react-router-dom';
import { Label, Title } from '../common/StyledComponents';
import Loading from '../common/LoadingComponent';
import DeleteResourceComponent from '../common/customComponents/DeleteResourceComponent';
import * as notify from '../common/notify';

const { MenuItem } = Menu;

const icons = {
    dollar,
    visibility,
    visibility_off,
    business,
    settings
};
Icon.add(icons);

const TitleText = styled.span`
    font-size: 28px;
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
        min-width: 500px;
    }
    @media (max-width: 600px) {
        min-width: 200px;
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
    margin-top: 4px;
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

type StudyComponentFullProps = {
    study: StudyObj;
    newStudy: boolean;
    setNewStudy: any;
    setLoading: any;
    loading: boolean;
    setStudy: any;
    setHasChanged: any;
    cache: any;
    setUpdateCache: any;
    updateCache: any;
};

const StudyComponentFull: React.FC<StudyComponentFullProps> = ({
    study,
    newStudy,
    setNewStudy,
    setLoading,
    loading,
    setStudy,
    setHasChanged,
    cache,
    setUpdateCache,
    updateCache
}) => {
    const history = useHistory();
    const { id, logoUrl, name, description, wbsCode, vendor, restricted } = study;
    const [studyOnChange, setStudyOnChange] = useState<StudyObj>(study);
    const [editMode, setEditMode] = useState<boolean>(newStudy);
    const [displayDeleteStudy, setDisplayDeleteStudy] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [userClickedDelete, setUserClickedDelete] = useState<boolean>(false);
    const [showImagePicker, setShowImagePicker] = useState<boolean>(false);
    const [userPressedCreate, setUserPressedCreate] = useState<boolean>(false);

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

    const listener = (e: any) => {
        if (e.key === 'Escape') {
            if (!newStudy) {
                setEditMode(false);
            } else {
                history.push('/');
            }
        }
        if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            handleSave();
        }
    };

    const deleteThisStudy = (): void => {
        setUpdateCache({ ...updateCache, '/studies': true });
        deleteStudy(study.id).then((result: any) => {
            if (result.Message) {
                notify.show('danger', '500', result.Message, result.RequestId);
            } else {
                history.push('/');
            }
        });
    };

    const handleSave = () => {
        setUpdateCache({ ...updateCache, studies: true });
        setHasChanged(false);
        setUserPressedCreate(true);
        if (checkRequiredFieldsArNotNull()) {
            return;
        }
        if (imageUrl) {
            setStudyOnChange({ ...studyOnChange, logoUrl: imageUrl });
        }
        setEditMode(false);
        sendStudyToApi(studyOnChange);
        setNewStudy(false);
    };

    const optionsTemplate = (
        <>
            <MenuItem onClick={() => setUserClickedDelete(true)} data-cy="study_delete">
                <Icon name="delete_forever" color="red" size={24} />
                <span style={{ color: 'red' }}>Delete study</span>
            </MenuItem>
        </>
    );

    const sendStudyToApi = (study: StudyObj) => {
        if (imageUrl) {
            setLoading(true);
        }
        if (newStudy) {
            createStudy(study).then((result: any) => {
                if (result && !result.Message) {
                    history.push('/studies/' + result.id);
                    let newStudy = result;
                    cache['studies/' + study.id] = result;
                    setStudy(newStudy);
                    if (imageUrl && newStudy.id) {
                        putStudy(newStudy, imageUrl).then((result: any) => {
                            if (result && !result.Message) {
                                setHasChanged(false);
                            } else {
                                notify.show('danger', '500', result.Message, result.RequestId);
                                console.log('Err');
                            }
                            setLoading(false);
                        });
                    }
                } else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
                setLoading(false);
            });
        } else {
            study.id = id;
            setStudy(studyOnChange);
            putStudy(study, imageUrl).then((result: any) => {
                if (result && !result.Message) {
                    cache['studies/' + study.id] = result;
                    setHasChanged(false);
                    setStudy(result);
                } else {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
                setLoading(false);
            });
        }
    };

    const checkRequiredFieldsArNotNull = (): boolean => {
        if (
            studyOnChange.name === '' ||
            studyOnChange === undefined ||
            studyOnChange.vendor === '' ||
            studyOnChange.vendor === undefined
        ) {
            return true;
        }
        return false;
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

    function handleChange(columnName: string, value: string) {
        setHasChanged(true);
        const inputLength = value.length;
        if (columnName === 'description' && inputLength > limits.description) {
            return;
        }
        if (columnName === 'name' && inputLength > limits.name) {
            return;
        }
        if (columnName === 'vendor' && inputLength > limits.vendor) {
            return;
        }
        if (columnName === 'wbsCode' && inputLength > limits.wbsCode) {
            return;
        }
        setStudyOnChange({
            ...studyOnChange,
            [columnName]: value
        });
    }

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
                                <TitleText>{name}</TitleText>
                                <SmallIconWrapper>
                                    <Icon color="#007079" name="business" size={24} />
                                    <SmallText>{vendor}</SmallText>
                                </SmallIconWrapper>
                                <SmallIconWrapper>
                                    <Icon color="#007079" name="dollar" size={24} />
                                    <SmallText>{wbsCode || '-'}</SmallText>
                                </SmallIconWrapper>
                            </>
                        ) : (
                            <>
                                <TextField
                                    id="textfield1"
                                    placeholder="What is the study name?"
                                    variant={checkIfRequiredFieldsAreNull(studyOnChange.name, userPressedCreate)}
                                    onChange={(e: any) => handleChange('name', e.target.value)}
                                    label="Study name"
                                    meta="(required)"
                                    style={{ margin: 'auto', marginLeft: '0' }}
                                    value={studyOnChange.name}
                                    data-cy="study_name"
                                    autoComplete="off"
                                />
                                <TextField
                                    id="textfield2"
                                    autoComplete="off"
                                    placeholder="Who is the vendor?"
                                    variant={checkIfRequiredFieldsAreNull(studyOnChange.vendor, userPressedCreate)}
                                    onChange={(e: any) => handleChange('vendor', e.target.value)}
                                    value={studyOnChange.vendor}
                                    label="Vendor"
                                    meta="(required)"
                                    data-cy="study_vendor"
                                    inputIcon={
                                        <div style={{ marginRight: '-80px' }}>
                                            <Icon
                                                style={{ position: 'absolute', right: '4px' }}
                                                name="business"
                                                size={24}
                                                color="#6F6F6F"
                                            />
                                        </div>
                                    }
                                />
                                <TextField
                                    id="textfield3"
                                    autoComplete="off"
                                    placeholder="Wbs for the study"
                                    onChange={(e: any) => handleChange('wbsCode', e.target.value)}
                                    label="wbs"
                                    value={studyOnChange.wbsCode}
                                    data-cy="study_wbs"
                                    inputIcon={
                                        <div style={{ marginRight: '-80px' }}>
                                            <Icon
                                                style={{ position: 'absolute', right: '4px', top: '-2px' }}
                                                name="dollar"
                                                size={24}
                                                color="#6F6F6F"
                                            />
                                        </div>
                                    }
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
                                        style={{ width: '80px' }}
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
                        <DescriptionWrapper>{description}</DescriptionWrapper>
                    ) : (
                        <DescriptioTextfieldnWrapper>
                            <TextField
                                id="textfield4"
                                autoComplete="off"
                                placeholder="Describe the study"
                                multiline
                                onChange={(e: any) => handleChange('description', e.target.value)}
                                meta={returnLimitMeta(500, studyOnChange.description)}
                                label="Description"
                                style={{ margin: 'auto', marginLeft: '0', height: '152px' }}
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
                                    aria-expanded={displayDeleteStudy}
                                    onClick={(e) => (isOpen ? closeMenu() : openMenu(e, 'first'))}
                                >
                                    <Icon color="#007079" name="settings" size={16} />
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
                            </div>
                        )}
                        <RightWrapper editMode={editMode}>
                            {!showImagePicker && (
                                <PictureWrapper editMode={editMode}>
                                    <CustomLogoComponent logoUrl={logoUrl} />{' '}
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
                                                setShowImagePicker(!showImagePicker);
                                                setImageUrl('');
                                            }}
                                            variant="outlined"
                                            style={{ margin: '16px 0 20px 56px' }}
                                        >
                                            Change logo
                                        </Button>
                                        <SaveCancelWrapper>
                                            <Button data-cy="create_study" onClick={() => handleSave()}>
                                                {newStudy ? 'Create' : 'Save'}
                                            </Button>
                                            <Button variant="outlined" onClick={() => handleCancel()}>
                                                Cancel
                                            </Button>
                                        </SaveCancelWrapper>
                                    </div>
                                </>
                            )}
                        </RightWrapper>
                    </div>
                </Wrapper>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default StudyComponentFull;
