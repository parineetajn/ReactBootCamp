import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {updateObj} from '../../shared/utility';
import {checkValidity} from '../../shared/validity';

const Auth =props=>{
const [authForm,setAuthForm]=useState({
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
    })
    const [formIsValid,setFromIsValid]=useState(false);
    const [isSignUp,setIsSignUp]=useState(true);

    const {buildingBurger,authRedirectPath,onSetAuthRedirectPath} = props;
    useEffect(()=>{
        if(!buildingBurger && authRedirectPath!=='/'){
            onSetAuthRedirectPath();
        }
    },[buildingBurger,authRedirectPath,onSetAuthRedirectPath]);
        

    const inputChangeHandler=(event,controlName)=>{
        const updatedControls= updateObj(authForm,{
            [controlName]:updateObj(authForm[controlName],{
                value:event.target.value,
                valid:checkValidity(event.target.value,authForm[controlName].validation),
                touched:true
            })
        });

        let isFormValid =true;
        for(let controlName in updatedControls){
            isFormValid=updatedControls[controlName].valid && isFormValid;
        }
        setAuthForm(updatedControls);
        setFromIsValid(isFormValid);
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        props.onAuth(authForm.email.value,authForm.password.value,isSignUp);
    }

    const switchAuthModeHandler=()=>{
        setIsSignUp(!isSignUp);
    }

  
        const formElementArray =[];
        for(let key in authForm){
            formElementArray.push({
                id:key,
                config: authForm[key]
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
                changed={(event) =>inputChangeHandler(event,formEle.id)}
            />
          
        ));

        if(props.loading){
            form=<Spinner/>
        }

        let errorMessage=null;
        if(props.error){
            errorMessage=(
                <p>
                   {props.error.message} 
                </p>
            );
        }

        let authRedirect=null;
        if(props.isAuthenticated){
            authRedirect=<Redirect to={props.authRedirectPath}/>
        }

        return(
           <div className={classes.Auth}>
               {authRedirect}
               {errorMessage}
               <form onSubmit={submitHandler}>
                   {form}
               <Button btnType="Success" disabled={!formIsValid}>SUBMIT</Button>
               </form>
               <Button 
               clicked={switchAuthModeHandler}
               btnType="Danger">SWITCH TO {isSignUp ?'SIGN-IN':'SIGN-UP'}</Button>
           </div> 
        );
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