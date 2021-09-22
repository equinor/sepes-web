import React from 'react';
import styled from 'styled-components';
import { Typography, Icon } from '@equinor/eds-core-react';
import CustomLogoComponent from '../common/customComponents/CustomLogoComponent';
import { StudyObj } from '../common/interfaces';
import { useHistory } from 'react-router-dom';
import { truncate } from 'components/common/helpers/helpers';
import truncateLength from 'components/common/staticValues/lenghts';

const SmallText = styled.div`
    font-size: 10px;
    display: inline-block;
`;

const HiddenWrapper = styled.div`
    display: grid;
    grid-template-columns: 48px 10px;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(216px,350px) minmax(200px,1fr);
    grid-gap: 96px;
    border-radius:4px;
    padding: 16px;
    min-width:120px;
    margin: 0 0px 16px 32px;
    cursor: pointer;
    background-color: #ffffff;
    @media (max-width: 385px) {
      grid-template-columns: minmax(116px,200px) 1fr;
      margin: 0 0 16px 0;
      grid-gap: 8px;
    }
    @media (max-width: 768px) {
      margin: 0 32px 16px 32px;
      grid-gap: 32px;

    }
    @media (max-width: 540px) {
      display:block;
      margin: 0 0 16px 0;
      min-width:200px;

    }
  }
`;

const LogoTitleWrapper = styled.div`
    display: grid;
    grid-gap: 40px;
    grid-template-columns: 125px 1fr;
    @media (max-width: 385px) {
      display: block;
      margin: 0 0 16px 0;
  }
  }
`;

type StudyComponentProps = {
    study: StudyObj;
};

const StudyComponent: React.FC<StudyComponentProps> = ({ study }) => {
    const { name, description, restricted, id, vendor, logoUrl } = study;
    const url = '/studies/' + id;
    const history = useHistory();

    return (
        <Wrapper onClick={() => history.push({ pathname: url, state: { userCameFromHome: true } })}>
            <LogoTitleWrapper>
                <CustomLogoComponent logoUrl={logoUrl} center />
                <div>
                    <Typography variant="h6">{truncate(name, truncateLength)}</Typography>
                    <SmallText>{truncate(vendor, truncateLength)}</SmallText>
                    <HiddenWrapper>
                        <SmallText style={{ marginTop: '4px' }}>{restricted ? 'Hidden' : 'Not hidden'}</SmallText>
                        <div>
                            <Icon
                                color="#007079"
                                name={restricted ? 'visibility_off' : 'visibility'}
                                size={16}
                                style={{ marginLeft: '4px' }}
                            />
                        </div>
                    </HiddenWrapper>
                </div>
            </LogoTitleWrapper>
            <div>
                <Typography variant="body_long">{description}</Typography>
            </div>
        </Wrapper>
    );
};

export default StudyComponent;
