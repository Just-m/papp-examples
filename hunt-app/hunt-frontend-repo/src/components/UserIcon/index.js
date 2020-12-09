import React from 'react';
import styled from 'styled-components';
import srcIcon from '@assets/icons/icon_user.png';

const Styled = styled.img`
  width: 14px;
  height: 16px;
  @media only screen and (max-width: 376px) {
    width: 12px;
    height: 14px;
  }
`;

const UserIcon = (props) => {
  return <Styled className='user-icon' src={srcIcon} alt='' />;
};

UserIcon.propTypes = {};

export default React.memo(UserIcon);
