import React, { useState } from 'react';
import { Button} from '@equinor/eds-core-react';
import SandboxTable from '../common/customComponents/SandboxTable';
import { EquinorIcon } from '../common/StyledComponents';
import CreateSandboxComponent from './CreateSandboxComponent';
import { ParticipantObj } from '../common/interfaces';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  float:right;
  marginBottom: 19px;
  z-index:99;
`;

type SandboxComponentProps = {
    sandboxes:any,
    setStudy:any
  };

const SandboxComponent: React.FC<SandboxComponentProps> = ({ sandboxes, setStudy }) => {
    const [toggle, setToggle] = useState<boolean>(false);
    return (
        <div>
            <DropdownWrapper>
                <Button
                    variant="outlined"
                    style={{ width: '200px', marginBottom: '16px' }}
                    onClick={() => setToggle(!toggle)}
                    >Create sandbox
                {EquinorIcon("arrow_drop_down","#007079", 24)}
                </Button>
                {toggle && <CreateSandboxComponent setToggle={setToggle} setStudy={setStudy} /> }
            </DropdownWrapper>
            <SandboxTable
                sandboxes={sandboxes}
            />
        </div>
    )
}

export default SandboxComponent;