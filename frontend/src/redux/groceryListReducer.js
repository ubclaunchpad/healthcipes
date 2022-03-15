import {combineReducers} from 'redux';
import {
  INGREDIENTS,
  GROCERY,
  GROCERY_ADD,
  GROCERY_REMOVE,
} from '../actions/groceryListActions';


const defaultGroceryList = [
  {
    title: 'Dairy',
    data: []
  },
  {
    title: 'Fruits and Vegetables',
    data: []
  },
  {
    title: 'Meat and Fish',
    data: []
  },
  {
    title: 'Seasoning',
    data: []
  },
  {
    title: 'Other',
    data: []
  },
];

const groceryListReducer = (state = defaultGroceryList, action) => {
  switch (action.type) {
    //   Return the current grocery 
    case GROCERY:
      return state;
    // Add items to the grocery list, if the ingredients isnt there yet. 
    // Then return the updated grocery list. 
    case GROCERY_ADD:
      state.map(({title, data}) => {
        if (title === action.payload.category) {
          if (data.every(item => item.name !== action.payload.name)) {
            data.push(action.payload);
          }
        }
      });
      return [...state];
    // Remove items from the grocery list if they are there 
    // Then return the updated grocery list. 
    case GROCERY_REMOVE:
      state.map(item => {
        if (item.title === action.payload.category) {
          item.data = item.data.filter(
            gone => gone.name !== action.payload.name,
          );
        }
      });
      return [...state];
    // Default state is to return the current grocery list.
    default:
      return state;
  }
};

// This is to grab all of the ingredients for the search bar...
const ingredientReducer = (state = [], action) => {
  switch (action.type) {
    case INGREDIENTS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  groceryListReducer,
  ingredientReducer,
});
