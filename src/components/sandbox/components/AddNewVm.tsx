import React, { useState } from 'react';
import { TextField, Radio } from '@equinor/eds-core-react';
import styled from 'styled-components';

type AddNewVmProps = {
    
};

const Wrapper = styled.div`
    height: 400px;
    padding: 16px;
    display:grid;
    grid-template-rows: 1fr 3fr 1fr;
    grid-gap: 16px;
  `;

  const UnstyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`

const AddNewVm: React.FC<AddNewVmProps> = ({  }) => {
    const [checked, updateChecked] = useState('one')
    const onChange = (event) => {
    updateChecked(event.target.value)
  }
    return (
        <Wrapper>
            <TextField
                name='name'
                placeholder="Name"
                onChange={() => {}}
                value={() => {}}
                label="Name"
                meta=""
                style={{ width: '300px' }}
            />
            <UnstyledList>
                <li>
                <Radio
                label="General stuff"
                name="group"
                value="one"
                checked={checked === 'one'}
                onChange={onChange}
                />
            </li>
            <li>
                <Radio
                label="High memory"
                name="group"
                value="two"
                checked={checked === 'two'}
                onChange={onChange}
                />
            </li>
            <li>
                <Radio
                label="High GPU"
                name="group"
                value="three"
                checked={checked === 'three'}
                onChange={onChange}
                />
            </li>
            <li>
                <Radio
                label="High CPU"
                name="group"
                value="three"
                checked={checked === 'three'}
                onChange={onChange}
                />
            </li>
          </UnstyledList>
            <TextField
                name='storage'
                placeholder="Storage"
                onChange={() => {}}
                value={() => {}}
                label="Storage"
                meta=""
                style={{ width: '300px' }}
            />
        </Wrapper>
    )
}

export default AddNewVm;
