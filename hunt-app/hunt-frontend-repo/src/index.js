import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './containers/App.css';
import { Provider } from 'react-redux';
import App from './containers/App';
import getConfigStore from './store/configureStore';
import './index.css';
import ReactGA from 'react-ga';
import { BrowserRouter } from 'react-router-dom';
import { ENVS } from './configs';
import rootSaga from './sagas';

ReactGA.initialize('UA-147717164-1');

const { store, persistor, saga } = getConfigStore;
saga.run(rootSaga);

const render = (Component) => {
  return ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  );
};

if (module.hot && ENVS.isDev) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    ReactDOM.render(NextApp);
  });
}
render(App);
