import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {API_URL} from '@env';
import {GET_USER, SIGN_UP, USER_INFO} from '../actions/accountActions';

function* signUpCall(param) {
  try {
    const data = JSON.stringify(param.payload);
    const apiConfig = {
      method: 'post',
      url: `${API_URL}/user`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    const response = yield call(axios, apiConfig);
    const results = response.data;
    console.log('[INFO]: User Signup API:');
    console.log(results);
    yield put({
      type: USER_INFO,
      payload: {
        user_id: param.payload.userID,
        username: param.payload.username,
        email: param.payload.email,
        first_name: '',
        last_name: '',
        profile_picture: '',
        location: '',
        recipe_driven: true,
      },
    });
  } catch (e) {
    console.log('Signup Failed');
  }
}

function* getUserCall(param) {
  try {
    const apiConfig = {
      method: 'get',
      url: `${API_URL}/user?userID=${param.userID}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(axios, apiConfig);
    const results = response.data[0];
    console.log('[INFO]: User Login API:');
    const userObj = {
      user_id: results[0][0],
      username: results[0][1],
      first_name: results[0][2],
      last_name: results[0][3],
      email: results[0][4],
      profile_picture: results[0][5],
      location: results[0][6],
      recipe_driven: results[0][7] === 1,
    };
    console.log(userObj);
    yield put({type: USER_INFO, payload: userObj});
  } catch (e) {
    console.log('Signup Failed');
  }
}

export function* signUp() {
  yield takeLatest(SIGN_UP, signUpCall);
}

export function* getUser() {
  yield takeLatest(GET_USER, getUserCall);
}
