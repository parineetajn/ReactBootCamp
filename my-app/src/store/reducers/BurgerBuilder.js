import * as actionTypes from '../actions/actionTypes';
import {updateObj} from '../utility';

const initialState={
    ingredients:null,
    totalPrice:4,
    error:false
};

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon: 0.7
};

const addIngredient=(state,action)=>{
    const updatedIngredients =updateObj(state.ingredients,{ [action.ingredientName]:state.ingredients[action.ingredientName]+1});
    const updatedState={
        ingredients:updatedIngredients,
        totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObj(state,updatedState);
};

const removeIngredient=(state,action)=>{
    const updatedIngredients1 =updateObj(state.ingredients,{ [action.ingredientName]:state.ingredients[action.ingredientName]-1});
            const updatedState1={
                ingredients:updatedIngredients1,
                totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObj(state,updatedState1);
};

const setIngredients=(state,action)=>{
    const updatedState2={
        ingredients:{
            salad  : action.ingredients.salad,
            bacon  : action.ingredients.bacon,
            cheese  : action.ingredients.cheese,
            meat  : action.ingredients.meat,
          },
          totalPrice:4,
          error:false
    }
    return updateObj(state,updatedState2);

};

const reducer= (state =initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);  

        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
             
        case actionTypes.SET_INGREDIENTS:return setIngredients(state,action);
            
        case actionTypes.FETCH_INGREDIENTS_FAILED:return updateObj(state,{error:true });
        
        default:return state;

    }
};

export default reducer;