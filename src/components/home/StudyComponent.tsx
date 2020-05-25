import React, { useState } from 'react';
import styled from 'styled-components';

const Dot = styled.span`
    height: 100px;
    width: 100px;
    background-color: #EAEAEA;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    color: #FFFFFF;
    line-height: 100px;
    font-size:3em;
  `;

const Title = styled.span`
   margin-left:30px;
   font-weight: bold;
  `;

const Description = styled.span`
    float:right;
  `;

const SmallText = styled.span`
    font-size:10px;
  `;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(100px,350px) 1fr;
    width: 100%;
    grid-gap: 10px;
`;
//repeat(auto-fit,minmax(100px,1fr));
const StudyComponent = (props: any) => {
  return (
    <div style={{ backgroundColor: "white", marginLeft: "20px", marginBottom: "10px", display: "flex", borderRadius: "4px", padding: "16px", minWidth: "120px" }}>
      <Wrapper>
        <div>
          <Dot style={{ float: "left" }}>SP</Dot>
          <Title>{props.name}</Title>
        </div>

        <p>{props.description}</p>
      </Wrapper>
    </div>
  )
}

export default StudyComponent; 