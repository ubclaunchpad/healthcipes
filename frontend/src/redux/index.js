import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import globalReducer from './globalReducer';
import recipeReducer from './recipeReducer';
import pantryReducer from './pantryReducer';
import accordionReducer from './accordionReducer';
import profileReducer from './profileReducer';
import groceryListReducer from './groceryListReducer';

const rootReducer = combineReducers({
  accountReducer,
  globalReducer,
  recipeReducer,
  pantryReducer,
  accordionReducer,
  profileReducer,
  groceryListReducer,
});

export default rootReducer;
