import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import globalReducer from './globalReducer';
import recipeReducer from './recipeReducer';
import pantryReducer from './pantryReducer';
import accordionReducer from './accordionReducer';
import accordionStepReducer from './accordionReducer';

const rootReducer = combineReducers({
  accountReducer,
  globalReducer,
  recipeReducer,
  pantryReducer,
  accordionReducer,
  accordionStepReducer,
});

export default rootReducer;
