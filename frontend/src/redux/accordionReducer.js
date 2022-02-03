import {combineReducers} from 'redux';

const defaultStepState = true;
const defaultStep = 0;
const stateMap = new Map();


const accordionReducer = (state = defaultStepState, action) => {
    switch (action.type) {
        case 'SET_OPEN':
            stateMap.set(action.payload, !state)
            return stateMap.get(action.payload); 
        default: 
            return state; 
    }
};
 
const accordionStepReducer = (state = defaultStep, action) => {
    switch (action.type) {
        case 'SET_STEP':
            stateMap.set(action.payload, defaultStepState);
            return action.payload; 
        default: 
            return state;
    }
};

export default combineReducers({
    accordionReducer,
    accordionStepReducer
});