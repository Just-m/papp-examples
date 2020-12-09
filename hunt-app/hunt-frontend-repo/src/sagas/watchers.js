import { takeLatest, all } from 'redux-saga/effects';
import { loginSaga } from './authenticationSaga';

import * as types from '../actions';

export default function* watchAllSaga() {
  yield all([yield takeLatest(types.LOGIN_USER, loginSaga)]);
}
