import {combineReducers} from 'redux';
import {
  FEATURED_FEED,
  FORYOU_FEED,
  SEARCH_RESULT,
} from '../actions/feedActions';
import {LIKED_RECIPES} from '../actions/profileActions';

const likedRecipeReducer = (state = [], action) => {
  switch (action.type) {
    case LIKED_RECIPES:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  likedRecipeReducer,
});
