import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Checkbox, Icon, Tooltip, DotProgress } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { passwordValidate, returnLimitMeta, roundUp, validateResourceName } from '../../common/helpers';
import { Label } from '../../common/StyledComponents';
import CoreDevDropdown from '../../common/customComponents/Dropdown';
import { VmObj, VmUsernameObj, CalculateNameObj } from '../../common/interfaces';
import { createVirtualMachine, getVmName, getVirtualMachineCost, validateVmUsername } from '../../../services/Api';
import { SandboxObj, DropdownObj, SizeObj, OperatingSystemObj } from '../../common/interfaces';
import * as notify from '../../common/notify';
import styled from 'styled-components';
import { getVmsForSandboxUrl } from '../../../services/ApiCallStrings';

const icons = {
    info_circle
};
Icon.add(icons);

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
    padding-top: 34px;
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
    os?: OperatingSystemObj;
    setUpdateCache: any;
    updateCache: any;
    getResources: any;
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

const AddNewVm: React.FC<AddNewVmProps> = ({
    sandbox,
    setVms,
    vms,
    sizes,
    disks,
    setActiveTab,
    os,
    setUpdateCache,
    updateCache,
    getResources
}) => {
    const sandboxId = window.location.pathname.split('/')[4];
    const [vm, setVm] = useState<VmObj>({
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
    const [actualVmName, setActualVmName] = useState<string>('');
    const [usernameIsValid, setUsernameIsValid] = useState<boolean | undefined>(undefined);
    const [vmEstimatedCost, setVmEstimatedCost] = useState<any>();
    const [usernameHelpText, setUsernameHelptText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<any>([]);
    const width = '400px';

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
            validateUsername(vm.username);
        }, 500);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [vm.username]);

    const handleDropdownChange = (value, name: string): void => {
        if (name === 'dataDisks') {
            value = [value];
        }
        setVm({
            ...vm,
            [name]: value
        });
    };

    const handleChange = (field: string, value: string) => {
        if (field === 'name' && value.length > limits.name) {
            return;
        }
        if (field === 'username' && value.length > limits.username) {
            return;
        }
        if (field === 'password' && value.length > limits.password) {
            return;
        }
        setVm({
            ...vm,
            [field]: value
        });
    };

    const createVm = () => {
        setLoading(true);
        setUpdateCache({ ...updateCache, [getVmsForSandboxUrl(sandbox.id)]: true });
        createVirtualMachine(sandboxId, vm).then((result: any) => {
            if (result && !result.Message) {
                getResources();
                let vmsList: any = [...vms];
                vmsList.push(result);
                setVms(vmsList);
                setActiveTab(vmsList.length);
            } else {
                notify.show('danger', '500', result.Message, result.RequestId);
            }
            setLoading(false);
        });
    };

    const calculateVmPrice = () => {
        if (vm.operatingSystem !== '' && vm.size !== '' && vm.dataDisks.length > 0) {
            const vmPrice = {
                size: vm.size,
                dataDisks: vm.dataDisks,
                operatingSystem: vm.operatingSystem
            };
            getVirtualMachineCost(sandbox?.id, vmPrice).then((result: any) => {
                if (result && !result.Message) {
                    setVmEstimatedCost(result);
                } else {
                    notify.show('danger', '500', result.Message, result.RequestId);
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
            } else {
                notify.show('danger', '500', result.Message, result.RequestId);
            }
        });
    };

    const validateUsername = (value: string) => {
        if (value === '') {
            setUsernameIsValid(false);
            return;
        }
        const username: VmUsernameObj = { username: value };
        validateVmUsername(username).then((result: any) => {
            if (result) {
                setUsernameIsValid(result.isValid);
                if (!result.isValid) {
                    setUsernameHelptText(result.errorMessage);
                    //notify.show('danger', '500', result.errorMessage);
                } else {
                    setUsernameHelptText('');
                }
            } else {
                setUsernameIsValid(false);
                notify.show('danger', '500', result.Message, result.RequestId);
            }
        });
    };

    const validateUserInput = () => {
        if (loading) {
            return false;
        }
        if (
            passwordValidate(vm.password) &&
            vm.name !== '' &&
            vm.operatingSystem !== '' &&
            vm.size !== '' &&
            vm.dataDisks.length > 0 &&
            usernameIsValid &&
            validateResourceName(vm.name)
        ) {
            return true;
        }
        return false;
    };

    const filterSizes = (sizes: any) => {
        if (!sizes) {
            return [];
        }
        if (filter.length === 0) {
            return sizes;
        }
        return sizes.filter((size) => filter.includes(size.category));
    };

    const handleCheck = (column: string, checked: any) => {
        let currentFilter: any = [...filter];
        if (checked) {
            currentFilter.push(column);
        } else {
            currentFilter.splice(filter.indexOf(column), 1);
        }
        setFilter(currentFilter);
    };

    const returnPasswordVariant = () => {
        if (vm.password === '') {
            return 'default';
        }
        if (passwordValidate(vm.password)) {
            return 'success';
        }
        return 'error';
    };

    const returnUsernameVariant = () => {
        if (vm.username === '' || usernameIsValid === undefined) {
            return 'default';
        }
        if (usernameIsValid) {
            return 'success';
        }
        return 'error';
    };

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
                    data-cy="vm_name"
                    inputIcon={
                        <div style={{ position: 'relative', right: '4px', bottom: '4px' }}>
                            <Tooltip title="The value must be between 3 and 20 characters long" placement={'right'}>
                                <Icon name="info_circle" size={24} color="#6F6F6F" />
                            </Tooltip>
                        </div>
                    }
                />
                <div style={{ marginTop: '24px', marginBottom: '24px' }}>
                    <Label>Actual VM name</Label>
                    <Typography variant="h6">{actualVmName || '-'}</Typography>
                </div>
                <TextField
                    id="textfield2"
                    autoComplete="off"
                    placeholder="Username"
                    onChange={(e: any) => handleChange('username', e.target.value)}
                    value={vm.username}
                    label="Username"
                    meta="(required)"
                    data-cy="vm_username"
                    variant={returnUsernameVariant()}
                    helperText={usernameHelpText}
                    inputIcon={
                        <div style={{ position: 'relative', right: '4px', bottom: '4px' }}>
                            <Tooltip title="The value must be between 1 and 20 characters long" placement={'right'}>
                                <Icon name="info_circle" size={24} color="#6F6F6F" />
                            </Tooltip>
                        </div>
                    }
                />
                <div style={{ marginTop: '24px' }}>
                    <TextField
                        id="textfield3"
                        autoComplete="off"
                        placeholder="Password"
                        type="password"
                        onChange={(e: any) => handleChange('password', e.target.value)}
                        value={vm.password}
                        label="Password"
                        meta="(required)"
                        data-cy="vm_password"
                        variant={returnPasswordVariant()}
                        inputIcon={
                            <div style={{ position: 'relative', right: '4px', bottom: '4px' }}>
                                <Tooltip
                                    title="The value must be between 12 and 123 characters long. Must contain one special character, one number and one uppercase letter"
                                    placement={'right'}
                                >
                                    <Icon name="info_circle" size={24} color="#6F6F6F" />
                                </Tooltip>
                            </div>
                        }
                    />
                </div>
            </div>
            <SizeFilterWrapper>
                <UnstyledList>
                    <HardWareReqWrapper>Hardware requirements</HardWareReqWrapper>
                    <li>
                        <Checkbox
                            label="High memory"
                            onChange={(e: any) => handleCheck(sizeType.memory, e.target.checked)}
                            enterKeyHint="Filter memory"
                        />
                    </li>
                    <li>
                        <Checkbox
                            label="High GPU"
                            onChange={(e: any) => handleCheck(sizeType.gpu, e.target.checked)}
                            enterKeyHint="Filter GPU"
                        />
                    </li>
                    <li>
                        <Checkbox
                            label="High CPU"
                            onChange={(e: any) => handleCheck(sizeType.compute, e.target.checked)}
                            enterKeyHint="Filter CPU"
                        />
                    </li>
                </UnstyledList>
                <HelperTextWrapper>
                    Specifying hardware requirements will affect which options you can choose between for size. Leave
                    empty if you have no special requirements.
                </HelperTextWrapper>
            </SizeFilterWrapper>
            <CoreDevDropdown
                label="VM size"
                options={filterSizes(sizes)}
                width={width}
                onChange={handleDropdownChange}
                name="size"
                data-cy="vm_size"
                meta="(required)"
                useOverflow
                tabIndex={0}
            />
            <CoreDevDropdown
                label="Operating system"
                options={os}
                width={width}
                onChange={handleDropdownChange}
                name="operatingSystem"
                data-cy="vm_operatingSystem"
                meta="(required)"
                useOverflow
                tabIndex={0}
            />
            <CoreDevDropdown
                label="Data disk"
                options={disks}
                width={width}
                onChange={handleDropdownChange}
                name="dataDisks"
                data-cy="vm_dataDisks"
                meta="(required)"
                useOverflow
                tabIndex={0}
            />
            <div>
                <Label>Estimated total</Label>
                <Typography variant="h6">
                    {' '}
                    {vmEstimatedCost ? '$' + roundUp(vmEstimatedCost, 10) + '/month' : '-'}
                </Typography>
            </div>
            <div>
                <Tooltip
                    title={!validateUserInput() && !loading ? 'Please fill out all required fields' : ''}
                    placement="right"
                >
                    <Button
                        style={{ width: '100px', marginLeft: 'auto' }}
                        data-cy="create_vm"
                        onClick={createVm}
                        disabled={!validateUserInput()}
                    >
                        {loading ? <DotProgress variant="green" /> : 'Create'}
                    </Button>
                </Tooltip>
            </div>
        </Wrapper>
    );
};

export default AddNewVm;
