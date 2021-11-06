import {all, fork} from 'redux-saga/effects';
import {getUser, signUp, updateUser} from './accountSaga';
import {filterFeed, getFeed, searchFeed} from './feedSaga';

export default function* rootSaga() {
  yield all([
    fork(signUp),
    fork(getUser),
    fork(updateUser),
    fork(getFeed),
    fork(searchFeed),
    fork(filterFeed),
  ]);
}
