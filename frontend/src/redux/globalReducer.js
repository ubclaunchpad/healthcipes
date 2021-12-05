import {combineReducers} from 'redux';
import {SET_LOADING, SET_ONBOARDING} from '../actions/globalActions';

const defaultOnboardState = true;
const defaultLoadingState = false;

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

export default combineReducers({
  onboardReducer,
  loadingReducer,
});
