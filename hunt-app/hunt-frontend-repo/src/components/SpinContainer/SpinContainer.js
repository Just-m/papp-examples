import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Styled = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const SpinContainer = () => {
  return (
    <Styled>
      <Spin indicator={antIcon} />
    </Styled>
  );
};

SpinContainer.propTypes = {};

export default React.memo(SpinContainer);
