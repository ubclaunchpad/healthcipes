
export const set_open = (stepNum) => {
    return {
        type: 'SET_OPEN',
        payload: stepNum
    };
};

export const set_step = (stepNum) => {
    return {
        type: 'SET_STEP',
        payload: stepNum 
    };
};