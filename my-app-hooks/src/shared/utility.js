export const updateObj =(OldObject,updatedValues) =>{
    return{
        ...OldObject,
        ...updatedValues
    }
};