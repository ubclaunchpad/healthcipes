import {all, fork} from 'redux-saga/effects';
import {getUser, signUp, updateUser} from './accountSaga';
import {getFeed, searchFeed} from './feedSaga';
import {getRecipe} from './recipeSaga';

export default function* rootSaga() {
  yield all([
    fork(signUp),
    fork(getUser),
    fork(updateUser),
    fork(getFeed),
    fork(searchFeed),
    fork(getRecipe),
  ]);
}
