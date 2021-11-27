import {all, fork} from 'redux-saga/effects';
import {getUser, signUp, updateUser} from './accountSaga';
import {getFeed, searchFeed} from './feedSaga';
import {
  addIngredient,
  getAllIngredients,
  getPantry,
  removeIngredient,
} from './pantrySaga';
import {getRecipe, postRecipeLike, postRecipeView} from './recipeSaga';

export default function* rootSaga() {
  yield all([
    fork(signUp),
    fork(getUser),
    fork(updateUser),
    fork(getFeed),
    fork(searchFeed),
    fork(getRecipe),
    fork(postRecipeLike),
    fork(postRecipeView),
    fork(getPantry),
    fork(getAllIngredients),
    fork(addIngredient),
    fork(removeIngredient),
  ]);
}
