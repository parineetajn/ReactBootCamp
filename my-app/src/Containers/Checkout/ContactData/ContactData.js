import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            city:'',
            country:''
        },
        loading:false

    }

    orderHandler =(event)=>{
        event.preventDefault();
        this.setState({loading:true});
          const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:'Parineeta Jain',
                address:{
                    street: 's1',
                    city: 'New Delhi',
                    country: 'India'
                },
                email: 'Parineeta@gmail.com'
            },
            deliveryMethod:'fastest'
        }

        axios.post('/orders.json',order)
            .then(response=>{
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch(error=>{
                this.setState({loading:false});
            });
    }

    render(){
        let form =(
            <form>
                   <input className={classes.Input} type="text" name="name" placeholder="Enter your name"/>
                   <input className={classes.Input} type="text" name="email" placeholder="Enter your email"/>
                   <input className={classes.Input} type="text" name="street" placeholder="Enter your street"/>
                   <input className={classes.Input} type="text" name="city" placeholder="Enter your city"/>
                   <input className={classes.Input} type="text" name="country" placeholder="Enter your country"/>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
               </form>
        );
        if(this.state.loading){
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

export default ContactData;