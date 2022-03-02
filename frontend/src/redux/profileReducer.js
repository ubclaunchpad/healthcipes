import {combineReducers} from 'redux';
import {LIKED_RECIPES, MY_RECIPES} from '../actions/profileActions';

const likedRecipeReducer = (state = [], action) => {
  switch (action.type) {
    case LIKED_RECIPES:
      return action.payload;
    default:
      return state;
  }
};

const myRecipeReducer = (state = [], action) => {
  switch (action.type) {
    case MY_RECIPES:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  likedRecipeReducer,
  myRecipeReducer,
});
