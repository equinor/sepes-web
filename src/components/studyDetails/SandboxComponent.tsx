import React, { useState, useEffect } from 'react';
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
    grid-template-rows: 45px minmax(340px, 1fr);
    width: 100%;
`;

type SandboxComponentProps = {
    sandboxes:any,
    setStudy:any,
    setHasChanged:any
  };

const SandboxComponent: React.FC<SandboxComponentProps> = ({ sandboxes, setStudy, setHasChanged }) => {
    const [toggle, setToggle] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener("keydown", listener, false);
        return () => {
          document.removeEventListener("keydown", listener, false);
      }
    }, []);
    
      const listener = (e: any) => {
        if (e.key === 'Escape') {
            setToggle(false);
        }
      }

    return (
        <Wrapper>
            <DropdownWrapper>
                <Button
                    variant="outlined"
                    style={{ width: '200px', marginBottom: '24px' }}
                    onClick={() => setToggle(!toggle)}
                    data-cy="create_sandbox"
                    >Create sandbox
                {EquinorIcon("arrow_drop_down","#007079", 24)}
                </Button>
                {toggle && <CreateSandboxComponent setHasChanged={setHasChanged} setToggle={setToggle} setStudy={setStudy} /> }
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