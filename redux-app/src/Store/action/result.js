import * as actionTypes from '../action/actionTypes'; 

export const saveResult=(res)=>{
    //const updatedRes= res*2;
    return{
        type:actionTypes.STORE_RESULT,
        result:res
    };
}

export const storeResult=(res)=>{
    return (dispatch,getState) =>{
        setTimeout(()=>{
            // const oldCounter=getState().counter_Reducer.counter;
            // console.log(oldCounter);
            dispatch(saveResult(res));
        },2000);
    }
};

export const deleteResult=(resId)=>{
    return{
        type:actionTypes.DELETE_RESULT,
        ElementId:resId
    };
};
