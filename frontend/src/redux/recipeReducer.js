import {combineReducers} from 'redux';
import {FEATURED_FEED, FORYOU_FEED} from '../actions/feedActions';

const defaultRecipe = {
  recipe_id: 0,
  name: '',
  created_time: new Date(),
  user_id: '',
  header_image: '',
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
  calories: 0,
  servings: 0,
  vegetarian: false,
  vegan: false,
  cooking_time: 0,
};

const featureFeedReducer = (state = [], action) => {
  switch (action.type) {
    case FEATURED_FEED:
      return action.payload;
    default:
      return state;
  }
};

const forYouFeedReducer = (state = [], action) => {
  switch (action.type) {
    case FORYOU_FEED:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  featureFeedReducer,
  forYouFeedReducer,
});
