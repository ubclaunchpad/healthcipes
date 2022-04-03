
import { takeLatest, call, put, all } from 'redux-saga/effects';
import {API_URL} from '@env';
import axios from 'axios';
import {
  GET_GROCERY,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  GET_ALL_INGREDIENTS,
  SEARCH_INGREDIENTS,
  GROCERY_ADD,
  GROCERY_REMOVE,
  INGREDIENTS,
  ADD_RECIPE_INGREDIENT,
} from '../actions/groceryListActions';
import { SET_ALERT } from '../actions/globalActions';

function* addToGrocery(param) {
  yield put({
    type: GROCERY_ADD,
    payload: { category: param.category, name: param.name, id: param.id },
  });
}

function* deleteFromGroceryList(param) {
  yield put({
    type: GROCERY_REMOVE,
    payload: { category: param.category, name: param.name, id: param.id },
  });
}

// Getting the Grocery List: 
// Input: User ID 
// Output: Grocery List 
function* getGroceryCall(param) {
    try {
      const apiConfig = {
        method: 'get',
        url: `${API_URL}/grocery_list?user_id=${param.userID}`,
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = yield call(axios, apiConfig);
      const results = response.data;
      console.log('[INFO]: GETTING GROCERY API:');
      // console.log(results); 
      // undefined here, not sure why I am getting an undefined here for some reason.; 
      // console.log("grocery List here ----> ", results.data.grocery_list[1]); 
      yield all(
        // Failure here; 
        results.data.grocery_list.map(item => {
          const category = item.catergory;
          const name = item.name;
          const id = item.ingredient_id;
          // console.log("Catergory of the item --> ", category ); 
          // console.log("name of the item --> ", name ); 
          // console.log("ID of the item --> ", id );
          return call(addToGrocery, {category, name, id});
         
        }),
      );
      
    } catch (e) {
      console.log('Get Grocery Failed: ' + e);
      yield put({
      type: SET_ALERT,
      alert: true
    });
    }
}

function* getAllGroceriesCall() {
  try {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/grocery_list/ingredients`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: GET ALL INGREDIENTS API');

    yield put({ type: INGREDIENTS, payload: results.data });
  } catch (e) {
    console.log('Get All Ingredients Failed: ' + e);
    yield put({
      type: SET_ALERT,
      alert: true
    });
  }
}


function* searchIngredientsCall(param) {
  try {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/grocery_list/ingredients?keyword=${param.keyword}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: SEARCH INGREDIENTS API:');

    yield put({ type: INGREDIENTS, payload: results.data });
  } catch (e) {
    console.log('Search Ingredients Failed: ' + e);
    yield put({
      type: SET_ALERT,
      alert: true
    });
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
      url: `${API_URL}/grocery_list`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: ADD TO GROCERY LIST API: ' + results.status_code);

    yield call(addToGrocery, {
      category: param.payload.item[2],
      name: param.payload.item[1],
      id: param.payload.item[0],
    });
  } catch (e) {
    console.log('POST Grocery List Failed ' + e);
    yield put({
      type: SET_ALERT,
      alert: true
    });
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
      url: `${API_URL}/grocery_list`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO: DELETE FROM GROCERY LIST API: ' + results.status_code);

    yield call(deleteFromGroceryList, {
      category: param.payload.item.category,
      name: param.payload.item.name,
      id: param.payload.item.id,
    });
  } catch (e) {
    console.log('DELETE Grocery List Failed: ' + e);
    yield put({
      type: SET_ALERT,
      alert: true
    });
  }
}

function* addRecipeIngredientCall(param) {
  try {
    yield all(
      param.payload.ingredients.map(item => {
        return addIngredientCall({
          payload: {
            userID: param.payload.userID,
            item: {
              category: item.category,
              name: item.ingredient_name,
              id: item.ingredient_id,
            },
          },
        });
      }),
    );
  } catch (e) {
    console.log('ADD All Recipe Ingredient Failed: ' + e);
  }
}

export function* getGroceryList() {
  yield takeLatest(GET_GROCERY, getGroceryCall);
}

export function* getAllIngredients() {
  yield takeLatest(GET_ALL_INGREDIENTS, getAllGroceriesCall);
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

export function* addRecipeIngredient() {
  yield takeLatest(ADD_RECIPE_INGREDIENT, addRecipeIngredientCall);
}
