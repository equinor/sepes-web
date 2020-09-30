import React, { useState } from 'react';
import { Button} from '@equinor/eds-core-react';
import SandboxTable from '../common/customComponents/SandboxTable';
import { EquinorIcon } from '../common/StyledComponents';
import CreateSandboxComponent from './CreateSandboxComponent';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  float:right;
  marginBottom: 19px;
  z-index:99;
`;

const SandboxComponent = (props: any) => {
    const [toggle, setToggle] = useState<boolean>(false);
    return (
        <div>
            <DropdownWrapper>
                <Button
                    variant="outlined"
                    style={{ width: '200px' }}
                    onClick= {() => setToggle(!toggle)}
                    >Add resource
                {EquinorIcon("arrow_drop_down","#007079", 24)}
                </Button>
                {toggle && <CreateSandboxComponent setToggle={setToggle} setStudy={props.setStudy} /> }
            </DropdownWrapper>
            <SandboxTable
                sandboxes={props.sandboxes}
            />
        </div>
    )
}

export default SandboxComponent;