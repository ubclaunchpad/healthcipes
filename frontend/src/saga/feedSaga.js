import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {API_URL} from '@env';
import storage from '@react-native-firebase/storage';
import {
  FEATURED_FEED,
  FILTER_FEED,
  FORYOU_FEED,
  GET_FEED,
  SEARCH_FEED,
} from '../actions/feedActions';

function* searchFeedCall(param) {
  console.log('searching');
}

function* filterFeedCall(param) {
  console.log('filter');
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
        .refFromURL(results[4])
        .getDownloadURL()
        .then(res => {
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
        });
    }

    console.log(recipeArray);
    yield put({type: FEATURED_FEED, payload: recipeArray});
    yield put({type: FORYOU_FEED, payload: recipeArray});
  } catch (e) {
    console.log('Get Feed Failed');
  }
}

export function* getFeed() {
  yield takeLatest(GET_FEED, getFeedCall);
}

export function* filterFeed() {
  yield takeLatest(FILTER_FEED, filterFeedCall);
}

export function* searchFeed() {
  yield takeLatest(SEARCH_FEED, searchFeedCall);
}
