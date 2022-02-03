import {takeLatest, call, put, all} from 'redux-saga/effects';
import axios from 'axios';
import {API_URL} from '@env';
import {
  ADD_INGREDIENT,
  GET_ALL_INGREDIENTS,
  GET_PANTRY,
  INGREDIENTS,
  PANTRY_ADD,
  PANTRY_REMOVE,
  REMOVE_INGREDIENT,
  SEARCH_INGREDIENTS,
} from '../actions/pantryActions';

function* addToPantry(param) {
  yield put({
    type: PANTRY_ADD,
    payload: {category: param.category, name: param.name, id: param.id},
  });
}

function* deleteFromPantry(param) {
  yield put({
    type: PANTRY_REMOVE,
    payload: {category: param.category, name: param.name, id: param.id},
  });
}

function* getPantryCall(param) {
  try {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/pantry?user_id=${param.userID}&pantry_id`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: GET PANTRY API:');

    yield all(
      results.data.map(item => {
        const category = item[2];
        const name = item[1];
        const id = item[0];
        return call(addToPantry, {category, name, id});
      }),
    );
  } catch (e) {
    console.log('Get Pantry Failed: ' + e);
  }
}

function* getAllIngredientsCall() {
  try {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/pantry/ingredients`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: GET ALL INGREDIENTS API:');

    yield put({type: INGREDIENTS, payload: results.data});
  } catch (e) {
    console.log('Get All Ingredients Failed: ' + e);
  }
}

function* searchIngredientsCall(param) {
  try {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/pantry/ingredients?keyword=${param.keyword}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: SEARCH INGREDIENTS API:');

    yield put({type: INGREDIENTS, payload: results.data});
  } catch (e) {
    console.log('Search Ingredients Failed: ' + e);
  }
}

function* addIngredientCall(param) {
  try {
    const data = JSON.stringify({
      user_id: param.payload.userID,
      ingredient_id: param.payload.item[0],
    });
    const apiConfig = {
      method: 'post',
      url: `${API_URL}/pantry`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: ADD TO PANTRY API: ' + results.status_code);

    yield call(addToPantry, {
      category: param.payload.item[2],
      name: param.payload.item[1],
      id: param.payload.item[0],
    });
  } catch (e) {
    console.log('POST Pantry Failed: ' + e);
  }
}

function* removeIngredientCall(param) {
  try {
    const data = JSON.stringify({
      user_id: param.payload.userID,
      ingredient_id: param.payload.item.id,
    });
    const apiConfig = {
      method: 'delete',
      url: `${API_URL}/pantry`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: DELETE FROM PANTRY API: ' + results.status_code);

    yield call(deleteFromPantry, {
      category: param.payload.item.category,
      name: param.payload.item.name,
      id: param.payload.item.id,
    });
  } catch (e) {
    console.log('DELETE Pantry Failed: ' + e);
  }
}

export function* getPantry() {
  yield takeLatest(GET_PANTRY, getPantryCall);
}

export function* getAllIngredients() {
  yield takeLatest(GET_ALL_INGREDIENTS, getAllIngredientsCall);
}

export function* searchIngredients() {
  yield takeLatest(SEARCH_INGREDIENTS, searchIngredientsCall);
}

export function* addIngredient() {
  yield takeLatest(ADD_INGREDIENT, addIngredientCall);
}

export function* removeIngredient() {
  yield takeLatest(REMOVE_INGREDIENT, removeIngredientCall);
}
