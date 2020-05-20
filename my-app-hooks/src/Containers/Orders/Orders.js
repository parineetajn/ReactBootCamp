import React, { useEffect } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';

const Orders = props =>{

    const {onFetchOrders}= props;

    useEffect(()=>{
       onFetchOrders(props.token,props.userId);
    },[onFetchOrders]);

        let orders =<Spinner/>;
        if(!props.loading){
            orders=props.orders.map(order =>(
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))
        };
        return(
            <div>
                {orders}
            </div>
        );
    }

const mapStateToProps=state=>{
    return{
        loading: state.order.loading,
        orders: state.order.orders,
        token:state.auth.token,
        userId:state.auth.userId
    };
};

const mapDispatchToProps=dispatch =>{
    return{
        onFetchOrders:(token,userId)=>dispatch(actions.fetchOrders(token,userId))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));