import {combineReducers} from 'redux';
import {SET_ONBOARDING} from '../actions/globalActions';

const defaultOnboardState = false;

const onboardReducer = (state = defaultOnboardState, action) => {
  switch (action.type) {
    case SET_ONBOARDING:
      return action.onboarded;
    default:
      return state;
  }
};

export default combineReducers({
  onboardReducer,
});
