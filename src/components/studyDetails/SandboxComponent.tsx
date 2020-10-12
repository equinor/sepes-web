import React, { useState } from 'react';
import { Button} from '@equinor/eds-core-react';
import SandboxTable from '../common/customComponents/SandboxTable';
import { EquinorIcon } from '../common/StyledComponents';
import CreateSandboxComponent from './CreateSandboxComponent';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  float:right;
  margin-left:auto;
  margin-top: 32px;
  z-index:99;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 45px minmax(291px, 1fr);
    width: 100%;
`;

type SandboxComponentProps = {
    sandboxes:any,
    setStudy:any
  };

const SandboxComponent: React.FC<SandboxComponentProps> = ({ sandboxes, setStudy }) => {
    const [toggle, setToggle] = useState<boolean>(false);
    return (
        <Wrapper>
            <DropdownWrapper>
                <Button
                    variant="outlined"
                    style={{ width: '200px', marginBottom: '24px' }}
                    onClick={() => setToggle(!toggle)}
                    >Create sandbox
                {EquinorIcon("arrow_drop_down","#007079", 24)}
                </Button>
                {toggle && <CreateSandboxComponent setToggle={setToggle} setStudy={setStudy} /> }
            </DropdownWrapper>
            <div style={{ marginTop: '42px' }}>
                <SandboxTable
                    sandboxes={sandboxes}
                />
            </div>
        </Wrapper>
    )
}

export default SandboxComponent;