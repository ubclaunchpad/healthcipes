import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import globalReducer from './globalReducer';

const rootReducer = combineReducers({
  accountReducer,
  globalReducer,
});

export default rootReducer;
