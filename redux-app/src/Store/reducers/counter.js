import * as actionTypes from '../action';

const initialState ={
    counter:0
}

const reducer =(state=initialState,action) =>{
    switch(action.type) {
        case actionTypes.INCREMENT:
            return{
                ...state,
                counter:state.counter+1
            } 
        case actionTypes.ADD_COUNTER:
            return{
                ...state,
                counter:state.counter+action.value
            }
    
        case actionTypes.DECREMENT:
            return{
                ...state,
                counter:state.counter-1
            }
           
        case actionTypes.SUB_COUNTER:
            return{
                ...state,
                counter:state.counter-action.value
            }
    
        default :
            return state;
    }
    
};

export default reducer;