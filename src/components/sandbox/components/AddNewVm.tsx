/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect } from 'react';
import {
    TextField,
    Typography,
    Button,
    Checkbox,
    Icon,
    Tooltip,
    DotProgress,
    Label,
    SingleSelect
} from '@equinor/eds-core-react';
import { checkColumDoesNotExceedInputLength, returnLimitMeta, roundUp } from '../../common/helpers/helpers';
import {
    validateUserInputVm,
    filterList,
    returnUsernameVariant,
    arrayObjectsToArrayString,
    returnKeyOfDisplayValue,
    validateUsername,
    filterOs,
    returnDisplayName,
    returnVMnameVariant,
    checkIfAddNewVmHasUnsavedChanges,
    checkIfVmNameAlreadyExists
} from '../../common/helpers/sandboxHelpers';
import CoreDevDropdown from '../../common/customComponents/Dropdown';
import { createVirtualMachine, getVmName, getVirtualMachineCost } from '../../../services/Api';
import { SandboxObj, DropdownObj, SizeObj, VmObj, CalculateNameObj } from '../../common/interfaces';
import styled from 'styled-components';
import { getVmsForSandboxUrl } from '../../../services/ApiCallStrings';
import useKeyEvents from '../../common/hooks/useKeyEvents';
import '../../../styles/addNewVm.scss';
import { SETCALLRESOURCESTRUE } from 'store/actions/sandbox';
import { useDispatch } from 'react-redux';
import Password from 'components/common/customComponents/Password';

const Wrapper = styled.div`
    height: auto;
    padding: 16px;
    width: 400px;
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 24px;
    padding-bottom: 196px;
`;

const SizeFilterWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
    margin-top: 8px;
`;

const HardWareReqWrapper = styled.span`
    font-size: 12px;
    color: #6f6f6f;
    position: absolute;
    margin-top: -10px;
    margin-left: 5px;
    background: white;
    padding: 0 4px 0 4px;
`;

const HelperTextWrapper = styled.div`
    background-color: #d5eaf4;
    padding: 16px;
    border-radius: 4px;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.2px;
    padding-top: 26px;
`;

const UnstyledList = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
    border: 1px solid #dcdcdc;
`;

type AddNewVmProps = {
    sandbox: SandboxObj;
    setVms: any;
    vms: any;
    setActiveTab: any;
    sizes?: SizeObj;
    disks?: DropdownObj;
    os?: any;
    setUpdateCache: any;
    updateCache: any;
    setVm: any;
    vm: VmObj;
    setSizeFilter: any;
    sizeFilter: any;
    setOsFilter: any;
    osFilter: any;
    setHasChanged: any;
};

const limits = {
    name: 20,
    username: 20,
    password: 123
};

const sizeType = {
    memory: 'memory',
    gpu: 'gpu',
    compute: 'compute'
};

const osType = {
    linux: 'linux',
    windows: 'windows',
    recommended: 'recommended'
};

const width = '400px';
const helperText =
    'The value must be between 12 and 123 characters long. Must contain one special character, one number and one uppercase letter';

const AddNewVm: React.FC<AddNewVmProps> = React.memo(
    ({
        sandbox,
        setVms,
        vms,
        sizes,
        disks,
        setActiveTab,
        os,
        setUpdateCache,
        updateCache,
        setVm,
        vm,
        setSizeFilter,
        sizeFilter,
        setOsFilter,
        osFilter,
        setHasChanged
    }) => {
        const sandboxId = window.location.pathname.split('/')[4];
        const [actualVmName, setActualVmName] = useState<string>('');
        const [usernameIsValid, setUsernameIsValid] = useState<boolean | undefined>(undefined);
        const [vmEstimatedCost, setVmEstimatedCost] = useState<any>();
        const [usernameHelpText, setUsernameHelpText] = useState<string>(
            'You need to pick operating system before username'
        );
        const [validatingUsername, setValidatingUsername] = useState<boolean>(false);
        const [displayRecommendedOs, setDisplayRecommendedOs] = useState<boolean>(false);
        const [loading, setLoading] = useState<boolean>(false);
        const vmIsValid = validateUserInputVm(vm, loading, vmEstimatedCost, usernameIsValid, vms, sandbox);
        const dispatch = useDispatch();

        useEffect(() => {
            const timeoutId = setTimeout(() => {
                calculateVmName(vm.name);
                calculateVmPrice();
            }, 500);
            return () => {
                clearTimeout(timeoutId);
            };
        }, [vm.name, loading, sizes]);

        useEffect(() => {
            calculateVmPrice();
        }, [vm.dataDisks, vm.operatingSystem, vm.size]);

        useEffect(() => {
            const timeoutId = setTimeout(() => {
                validateUsername(vm, os, setUsernameIsValid, setValidatingUsername, setUsernameHelpText);
            }, 500);
            return () => {
                clearTimeout(timeoutId);
            };
        }, [vm.username, vm.operatingSystem]);

        useEffect(() => {
            setHasChanged(checkIfAddNewVmHasUnsavedChanges(vm));
        }, []);

        const handleDropdownChange = (value, name: string): void => {
            setHasChanged(true);
            if (name === 'operatingSystem') {
                setUsernameHelpText('');
            }
            if (name === 'dataDisks') {
                value = [value];
            }
            setVm({
                ...vm,
                [name]: value
            });
        };

        const handleChange = (field: string, value: string) => {
            setHasChanged(true);
            if (!checkColumDoesNotExceedInputLength(limits, value, field)) {
                return;
            }
            setVm({
                ...vm,
                [field]: value
            });
        };

        const handlePasswordChange = (value: string) => {
            setHasChanged(true);
            setVm({
                ...vm,
                password: value
            });
        };

        const createVm = () => {
            if (!vmIsValid) {
                return;
            }
            setHasChanged(false);
            setLoading(true);
            setUpdateCache({ ...updateCache, [getVmsForSandboxUrl(sandbox.id)]: true });
            createVirtualMachine(sandboxId, vm).then((result: any) => {
                if (result && !result.message) {
                    setSizeFilter([]);
                    setOsFilter([]);
                    setVm({
                        id: '',
                        name: '',
                        region: 'norwayeast',
                        size: '',
                        operatingSystem: '',
                        distro: 'win2019datacenter',
                        username: '',
                        password: '',
                        linkToExternalSystem: '',
                        dataDisks: []
                    });
                    // getResources();
                    dispatch({ type: SETCALLRESOURCESTRUE });

                    const vmsList: any = [...vms];
                    vmsList.push(result);
                    setVms(vmsList);
                    setActiveTab(vmsList.length);
                }
                setLoading(false);
            });
        };

        const calculateVmPrice = () => {
            if (vm.operatingSystem !== '' && vm.size !== '') {
                const vmPrice = {
                    size: vm.size,
                    dataDisks: vm.dataDisks,
                    operatingSystem: vm.operatingSystem
                };
                getVirtualMachineCost(sandbox?.id, vmPrice).then((result: any) => {
                    if (result && !result.message) {
                        setVmEstimatedCost(result);
                    }
                });
            }
        };

        const calculateVmName = (value: string) => {
            if (value === '') {
                setActualVmName('');
                return;
            }
            const calculateName: CalculateNameObj = {
                studyName: sandbox.studyName,
                sandboxName: sandbox?.name,
                userSuffix: value
            };
            getVmName(calculateName).then((result: any) => {
                if (result && !result.errors) {
                    setActualVmName(result);
                }
            });
        };

        const handleCheck = (column: string, checked: any, _filter: any, _setFiler) => {
            const currentFilter: any = [..._filter];
            if (checked) {
                currentFilter.push(column);
            } else {
                currentFilter.splice(_filter.indexOf(column), 1);
            }
            _setFiler(currentFilter);
        };

        const returnHelperTextCreateVm = (): string => {
            if (!vmIsValid && !loading) {
                return 'Please fill out all required fields';
            }
            if (loading) {
                return 'Creating VM..';
            }
            return '';
        };

        useKeyEvents(undefined, createVm, true);

        return (
            <Wrapper>
                <div>
                    <TextField
                        id="textfield1"
                        placeholder="Name"
                        onChange={(e: any) => {
                            handleChange('name', e.target.value);
                        }}
                        value={vm.name}
                        autoComplete="off"
                        label="Name"
                        meta={returnLimitMeta(20, vm.name)}
                        variant={returnVMnameVariant(vm.name, vms, sandbox)}
                        helperText={
                            checkIfVmNameAlreadyExists(vms, vm.name, sandbox)
                                ? 'There already exists a vm with that name'
                                : ''
                        }
                        data-cy="vm_name"
                        inputIcon={
                            <Tooltip title="The value must be between 3 and 20 characters long" placement="right">
                                <Icon name="info_circle" />
                            </Tooltip>
                        }
                    />
                    <div style={{ marginTop: '24px', marginBottom: '24px' }}>
                        <Label label="Actual VM name" />
                        <Typography style={{ marginLeft: '8px' }} variant="h6">
                            {actualVmName || '-'}
                        </Typography>
                    </div>
                    {/*<CoreDevDropdown
                    label="Operating system"
                    options={os}
                    width={width}
                    onChange={handleDropdownChange}
                    name="operatingSystem"
                    data-cy="vm_operatingSystem"
                    meta="(required)"
                    useOverflow
                    tabIndex={0}
                />*/}
                    <div>
                        <SizeFilterWrapper>
                            <UnstyledList>
                                <HardWareReqWrapper>OS Type</HardWareReqWrapper>
                                <li>
                                    <Checkbox
                                        label="Windows"
                                        onChange={(e: any) =>
                                            handleCheck(osType.windows, e.target.checked, osFilter, setOsFilter)
                                        }
                                        defaultChecked={osFilter.includes(osType.windows)}
                                    />
                                </li>
                                <li>
                                    <Checkbox
                                        label="Linux"
                                        onChange={(e: any) =>
                                            handleCheck(osType.linux, e.target.checked, osFilter, setOsFilter)
                                        }
                                        defaultChecked={osFilter.includes(osType.linux)}
                                    />
                                </li>
                                <li>
                                    <Checkbox
                                        label="Recommended"
                                        onChange={(e: any) => {
                                            handleCheck(osType.recommended, e.target.checked, osFilter, setOsFilter);
                                            setDisplayRecommendedOs(e.target.checked);
                                        }}
                                        defaultChecked={osFilter.includes(osType.recommended)}
                                    />
                                </li>
                            </UnstyledList>
                            <HelperTextWrapper>
                                Specify which operating systems you want to be in the dropdown below. Recommended OSs
                                are the latest available version.
                            </HelperTextWrapper>
                        </SizeFilterWrapper>
                        <div style={{ marginTop: '24px' }} />
                        <SingleSelect
                            handleSelectedItemChange={({ selectedItem }) =>
                                handleDropdownChange(returnKeyOfDisplayValue(selectedItem, os), 'operatingSystem')
                            }
                            label="Operating system"
                            items={arrayObjectsToArrayString(filterOs(os, osFilter, displayRecommendedOs))}
                            meta="(required)"
                            placeholder="Please search/select..."
                            className="singleSelect"
                            data-cy="vm_operatingSystem"
                            initialSelectedItem={returnDisplayName(os, vm.operatingSystem)}
                        />
                    </div>
                    <div style={{ marginTop: '24px' }} />
                    <TextField
                        id="textfield2"
                        autoComplete="off"
                        placeholder="Username"
                        onChange={(e: any) => handleChange('username', e.target.value)}
                        value={vm.username}
                        label="Username"
                        meta="(required)"
                        data-cy="vm_username"
                        variant={returnUsernameVariant(vm.username, usernameIsValid)}
                        disabled={!vm.operatingSystem}
                        helperText={usernameHelpText}
                        inputIcon={
                            <Tooltip title="The value must be between 1 and 20 characters long" placement="right">
                                {validatingUsername ? <DotProgress /> : <Icon name="info_circle" />}
                            </Tooltip>
                        }
                    />
                    <Password
                        onChange={handlePasswordChange}
                        fieldValue={vm.password}
                        limit={limits.password}
                        helperText={helperText}
                        dataCy="vm_password"
                    />
                </div>
                <SizeFilterWrapper>
                    <UnstyledList>
                        <HardWareReqWrapper>Hardware requirements</HardWareReqWrapper>
                        <li>
                            <Checkbox
                                label="High memory"
                                onChange={(e: any) =>
                                    handleCheck(sizeType.memory, e.target.checked, sizeFilter, setSizeFilter)
                                }
                                defaultChecked={sizeFilter.includes(sizeType.memory)}
                            />
                        </li>
                        <li>
                            <Checkbox
                                label="High GPU"
                                onChange={(e: any) =>
                                    handleCheck(sizeType.gpu, e.target.checked, sizeFilter, setSizeFilter)
                                }
                                defaultChecked={sizeFilter.includes(sizeType.gpu)}
                            />
                        </li>
                        <li>
                            <Checkbox
                                label="High CPU"
                                onChange={(e: any) =>
                                    handleCheck(sizeType.compute, e.target.checked, sizeFilter, setSizeFilter)
                                }
                                defaultChecked={sizeFilter.includes(sizeType.compute)}
                            />
                        </li>
                    </UnstyledList>
                    <HelperTextWrapper>
                        Specifying hardware requirements will affect which options you can choose between for size.
                        Leave empty if you have no special requirements.
                    </HelperTextWrapper>
                </SizeFilterWrapper>
                {/*<CoreDevDropdown
                label="VM size"
                options={filterList(sizes, filter)}
                width={width}
                onChange={handleDropdownChange}
                name="size"
                data-cy="vm_size"
                meta="(required)"
                useOverflow
                tabIndex={0}
            />*/}
                <SingleSelect
                    handleSelectedItemChange={({ selectedItem }) =>
                        handleDropdownChange(returnKeyOfDisplayValue(selectedItem, sizes), 'size')
                    }
                    label="VM size"
                    items={arrayObjectsToArrayString(filterList(sizes, sizeFilter))}
                    meta="(required)"
                    className="singleSelect"
                    placeholder="Please search/select..."
                    data-cy="vm_size"
                    initialSelectedItem={returnDisplayName(sizes, vm.size)}
                />
                <CoreDevDropdown
                    label="Data disk"
                    options={disks}
                    width={width}
                    onChange={handleDropdownChange}
                    name="dataDisks"
                    data-cy="vm_dataDisks"
                    useOverflow
                    tabIndex={0}
                    preSelectedValue={returnDisplayName(disks, vm.dataDisks[0])}
                    helperText={
                        vm.dataDisks.length > 0
                            ? 'Data disk is not accessible until you initalize and partition the hardrive within the operating system'
                            : ''
                    }
                />
                <div>
                    <Label label="Estimated total" />
                    <Typography variant="h6" style={{ marginLeft: '8px' }}>
                        {' '}
                        {vmEstimatedCost ? '$' + roundUp(vmEstimatedCost, 10) + '/month' : '-'}
                    </Typography>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <Tooltip title={returnHelperTextCreateVm()} placement="right">
                        <Button
                            style={{ width: '100px', marginLeft: 'auto' }}
                            data-cy="create_vm"
                            onClick={createVm}
                            disabled={!vmIsValid}
                        >
                            {loading ? <DotProgress color="primary" /> : 'Create'}
                        </Button>
                    </Tooltip>
                </div>
            </Wrapper>
        );
    }
);

export default AddNewVm;
