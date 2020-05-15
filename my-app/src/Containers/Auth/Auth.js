import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {updateObj} from '../../shared/utility';
import {checkValidity} from '../../shared/validity';

class Auth extends Component{
state={
    controls:{
        email:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'Your Email'
            },
            value:'',
            validation:{
                required:true,
                isEmail:true
            },
            valid:false,
            touched:false
        },
    password:{
        elementType:'input',
        elementConfig:{
            type:'password',
            placeholder:'Your Password'
        },
        value:'',
        validation:{
            required:true,
            minLength:6
        },
        valid:false,
        touched:false
         }
    },
    formIsValid:false,
    isSignUp:true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath!=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangeHandler=(event,controlName)=>{
        const updatedControls= updateObj(this.state.controls,{
            [controlName]:updateObj(this.state.controls[controlName],{
                value:event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            })
        });

        let isFormValid =true;
        for(let controlName in updatedControls){
            isFormValid=updatedControls[controlName].valid && isFormValid;
        }
       this.setState({controls:updatedControls,formIsValid:isFormValid});
    }

    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }

    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return {isSignUp: !prevState.isSignUp};
        });
    }

    render(){
        const formElementArray =[];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config: this.state.controls[key]
            });
        }

        let form= formElementArray.map(formEle =>(
            <Input
            key={formEle.id}
                elementType={formEle.config.elementType}
                elementConfig={formEle.config.elementConfig}
                value={formEle.config.value}
                invalid={!formEle.config.valid}
                shouldValidate={formEle.config.validation}
                touched={formEle.config.touched}
                changed={(event) =>this.inputChangeHandler(event,formEle.id)}
            />
          
        ));

        if(this.props.loading){
            form=<Spinner/>
        }

        let errorMessage=null;
        if(this.props.error){
            errorMessage=(
                <p>
                   {this.props.error.message} 
                </p>
            );
        }

        let authRedirect=null;
        if(this.props.isAuthenticated){
            authRedirect=<Redirect to={this.props.authRedirectPath}/>
        }

        return(
           <div className={classes.Auth}>
               {authRedirect}
               {errorMessage}
               <form onSubmit={this.submitHandler}>
                   {form}
               <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
               </form>
               <Button 
               clicked={this.switchAuthModeHandler}
               btnType="Danger">SWITCH TO {this.state.isSignUp ?'SIGN-IN':'SIGN-UP'}</Button>
           </div> 
        );
    }
}

const mapStateToDispatch = state =>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirect
    };
};

const mapDispatchToProps =dispatch =>{
    return{
        onAuth:(email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: ()=>dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToDispatch,mapDispatchToProps)(Auth);