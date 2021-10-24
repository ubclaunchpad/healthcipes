import {all, fork} from 'redux-saga/effects';
import {signUp} from './accountSaga';

export default function* rootSaga() {
  yield all([fork(signUp)]);
}
