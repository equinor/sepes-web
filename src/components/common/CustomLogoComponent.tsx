import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getImage } from '../../services/BlobStorage';

const Logo = styled.img`
height: 125px;
width: 125px;
display: inline-block;
@media (max-width: 768px) {
  display: block;
  height: 100px;
  width: 100px;
}
`;

const Dot = styled.span`
    height: 125px;
    width: 125px;
    background-color: #EAEAEA;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    color: #FFFFFF;
    line-height: 125px;
    font-size:3em;
  `;

const CustomLogoComponent = (props: any) => {
    const [logoUrl, setLogoUrl] = useState<string>('');

    useEffect(() => {
        getStudyImage();
      }, [logoUrl]);

    const getStudyImage = () => {
        //props.setLoading(true);
        if (props.logoUrl) {
        getImage(props.logoUrl).then((res) => {
          if (res) {
            setLogoUrl(res);
          }
          else {
            console.log('Error getting logo');
          }
          //props.setLoading(false);
        });
      }
      }
    return (
        logoUrl ? <Logo src={logoUrl} alt='studyLogo' /> : <Dot>SP</Dot>
    )
}

export default CustomLogoComponent;
