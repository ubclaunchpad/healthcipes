import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {API_URL} from '@env';
import {GET_RECIPE, RECIPE} from '../actions/recipeActions';

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

export function* getRecipe() {
  yield takeLatest(GET_RECIPE, getRecipeCall);
}
