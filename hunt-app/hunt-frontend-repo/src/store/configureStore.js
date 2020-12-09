import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import { ENVS } from '@configs';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web;

const configureStore = () => {
  const saga = createSagaMiddleware();
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
    blacklist: ['spin'],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const middleware = applyMiddleware(thunk, saga);
  const composedEnhancers = ENVS.isDev
    ? composeWithDevTools(middleware)
    : middleware;
  const store = createStore(persistedReducer, composedEnhancers);
  let persistor = persistStore(store);
  return {
    store,
    persistor,
    saga,
  };
};

export default configureStore();
