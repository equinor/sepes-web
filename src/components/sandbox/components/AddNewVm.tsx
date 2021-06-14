import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Checkbox, Icon, Tooltip, DotProgress, Label } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { returnLimitMeta, roundUp } from '../../common/helpers/helpers';
import {
    validateUserInput,
    filterSizes,
    returnPasswordVariant,
    returnUsernameVariant
} from '../../common/helpers/sandboxHelpers';
import CoreDevDropdown from '../../common/customComponents/Dropdown';
import { createVirtualMachine, getVmName, getVirtualMachineCost, validateVmUsername } from '../../../services/Api';
import {
    SandboxObj,
    DropdownObj,
    SizeObj,
    OperatingSystemObj,
    VmObj,
    VmUsernameObj,
    CalculateNameObj
} from '../../common/interfaces';
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
    const [usernameHelpText, setUsernameHelpText] = useState<string>(
        'You need to pick operating system before username'
    );
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
    }, [vm.username, vm.operatingSystem]);

    const handleDropdownChange = (value, name: string): void => {
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
            if (result && !result.message) {
                getResources();
                const vmsList: any = [...vms];
                vmsList.push(result);
                setVms(vmsList);
                setActiveTab(vmsList.length);
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

    const validateUsername = (value: string) => {
        if (value === '') {
            setUsernameIsValid(false);
            return;
        }

        let operatingSystemType = '';
        os.forEach((operatingSystem: OperatingSystemObj) => {
            if (operatingSystem.key === vm.operatingSystem) {
                operatingSystemType = operatingSystem.category;
            }
        });
        const username: VmUsernameObj = { username: value, operativeSystemType: operatingSystemType };
        validateVmUsername(username).then((result: any) => {
            if (result) {
                setUsernameIsValid(result.isValid);
                if (!result.isValid) {
                    setUsernameHelpText(result.errorMessage);
                    //notify.show('danger', '500', result.errorMessage);
                } else {
                    setUsernameHelpText('');
                }
            } else {
                setUsernameIsValid(false);
            }
        });
    };

    const handleCheck = (column: string, checked: any) => {
        const currentFilter: any = [...filter];
        if (checked) {
            currentFilter.push(column);
        } else {
            currentFilter.splice(filter.indexOf(column), 1);
        }
        setFilter(currentFilter);
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
                            <Icon name="info_circle" />
                        </Tooltip>
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
                        variant={returnPasswordVariant(vm.password)}
                        inputIcon={
                            <Tooltip
                                title="The value must be between 12 and 123 characters long. Must contain one special character, one number and one uppercase letter"
                                placement="right"
                            >
                                <Icon name="info_circle" />
                            </Tooltip>
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
                        />
                    </li>
                    <li>
                        <Checkbox label="High GPU" onChange={(e: any) => handleCheck(sizeType.gpu, e.target.checked)} />
                    </li>
                    <li>
                        <Checkbox
                            label="High CPU"
                            onChange={(e: any) => handleCheck(sizeType.compute, e.target.checked)}
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
                options={filterSizes(sizes, filter)}
                width={width}
                onChange={handleDropdownChange}
                name="size"
                data-cy="vm_size"
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
                useOverflow
                tabIndex={0}
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
                <Tooltip
                    title={
                        !validateUserInput(vm, loading, vmEstimatedCost, usernameIsValid) && !loading
                            ? 'Please fill out all required fields'
                            : ''
                    }
                    placement="right"
                >
                    <Button
                        style={{ width: '100px', marginLeft: 'auto' }}
                        data-cy="create_vm"
                        onClick={createVm}
                        disabled={!validateUserInput(vm, loading, vmEstimatedCost, usernameIsValid)}
                    >
                        {loading ? <DotProgress color="primary" /> : 'Create'}
                    </Button>
                </Tooltip>
            </div>
        </Wrapper>
    );
};

export default AddNewVm;
