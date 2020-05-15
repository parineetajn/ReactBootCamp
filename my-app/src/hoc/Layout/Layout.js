import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import ToolBar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state={
        showSideDrawer:false
    }

    sideDrawerClosedHandler =()=>{
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler=()=>{
        if(this.state.showSideDrawer===false)
        {
            this.setState({showSideDrawer:true});
        }
        else
        this.setState({showSideDrawer:false});
    }

    render(){
        return(
            <Aux>
                <ToolBar 
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                     open={this.state.showSideDrawer}
                     closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null
    };
};

export default connect(mapStateToProps)(Layout);