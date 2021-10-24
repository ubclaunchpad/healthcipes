import {takeLatest, call} from 'redux-saga/effects';
import axios from 'axios';
import {API_URL} from '@env';
import {SIGN_UP} from '../actions/accountActions';

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
    console.log(results);
  } catch (e) {
    console.log('Signup Failed');
  }
}

export function* signUp() {
  yield takeLatest(SIGN_UP, signUpCall);
}
