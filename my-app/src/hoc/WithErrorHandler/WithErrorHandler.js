import React, { Component } from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const WithErrorHandler=(WrappedComponent,axios)=>{
    return class extends Component {

        state={
            error:null
        }
        
        componentWillMount(){
            this.reqInterceptor= axios.interceptors.request.use(request=>{
                this.setState({error:null});
                return request;

            });
            this.resInterceptor=axios.interceptors.response.use(response=>response,error=>{
                this.setState({error:error});
            }
            );
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorHandler=()=>{
            this.setState({error:null})
        }

        render(){
            return(
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorHandler}
                    >
                            {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
                
            );

        }
    }
}

export default WithErrorHandler;