import { combineReducers } from 'redux';
import login from './loginReducer';
import preload from './preloadReducer';
import hunt from './huntReducer';
import spin from '@routes/spin/Spin.reducer';
import { modalReducer as modal } from '@components/Modal';

const rootReducer = combineReducers({
  login,
  preload,
  hunt,
  spin,
  modal,
});

export default rootReducer;
