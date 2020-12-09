import React from 'react';
import ErrorBoundary from '@components/ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionFetchSpinData,
  spinSelector,
} from './Spin.reducer';
import SpinContainer from '@components/SpinContainer';

const enhance = (WrappedComp) => (props) => {
  const dispatch = useDispatch();
  const spin = useSelector(spinSelector);
  React.useEffect(() => {
    dispatch(actionFetchSpinData());
  }, []);
  if (spin.isFetching) {
    return <SpinContainer />;
  }
  return (
    <ErrorBoundary>
      <WrappedComp {...props} />
    </ErrorBoundary>
  );
};

export default enhance;
