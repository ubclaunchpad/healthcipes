import {combineReducers} from 'redux';
import {PANTRY, PANTRY_ADD} from '../actions/pantryActions';
import color from '../styles/color';

const defaultPantry = [
  {
    title: 'Dairy',
    data: [],
    chipColor: color.red,
  },
  {
    title: 'Fruits and Vegetables',
    data: [],
    chipColor: color.orange,
  },
  {
    title: 'Meat and Fish',
    data: [],
    chipColor: color.lightGreen,
  },
  {
    title: 'Seasoning',
    data: [],
    chipColor: color.yellow,
  },
];

const pantryReducer = (state = defaultPantry, action) => {
  switch (action.type) {
    case PANTRY:
      return action.payload;
    case PANTRY_ADD:
      state.map(({title, data}) => {
        if (title === action.payload.title) {
          if (!data.includes(action.payload.item)) {
            data.push(action.payload.item);
          }
        }
      });
      return [...state];
    default:
      return state;
  }
};

export default combineReducers({
  pantryReducer,
});
