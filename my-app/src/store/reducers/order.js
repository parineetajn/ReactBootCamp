import * as actionTypes from '../actions/actionTypes';
import {updateObj} from '../../shared/utility';


const initialState={
    orders:[],
    loading:false,
    purchased:false
}

const purchaseBurgerSuccess=(state,action)=>{
    const newOrder = updateObj(action.orderData,{id:action.orderId});
            const updatedState={
                loading:false,
                purchased:true,
                orders: state.orders.concat(newOrder)
            }
            return updateObj(state,updatedState);
};

const fetchOrdersSuccess=(state,action)=>{
    const updatedState1={
        orders:action.orders,
        loading:false
    }
    return updateObj(state,updatedState1);
};

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT: return updateObj(state,{purchased:false});
        
        case actionTypes.PURCHASE_BURGER_START: return updateObj(state,{loading:true});
            
        case actionTypes.PURCHASE_BURGER_SUCCESS:return purchaseBurgerSuccess(state,action);
            
        case actionTypes.PURCHASE_BURGER_FAIL: return updateObj(state,{loading:false});
           
        case actionTypes.FETCH_ORDERS_SUCCESS:return fetchOrdersSuccess(state,action);            

        case actionTypes.FETCH_ORDERS_FAIL: return updateObj(state,{loading:false});

        case actionTypes.FETCH_ORDERS_START:return updateObj(state,{loading:true});

        default : return state;
    }
};

export default reducer;