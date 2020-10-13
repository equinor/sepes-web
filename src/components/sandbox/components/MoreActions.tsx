import React, { useState } from 'react';
import styled from 'styled-components';
import { EquinorIcon } from '../../common/StyledComponents';

let mockVms = [
    {
        id: 1,
        name: 'VM123'
    },
    {
        id: 2,
        name: 'VM321'
    }
];

const Wrapper = styled.div`
    position: absolute;
    background-color: #ffffff;
    box-shadow: 0 0 4px 4px #E7E7E7;
    width: 240px;
    border-radius: 4px;
    margin-Top: 40px;
    display:grid;
    grid-template-rows: 1fr 1fr;
  `;

const Item = styled.div<{color:string}>`
  padding: 24px;
  color: ${(props: any) => (props.color)};
  z-index:99;
  display: grid;
  grid-template-columns: 24px 1fr;
  text-align:left;
  grid-gap: 16px;
  cursor: pointer;
  &:hover {
      background-color: #D5EAF4;
  }
`;

const ItemText = styled.div`
    margin-top: 4px;
  `;


type MoreActionsProps = {

};

const MoreActions: React.FC<MoreActionsProps> = ({  }) => {


    return (
        <Wrapper>
            <Item color="#000000">{EquinorIcon('key', '#6F6F6F', 24, () => {}, true)}<ItemText>Reset password</ItemText></Item>
            <Item color="#EB0000">{EquinorIcon('delete_forever', '#EB0000', 24, () => {}, true)}<ItemText>Delete virtual machine</ItemText></Item>
        </Wrapper>
    )
}

export default MoreActions;
