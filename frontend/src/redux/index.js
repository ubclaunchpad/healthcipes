import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import globalReducer from './globalReducer';
import recipeReducer from './recipeReducer';
import pantryReducer from './pantryReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  accountReducer,
  globalReducer,
  recipeReducer,
  pantryReducer,
  profileReducer,
});

export default rootReducer;
