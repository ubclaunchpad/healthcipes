
import { takeLatest } from 'redux-saga/effects';
import {
    GET_GROCERY,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    GET_ALL_INGREDIENTS,
    SEARCH_INGREDIENTS,
    GROCERY_ADD,
    GROCERY_REMOVE,
    INGREDIENTS,
   } from '../actions/groceryListActions';
   
function* addToGrocery(param) {
  yield put({
    type: GROCERY_ADD,
    payload: {category: param.category, name: param.name, id: param.id},
  });
}

function* deleteFromGroceryList(param) {
  yield put({
    type: GROCERY_REMOVE,
    payload: {category: param.category, name: param.name, id: param.id},
  });
}

// Getting the Grocery List: 
// Input: User ID 
// Output: Grocery List 
function* getGroceryCall(param) {
    try {
      const apiConfig = {
        method: 'get',
        // MAKE SURE THE URL IS RIGHT
        // TODO: url: `${API_URL}/grocery_list?user_id=${param.userID}`,
        url: 'http://localhost:8080/grocery_list/?user_id=Qnj6AjQOLoZlJw4TZBpRE3iNz0K3',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = yield call(axios, apiConfig);
      const results = response.data;
      console.log('[INFO]: GETTING GROCERY API:');
      console.log(results); 
      console.log(results[1]); 
      yield all(
        results.data.map(item => {
          const category = item[2];
          const name = item[1];
          const id = item[0];
          console.log("Catergory of the item --> ", category ); 
          console.log("name of the item --> ", name ); 
          console.log("ID of the item --> ", id ); 
          return call(addToGrocery, {category, name, id});
         
        }),
      );
      
    } catch (e) {
      console.log('Get Grocery Failed: ' + e);
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

      yield put({type: INGREDIENTS, payload: results.data});
    } catch (e) {
      console.log('Get All Ingredients Failed: ' + e);
    }
  }

  
  function* searchIngredientsCall(param){
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
