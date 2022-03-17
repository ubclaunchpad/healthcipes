import {takeLatest, call, put, take} from 'redux-saga/effects';
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
  POST_RECIPE_URL,
  POST_VIDEO_URL,
  PUT_RECIPE,
  DELETE_RECIPE,
  WEB_RECIPE,
  RECIPE_STEP,
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
        body: { url: param.payload.url }
      }
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: POST VIDEO URL API:');

    console.log(results);
    yield put({type: VIDEO_RECIPE, payload: results});

    console.log(results.data.recipe.name);
    console.log(results);
    const recipeObj = {
      ...results.data,
      name: results.data.recipe.name ?? "",
      recipe_description: results.data.recipe.recipe_description ?? "",
      servings: results.data.recipe.servings ?? 0,
      cooking_time: results.data.recipe.cooking_time ?? 0,
      header_image: results.data.recipe.header_image ?? "",
    };
    yield put({type: WEB_RECIPE, payload: recipeObj});

    let stepsObj = []
    let i = 0;
    results.data.steps.forEach((step) => {
      const stepObj = {
        step_index: i,
        step_image: {uri: results.data.recipe.header_image},
        step_text: step,
        step_time: 0,
        step_ingredients: results.data.ingredients,
        image_cache: {uri: results.data.recipe.header_image},
      };
      i += 1;
      stepsObj.push(stepObj);
    });
    yield put({type: RECIPE_STEP, payload: stepsObj});

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

function* postRecipeURLCall(param) {
  try {
    const apiConfig = {
      method: 'post',
      url: `${API_URL}/recipe/scrape-url?url=${param.url}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: POST RECIPE URL API:');
    console.log(results.data.recipe.name);
    console.log(results);
    const recipeObj = {
      ...results.data,
      name: results.data.recipe.name ?? "",
      recipe_description: results.data.recipe.recipe_description ?? "",
      servings: results.data.recipe.servings ?? 0,
      cooking_time: results.data.recipe.cooking_time ?? 0,
      header_image: results.data.recipe.header_image ?? "",
    };
    yield put({type: WEB_RECIPE, payload: recipeObj});

    let stepsObj = []
    let i = 0;
    results.data.steps.forEach((step) => {
      const stepObj = {
        step_index: i,
        step_image: {uri: results.data.recipe.header_image},
        step_text: step,
        step_time: 0,
        step_ingredients: results.data.ingredients,
        image_cache: {uri: results.data.recipe.header_image},
      };
      i += 1;
      stepsObj.push(stepObj);
    });
    yield put({type: RECIPE_STEP, payload: stepsObj});
  } catch (e) {
    console.log('POST Recipe URL failed: ' + e);
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

export function* postRecipeURL() {
  yield takeLatest(POST_RECIPE_URL, postRecipeURLCall);
}

export function* postVideoURL() {
  yield takeLatest(POST_VIDEO_URL, postVideoURLCall);
}
