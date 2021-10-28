import {all, fork} from 'redux-saga/effects';
import {getUser, signUp, updateUser} from './accountSaga';

export default function* rootSaga() {
  yield all([fork(signUp), fork(getUser), fork(updateUser)]);
}
