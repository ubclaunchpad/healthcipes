import {combineReducers} from 'redux';
import {
  FEATURED_FEED,
  FORYOU_FEED,
  REPLACE_FEED,
  SEARCH_RESULT,
} from '../actions/feedActions';
import {
  RECIPE,
  REGISTER_LIKE_RECIPE,
  REGISTER_VIEW_RECIPE,
  LIKE_RECIPE,
  REMOVE_RECIPE_STEP,
  REPLACE_RECIPE_STEP,
  RECIPE_STEP,
  WEB_RECIPE,
} from '../actions/recipeActions';

const defaultRecipe = {
  recipe_id: 0,
  name: '',
  recipe_description: '',
  created_time: new Date(),
  user_id: '',
  creator_username: '',
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
  steps: [],
  ingredients: [],
};

const defaultSteps = [{step_index: 0, step_image: ''}];

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
      return state.concat(action.payload);
    case REPLACE_FEED:
      return action.payload;
    default:
      return state;
  }
};

const searchResultReducer = (state = [], action) => {
  switch (action.type) {
    case SEARCH_RESULT:
      return action.payload;
    default:
      return state;
  }
};

const recipeReducer = (state = defaultRecipe, action) => {
  switch (action.type) {
    case RECIPE:
      return action.payload;
    default:
      return state;
  }
};

const registerRecipeLikeReducer = (state = defaultRecipe, action) => {
  switch (action.type) {
    case REGISTER_LIKE_RECIPE:
      return action.payload;
    default:
      return state;
  }
};

const recipeLikeGetReducer = (state = false, action) => {
  switch (action.type) {
    case LIKE_RECIPE:
      return action.payload;
    default:
      return state;
  }
};

const registerRecipeViewReducer = (state = defaultRecipe, action) => {
  switch (action.type) {
    case REGISTER_VIEW_RECIPE:
      return action.payload;
    default:
      return state;
  }
};

const recipeURLReducer = (state = defaultRecipe, action) => {
  switch (action.type) {
    case WEB_RECIPE:
      return action.payload;
    default:
      return state;
  }
}

// Recipe Creation
const recipeStepsReducer = (state = defaultSteps, action) => {
  switch (action.type) {
    case RECIPE_STEP:
      return action.payload;
    case REMOVE_RECIPE_STEP:
      state.splice(action.payload.index, 1);
      return state;
    case REPLACE_RECIPE_STEP:
      if (state.length > action.payload.index) {
        state[action.payload.index] = action.payload.step;
      } else {
        state.push(action.payload.step);
      }
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  featureFeedReducer,
  forYouFeedReducer,
  searchResultReducer,
  recipeReducer,
  registerRecipeLikeReducer,
  registerRecipeViewReducer,
  recipeLikeGetReducer,
  recipeStepsReducer,
  recipeURLReducer,
});
