import React, { Component } from 'react';
import './App.css';
import Fruit from './Fruit/Fruit';

class App extends Component {

state = {
  fruits:[],
  fruitObj:{
    name:'',
    key:''
  }
}

addFruit=(event)=>{
event.preventDefault();

const fruitItem=this.state.fruitObj;

if(fruitItem.name!==''){
  const fruits=[...this.state.fruits,fruitItem]
  this.setState({fruits:fruits,fruitObj:{name:''}});
}
}


changeHandler=(event)=>{
this.setState({
  fruitObj:{
    name: event.target.value,
    key: Date.now()
  }
})
}

deleteHandler=(key)=>{
const filteredfruits= this.state.fruits.filter(i =>
  i.key!==key);
this.setState({
  fruits: filteredfruits
})

}


render(){
return (
  <div className="container">
    <div className>
    <form  onSubmit={this.addFruit}>
      <input type="text" 
             placeholder="Enter Fruits"
             value={this.state.fruitObj.name}
             onChange={this.changeHandler}/>
      <button type="submit">Submit</button>
    </form>
    
    <Fruit items={this.state.fruits}
           deleteHandler={this.deleteHandler}/>
    
    </div>
  </div>
);
}
}

export default App;