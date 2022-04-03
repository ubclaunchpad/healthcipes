import {combineReducers} from 'redux';
import {SET_LOADING, SET_ONBOARDING, SET_ALERT} from '../actions/globalActions';

const defaultOnboardState = true;
const defaultLoadingState = false;
const defaultAlertState = false;

const onboardReducer = (state = defaultOnboardState, action) => {
  switch (action.type) {
    case SET_ONBOARDING:
      return action.onboarded;
    default:
      return state;
  }
};

const loadingReducer = (state = defaultLoadingState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.loading;
    default:
      return state;
  }
};

const alertReducer = (state = defaultAlertState, action) => {
  switch(action.type) {
    case SET_ALERT:
      return action.alert;
    default:
      return state;
  }
};

export default combineReducers({
  onboardReducer,
  loadingReducer,
  alertReducer,
});
