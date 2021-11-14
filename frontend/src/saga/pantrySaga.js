import {takeLatest, call, put, all} from 'redux-saga/effects';
import axios from 'axios';
import {API_URL} from '@env';
import {GET_PANTRY, PANTRY_ADD} from '../actions/pantryActions';

function* addToPantry(param) {
  yield put({
    type: PANTRY_ADD,
    payload: {title: param.category, item: param.name},
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
        return call(addToPantry, {category, name});
      }),
    );
  } catch (e) {
    console.log('Get Pantry Failed: ' + e);
  }
}

export function* getPantry() {
  yield takeLatest(GET_PANTRY, getPantryCall);
}
