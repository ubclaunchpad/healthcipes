import {combineReducers} from 'redux';
import {
  INGREDIENTS,
  PANTRY,
  PANTRY_ADD,
  PANTRY_REMOVE,
} from '../actions/pantryActions';
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
      return state;
    case PANTRY_ADD:
      state.map(({title, data}) => {
        if (title === action.payload.category) {
          if (data.every(item => item.name !== action.payload.name)) {
            data.push(action.payload);
          }
        }
      });
      return [...state];
    case PANTRY_REMOVE:
      state.map(item => {
        if (item.title === action.payload.category) {
          item.data = item.data.filter(
            gone => gone.name !== action.payload.name,
          );
        }
      });
      return [...state];
    default:
      return state;
  }
};

const ingredientReducer = (state = [], action) => {
  switch (action.type) {
    case INGREDIENTS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  pantryReducer,
  ingredientReducer,
});
