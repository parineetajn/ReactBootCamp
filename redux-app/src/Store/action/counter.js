import * as actionTypes from '../action/actionTypes'; 

export const increment=()=>{
    return{
        type:actionTypes.INCREMENT
    };
};

export const decrement=()=>{
    return{
        type:actionTypes.DECREMENT
    };
};

export const addCounter=(val)=>{
    return{
        type:actionTypes.ADD_COUNTER,
        value:val
    };
};

export const subCounter=(val)=>{
    return{
        type:actionTypes.SUB_COUNTER,
        value:val
    };
};

