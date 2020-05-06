import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentDidUpdate(){
        console.log('[SummaryUpdate.js] componentDidUpdate');
    }
    render(){
        const ingredientSummary=Object.keys(this.props.ingredients)
        .map(igKey =>{
            return (
                <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
                </li> );
        });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>Delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total order Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout..</p>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CHECKOUT</Button>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
            </Aux>
        )
        
    }
}

export default OrderSummary;