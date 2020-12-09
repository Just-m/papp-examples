import { fork } from 'redux-saga/effects';
import watchAllSaga from './watchers';

export default function* startForman() {
  yield fork(watchAllSaga);
}