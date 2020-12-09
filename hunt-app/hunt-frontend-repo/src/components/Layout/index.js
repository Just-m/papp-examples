import React from 'react';
import ErrorBoundary from '@components/ErrorBoundary';
import styled from 'styled-components';

const Styled = styled.div`
  margin: 0 25px;
`;

const enhance = (WrappedComp) => (props) => {
  return (
    <ErrorBoundary>
      <Styled>
        <WrappedComp {...props} />
      </Styled>
    </ErrorBoundary>
  );
};

export default enhance;
