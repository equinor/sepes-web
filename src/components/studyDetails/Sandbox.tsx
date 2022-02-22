import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from '@equinor/eds-core-react';
import SandboxTable from './Tables/SandboxTable';
import { EquinorIcon } from '../common/StyledComponents';
import CreateSandboxComponent from './CreateSandbox';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
    float: right;
    margin-left: auto;
    margin-top: 32px;
    z-index: 99;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 45px minmax(299px, 1fr);
    width: 100%;
`;

type SandboxComponentProps = {
    setHasChanged: any;
    setUpdateCache: any;
    updateCache: any;
    disabled: boolean;
    wbsIsValid: boolean | undefined;
    onFallBackAddressChange: any;
};

const Sandbox: React.FC<SandboxComponentProps> = ({
    setHasChanged,
    setUpdateCache,
    updateCache,
    disabled,
    wbsIsValid,
    onFallBackAddressChange
}) => {
    const [toggle, setToggle] = useState<boolean>(false);

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
            <DropdownWrapper>
                <div style={{ marginBottom: '24px' }}>
                    <Tooltip
                        title={disabled ? 'You do not have access to create a study specific data set' : ''}
                        placement="left"
                    >
                        <Button
                            variant="outlined"
                            onClick={() => setToggle(!toggle)}
                            data-cy="create_sandbox"
                            disabled={disabled}
                            style={{ width: '200px' }}
                            data-testid="study_add_sandbox"
                        >
                            <span style={{ marginLeft: '16px', marginRight: '16px' }}>Create sandbox</span>
                            {EquinorIcon('arrow_drop_down', '#007079', 24)}
                        </Button>
                    </Tooltip>
                </div>
                {toggle && (
                    <CreateSandboxComponent
                        setHasChanged={setHasChanged}
                        setToggle={setToggle}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                        wbsIsValid={wbsIsValid}
                    />
                )}
            </DropdownWrapper>
            <div style={{ marginTop: '42px' }}>
                <SandboxTable onFallBackAddressChange={onFallBackAddressChange} editMode />
            </div>
        </Wrapper>
    );
};

export default Sandbox;
