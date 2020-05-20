import React,{useState,useEffect,useCallback} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';

export const BurgerBuilder =props=>{

    const [purchasing,setPurchasing]=useState(false);
    const dispatch =useDispatch();
    const ings= useSelector(state=>{
        return state.burgerBuilder.ingredients;
    });

    const price=useSelector(state=>{
        return state.burgerBuilder.totalPrice;
    });

    const error=useSelector(state=>{
        return state.burgerBuilder.error;
    });

    const isAuthenticated=useSelector(state=>{
        return state.auth.token !== null;
    });

   const onIngredientAdded= (ingName)=> dispatch(actions.addIngredient(ingName));
   const onIngredientRemoved= (ingName)=> dispatch(actions.removeIngredient(ingName));
   const onInitIngredients= useCallback(()=>dispatch(actions.initIngredients()),[dispatch]);
   const onInitPurchase= ()=>dispatch(actions.purchaseInit());
   const onSetAuthRedirectPath= (path)=>dispatch(actions.setAuthRedirectPath(path));

    useEffect(()=>{
        onInitIngredients();
    },[onInitIngredients]);

    const updatePurchaseState =(ingredients)=>{
    
        const sum=Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum,el)=>{
                        return sum+el;
                    },0);
        return sum>0;
    }

    const purchaseHandler=()=>{
        if(isAuthenticated){
            setPurchasing(true);
        }else{
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler=()=>{
        setPurchasing(false);    
    }

    const purchaseContinueHandler=()=>{
       
        onInitPurchase();
        props.history.push('/checkout');
    }

        const disabledInfo = {
            ...ings
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <=0
        }

        let orderSummary = null;
        
        let burger=error ? <p style={{textAlign: 'center'}}>Ingredients cant be loaded..</p> : <Spinner/>
     
        if(ings){
            burger=(
                <Aux>
                    <Burger ingredients={ings}/>
                    <BuildControls 
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    order={purchaseHandler}
                    price={price}
                    isAuth={isAuthenticated}
                    />
                </Aux>
              
            );
            orderSummary = <OrderSummary 
            ingredients={ings}
            price={price}
            purchaseCancel={purchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler}/>;
        }

        return(
            <Aux>
                <Modal show ={purchasing}
                    modalClosed={purchaseCancelHandler}>
                    {orderSummary} 
                </Modal>
                    {burger}
            </Aux>
        );

    }

export default WithErrorHandler(BurgerBuilder,axios);