import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {API_URL} from '@env';
import {
  GET_RECIPE_LIKE,
  GET_RECIPE,
  RECIPE,
  VIDEO_RECIPE,
  POST_RECIPE_LIKE,
  POST_RECIPE_VIEW,
  REGISTER_LIKE_RECIPE,
  REGISTER_VIEW_RECIPE,
  LIKE_RECIPE,
  POST_RECIPE,
  POST_VIDEO_URL,
  PUT_RECIPE,
  DELETE_RECIPE,
} from '../actions/recipeActions';
import { GET_FEED } from '../actions/feedActions';

function* postRecipeCall(param) {
  try {
    const apiConfig = {
      method: 'post',
      url: `${API_URL}/recipe`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        recipe: param.recipeObj,
        steps: param.steps,
        ingredients: param.ingredients,
      },
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: POST RECIPE API:');

    console.log(results);
  } catch (e) {
    console.log('Post Recipe Failed: ' + e);
  }
}

function* postVideoURLCall(param) {
  try {
    const apiConfig = {
      method: 'post',
      url: `${API_URL}/recipe/video`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: param.payload.recipe_name,
        url: param.payload.url,
        recipe_description: param.payload.recipe_description
      }
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: POST VIDEO URL API:');

    console.log(results);
    yield put({type: VIDEO_RECIPE, payload: results});
  } catch (e) {
    console.log('Post Video URL Failed: ' + e);
  }
}

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
    console.log('Get Recipe Failed: ' + e);
  }
}

function* deleteRecipeCall(param) {
  try {
    const apiConfig = {
      method: 'delete',
      url: `${API_URL}/recipe/${param.recipe_id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    yield call(axios, apiConfig);
    console.log('[INFO]: DELETE RECIPE API:');

    // console.log(results);
    yield put({type: GET_FEED, user: param.user, startIndex: param.startIndex});
  } catch (e) {
    console.log('Delete Recipe Failed: ' + e);
  }
}

function* putRecipeCall(param) {
  try {
    const apiConfig = {
      method: 'put',
      url: `${API_URL}/recipe`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        recipe: param.recipeObj,
        steps: param.steps,
      },
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: PUT RECIPE API:');

    console.log(results);
  } catch (e) {
    console.log('Put Recipe Failed: ' + e);
  }
}

function* getRecipeLikeCall(param) {
  try {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/user_activity/recipe_like/userID=${param.user_id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: GET USER ACTIVITY API:');
    yield put({type: LIKE_RECIPE, payload: results.data});
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
    console.log('[INFO]: POST RECIPE LIKE');

    yield put({type: REGISTER_LIKE_RECIPE, payload: results.data});
    yield put({type: LIKE_RECIPE, payload: results.data});
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
    console.log('[INFO]: POST RECIPE VIEW:');
    // console.log(results);
    yield put({type: REGISTER_VIEW_RECIPE, payload: results.data});
    // TODO: This RECIPE action overwrites the actual recipe information data!! Need a new action for this
  } catch (e) {
    console.log('Registering like failed: ' + e);
  }
}



export function* postRecipe() {
  yield takeLatest(POST_RECIPE, postRecipeCall);
}

export function* getRecipe() {
  yield takeLatest(GET_RECIPE, getRecipeCall);
}

export function* deleteRecipe() {
  yield takeLatest(DELETE_RECIPE, deleteRecipeCall);
}

export function* putRecipe() {
  yield takeLatest(PUT_RECIPE, putRecipeCall);
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

export function* postVideoURL() {
  yield takeLatest(POST_VIDEO_URL, postVideoURLCall);
}
