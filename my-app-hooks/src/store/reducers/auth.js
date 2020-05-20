import * as actionTypes from '../actions/actionTypes';
import {updateObj} from '../../shared/utility';

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirect: '/'
};

const authSuccess=(state,action)=>{
    return updateObj(state,
                    {loading:false,
                    error:null,
                    token:action.idToken,
                    userId:action.userId});

};

const reducer=(state=initialState,action) =>{
    switch(action.type){
        case actionTypes.AUTH_START:return updateObj(state,{error:null,loading:true});
        case actionTypes.AUTH_SUCCESS:return authSuccess(state,action);                                                               
        case actionTypes.AUTH_FAIL:return updateObj(state,{error:action.error,loading:false});
        case actionTypes.LOGOUT: return updateObj(state,{token:null,userId:null});
        case actionTypes.SET_AUTH_REDIRECT_PATH:return updateObj(state,{authRedirect:action.path});
        default:return state;   
    }
};

export default reducer;