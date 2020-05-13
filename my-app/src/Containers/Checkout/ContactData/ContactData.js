import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as orderActions from '../../../store/actions/index';

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your name'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:3
                },
                valid:false,
                touched:false},
            street: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false},
            city: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your city'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false},
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false},
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false},
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                   options:[
                       {value:'fastest',displayValue: 'Fastest'},
                       {value:'cheapest',displayValue: 'Cheapest'},
                        ]
                },
                value:'fastest',
                validation:{},
                valid:true}
        },
        formIsValid:false
    }

    checkValidity(value,rules){
        let isValid =true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid=value.trim()!=='' && isValid;
        }

        if(rules.minLength){
            isValid=value.length >=rules.minLength && isValid;
        }

        return isValid;
    }

    orderHandler =(event)=>{
        event.preventDefault();
        const formData={};
        for(let fromIdentifier in this.state.orderForm){
            formData[fromIdentifier]=this.state.orderForm[fromIdentifier].value;
        }

          const order={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData
        }
        this.props.onOrderBurger(order);
    }

    inputChangeHandler=(event,inputIdentifier)=>{
        const updatedForm={
            ...this.state.orderForm
        };

        const updatedFormElement={
            ...updatedForm[inputIdentifier]
        };
        updatedFormElement.value =event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedForm[inputIdentifier] =updatedFormElement;

        let isFormValid =true;
        for(let inputIdentifiers in updatedForm){
            isFormValid=updatedForm[inputIdentifier].valid && isFormValid;
        }
        console.log(updatedFormElement);
        this.setState({orderForm:updatedForm,formIsValid:isFormValid});
    }

    render(){
        const formElementArray =[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }

        let form =( 
            <form onSubmit={this.orderHandler}>
                   {formElementArray.map(formEle =>(
                       <Input 
                            key={formEle.id}
                            elementType={formEle.config.elementType}
                            elementConfig={formEle.config.elementConfig}
                            value={formEle.config.value}
                            invalid={!formEle.config.valid}
                            shouldValidate={formEle.config.validation}
                            touched={formEle.config.touched}
                            changed={(event) =>this.inputChangeHandler(event,formEle.id)}/>
                   ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
               </form>
        );
        if(this.props.loading){
            form=<Spinner/>;
        }

        return(
           <div className={classes.ContactData}>
               <h4>Enter your contact data</h4>
               {form}
           </div> 
        );
    }
}

const mapStateToProps =state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading
    }
};

const mapDispatchToProps =dispatch =>{
    return{
        onOrderBurger: (orderData)=>dispatch(orderActions.purchaseBurger(orderData))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));