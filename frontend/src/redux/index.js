import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import globalReducer from './globalReducer';
import recipeReducer from './recipeReducer';
import pantryReducer from './pantryReducer';

const rootReducer = combineReducers({
  accountReducer,
  globalReducer,
  recipeReducer,
  pantryReducer,
});

export default rootReducer;
