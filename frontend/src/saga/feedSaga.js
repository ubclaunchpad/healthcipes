import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {API_URL} from '@env';
import storage from '@react-native-firebase/storage';
import {
  FEATURED_FEED,
  FORYOU_FEED,
  GET_FEED,
  SEARCH_FEED,
  SEARCH_RESULT,
} from '../actions/feedActions';

function* searchFeedCall(param) {
  try {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/recipe?keyword=${param.keyword}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(axios, apiConfig);
    const resultsArray = response.data[0];
    console.log(
      '[INFO]: SEARCH FEED API: Recipe obtained = ' +
        resultsArray.length.toString(),
    );
    const recipeArray = [];
    for (const results of resultsArray) {
      yield storage()
        .refFromURL(results[4])
        .getDownloadURL()
        .then(res => {
          const vegetarian = param.user.vegetarian ? results[11] === 1 : true;
          const vegan = param.user.vegan ? results[12] === 1 : true;
          const pescatarian = param.user.pescatarian ? true : true;
          const gluten_free = param.user.gluten_free ? true : true;
          const dairy_free = param.user.dairy_free ? true : true;
          const keto = param.user.keto ? results[7] > 30 : true;
          const paleo = param.user.paleo ? true : true;
          if (
            vegetarian &&
            vegan &&
            pescatarian &&
            gluten_free &&
            dairy_free &&
            keto &&
            paleo
          ) {
            const recipeObj = {
              recipe_id: results[0],
              name: results[1],
              created_time: results[2],
              user_id: results[3],
              header_image: res,
              protein: results[5],
              carbs: results[6],
              fat: results[7],
              fiber: results[8],
              calories: results[9],
              servings: results[10],
              vegetarian: results[11],
              vegan: results[12],
              cooking_time: results[13],
            };
            recipeArray.push(recipeObj);
          }
        });
    }

    // console.log(recipeArray);
    yield put({type: SEARCH_RESULT, payload: recipeArray});
  } catch (e) {
    console.log('Get Feed Failed');
  }
}

function* getFullFeed(param) {
  yield getFeedCall(param);
  yield getFeaturedCall(param);
}

function* getFeedCall(param) {
  try {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/recipe`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(axios, apiConfig);
    const resultsArray = response.data[0];
    console.log(
      '[INFO]: GET FEED API: Recipe obtained = ' +
        resultsArray.length.toString(),
    );
    const recipeArray = [];
    for (const results of resultsArray) {
      yield storage()
      
        .refFromURL(results[6])
        .getDownloadURL()
        .then(res => {
          const vegetarian = param.user.vegetarian ? results[11] === 1 : true;
          const vegan = param.user.vegan ? results[12] === 1 : true;
          const pescatarian = param.user.pescatarian ? true : true;
          const gluten_free = param.user.gluten_free ? true : true;
          const dairy_free = param.user.dairy_free ? true : true;
          const keto = param.user.keto ? results[7] > 30 : true;
          const paleo = param.user.paleo ? true : true;
          if (
            vegetarian &&
            vegan &&
            pescatarian &&
            gluten_free &&
            dairy_free &&
            keto &&
            paleo
          ) {
            const recipeObj = {
              recipe_id: results[0],
              name: results[1],
              created_time: results[2],
              user_id: results[3],
              header_image: res,
              protein: results[5],
              carbs: results[6],
              fat: results[7],
              fiber: results[8],
              calories: results[9],
              servings: results[10],
              vegetarian: results[11],
              vegan: results[12],
              cooking_time: results[13],
            };
            recipeArray.push(recipeObj);
          }
        });
    }

    // console.log(recipeArray);
    yield put({type: FORYOU_FEED, payload: recipeArray});
  } catch (e) {
    console.log('Get Feed Failed: ' + e);
  }
}

function* getFeaturedCall(param) {
  try {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/recipe/featured`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(axios, apiConfig);
    const resultsArray = response.data[0];
    console.log(
      '[INFO]: GET FEATURED FEED API: Recipe obtained = ' +
        resultsArray.length.toString(),
    );
    const recipeArray = [];
    for (const results of resultsArray) {
      yield storage()
        .refFromURL(results[6])
        .getDownloadURL()
        .then(res => {
          const vegetarian = param.user.vegetarian ? results[11] === 1 : true;
          const vegan = param.user.vegan ? results[12] === 1 : true;
          const pescatarian = param.user.pescatarian ? true : true;
          const gluten_free = param.user.gluten_free ? true : true;
          const dairy_free = param.user.dairy_free ? true : true;
          const keto = param.user.keto ? results[7] > 30 : true;
          const paleo = param.user.paleo ? true : true;
          if (
            vegetarian &&
            vegan &&
            pescatarian &&
            gluten_free &&
            dairy_free &&
            keto &&
            paleo
          ) {
            const recipeObj = {
              recipe_id: results[0],
              name: results[1],
              created_time: results[2],
              user_id: results[3],
              header_image: res,
              protein: results[5],
              carbs: results[6],
              fat: results[7],
              fiber: results[8],
              calories: results[9],
              servings: results[10],
              vegetarian: results[11],
              vegan: results[12],
              cooking_time: results[13],
            };
            recipeArray.push(recipeObj);
          }
        });
    }

    // console.log(recipeArray);
    yield put({type: FEATURED_FEED, payload: recipeArray});
  } catch (e) {
    console.log('Get Featured Feed Failed: ' + e);
  }
}

export function* getFeed() {
  yield takeLatest(GET_FEED, getFullFeed);
}

export function* searchFeed() {
  yield takeLatest(SEARCH_FEED, searchFeedCall);
}
