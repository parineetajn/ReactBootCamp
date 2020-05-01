 
import React from "react";
import '../App.css'

const Fruit =(props)=>{
    return (
                props.items.map((item,index)=>{
                return(
                    
                <tbody key={index} className="FruitListItem">
                    <tr className="tablerow">
                    <td><span >{item.name.split('-')[0]}</span></td>
                    <td><span >{item.name.split('-')[1]}</span></td>
                    <td><button  onClick={()=>props.deleteHandler(item.key)}>Delete</button></td>
                    </tr>
                </tbody>
                
                )
             })
            
    );
}
export default Fruit;