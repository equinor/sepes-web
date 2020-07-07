import React from 'react';
import { Button} from '@equinor/eds-core-react';
import SandboxTable from '../common/customComponents/SandboxTable';

const SandboxComponent = (props: any) => {

    return (
        <div>
            <Button variant="outlined" style={{ float: 'right', marginBottom: '19px' }}>Add resource</Button>
            <SandboxTable
                sandboxes={props.sandboxes}
            />
        </div>
    )
}

export default SandboxComponent;