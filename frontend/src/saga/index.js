import {all, fork} from 'redux-saga/effects';
import {getUser, signUp, updateUser, registerUserToken} from './accountSaga';
import {getFeed, searchFeed} from './feedSaga';
import {
  addIngredient,
  getAllIngredients,
  getPantry,
  removeIngredient,
  searchIngredients,
} from './pantrySaga';
import {
  getRecipe,
  postRecipe,
  postRecipeLike,
  postRecipeView,
  getRecipeURL,
} from './recipeSaga';
import {getLikedRecipes, getMyRecipes} from './profileSaga';

export default function* rootSaga() {
  yield all([
    fork(signUp),
    fork(getUser),
    fork(updateUser),
    fork(getFeed),
    fork(searchFeed),
    fork(postRecipe),
    fork(getRecipe),
    fork(postRecipeLike),
    fork(postRecipeView),
    fork(getPantry),
    fork(getAllIngredients),
    fork(addIngredient),
    fork(removeIngredient),
    fork(getLikedRecipes),
    fork(searchIngredients),
    fork(getMyRecipes),
    fork(registerUserToken),
    fork(getRecipeURL),
  ]);
}
