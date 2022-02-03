import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import globalReducer from './globalReducer';
import recipeReducer from './recipeReducer';
import pantryReducer from './pantryReducer';
import accordionReducer from './accordionReducer';
import accordionStepReducer from './accordionReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  accountReducer,
  globalReducer,
  recipeReducer,
  pantryReducer,
  accordionReducer,
  accordionStepReducer,
  profileReducer,
});

export default rootReducer;
