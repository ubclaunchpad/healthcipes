import {combineReducers} from 'redux';
import {USER_INFO} from '../actions/accountActions';

const defaultUser = {
  username: '',
  user_id: '',
  first_name: '',
  last_name: '',
  email: '',
  profile_picture: '',
  location: '',
  recipe_driven: true,
};

const userInfoReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case USER_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  userInfoReducer,
});
