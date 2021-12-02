import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {API_URL} from '@env';
import {
  GET_RECIPE_LIKE,
  GET_RECIPE,
  RECIPE,
  POST_RECIPE_LIKE,
  POST_RECIPE_VIEW,
} from '../actions/recipeActions';

function* getRecipeCall(param) {
  try {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/recipe/${param.recipe_id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: GET RECIPE API:');

    // console.log(results);
    yield put({type: RECIPE, payload: results.data});
  } catch (e) {
    console.log('Get Feed Failed: ' + e);
  }
}

function* getRecipeLikeCall(param) {
  try {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/user_activity/userID=${param.user_id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: GET USER ACTIVITY API:');
    // yield put({type: RECIPE, payload: results.data}); TODO: This RECIPE action overwrites the actual recipe information data!! Need a new action for this
  } catch (e) {
    console.log('Registering like failed: ' + e);
  }
}

function* postRecipeLikeCall(data) {
  try {
    const apiConfig = {
      method: 'post',
      url: `${API_URL}/user_activity/`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        user_id: data.user_id,
        activity_type: 'RECIPE_LIKE',
        recipe_like_id: data.recipe_like_id,
      },
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: POST USER ACTIVITY API:');
    // yield put({type: RECIPE, payload: results.data}); TODO: This RECIPE action overwrites the actual recipe information data!! Need a new action for this
  } catch (e) {
    console.log('Registering like failed: ' + e);
  }
}

function* postRecipeViewCall(data) {
  try {
    const apiConfig = {
      method: 'post',
      url: `${API_URL}/user_activity/`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        user_id: data.user_id,
        activity_type: 'RECIPE_VIEW',
        recipe_like_id: data.recipe_view_id,
      },
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: POST USER ACTIVITY API:');
    // console.log(results);
    // yield put({type: RECIPE, payload: results.data}); TODO: This RECIPE action overwrites the actual recipe information data!! Need a new action for this
  } catch (e) {
    console.log('Registering like failed: ' + e);
  }
}

export function* getRecipe() {
  yield takeLatest(GET_RECIPE, getRecipeCall);
}

export function* postRecipeLike() {
  yield takeLatest(POST_RECIPE_LIKE, postRecipeLikeCall);
}

export function* getRecipeLike() {
  yield takeLatest(GET_RECIPE_LIKE, getRecipeLikeCall);
}

export function* postRecipeView() {
  yield takeLatest(POST_RECIPE_VIEW, postRecipeViewCall);
}
