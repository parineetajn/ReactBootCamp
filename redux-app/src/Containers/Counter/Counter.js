import React, { Component } from 'react';
import {connect} from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../Store/action';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {

        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter5: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
            default:
                return;
        }
        
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubCounter}  />
                <hr/>
                <button onClick={() =>this.props.onStoreResult(this.props.counter)}> store Result </button>
                <ul>
                    {this.props.res.map(r =>(
                        <li key={r.id} onClick={() =>this.props.onDeleteResult(r.id)}>{r.value}</li>
                    ))}
                </ul>

            </div>
        );
    }
}

const mapStateToProps = state=>{
    return{
        counter: state.counter_Reducer.counter,
        res: state.result_Reducer.results
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onIncrementCounter: () =>dispatch({type: actionTypes.INCREMENT}),
        onAddCounter: () =>dispatch({type: actionTypes.ADD_COUNTER,value:5}),
        onDecrementCounter: () =>dispatch({type: actionTypes.DECREMENT}),
        onSubCounter: () =>dispatch({type: actionTypes.SUB_COUNTER,value:5}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT,result:result}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT,ElementId:id})

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Counter);