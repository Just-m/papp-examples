import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div``;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <Styled>
          <p>Something went wrong!</p>
        </Styled>
      );
    }
    return children;
  }
}

ErrorBoundary.propsTypes = {
  children: PropTypes.any.isRequired,
};

export default ErrorBoundary;
