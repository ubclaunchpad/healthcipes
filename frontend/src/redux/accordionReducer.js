import {combineReducers} from 'redux';
import { SET_STEP } from '../actions/accordionActions';

const defaultState = {}
 
const accordionStepReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_STEP:
            state[action.payload] = state[action.payload] ? false : true;
            return {...state}; 
        default: 
            return state;
    }
};

export default combineReducers({
    accordionStepReducer
});