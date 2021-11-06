import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import globalReducer from './globalReducer';
import recipeReducer from './recipeReducer';

const rootReducer = combineReducers({
  accountReducer,
  globalReducer,
  recipeReducer,
});

export default rootReducer;
