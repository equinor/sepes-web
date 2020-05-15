import React, { useState } from 'react';
import { Card, Container } from '@equinor/eds-core-react'
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
  `;

  const Description = styled.span`
    float:right;
  `;

const StudyComponent = (props:any) => {
    return (
        <Card style={{backgroundColor: "white", marginLeft: "20px", marginBottom: "20px", float: "left", display: "flex", borderRadius: "4px"}}>
            <Dot>SP</Dot><Title>{props.name}</Title>      
            
            
            
        </Card>
    )
}

/*
<div>
                <div style={{width:"10%"}}>
                    
                </div>
                <div style={{width:"20%"}}>
                    
                </div>
                <div style={{width:"69%"}}>
                    
                </div>
                
            </div>
*/
export default StudyComponent; 