import React from 'react';
import {connect} from 'react-redux';

class Profile extends React.Component {
    
constructor(props){
    super(props);
    this.state = {
    };
    
    this.handleViewBag = this.handleViewBag.bind(this);
}

handleViewBag(evt) {  
    
  }

render(){
        return (
            <div>
            <p>{this.props.user.name}</p>
            <p>{this.props.user.email}</p>
            <p>{this.props.user.role}</p>
            </div>
        );
    }
}

export default connect((state)=>{
    return{
        user:state.user
    }
}

)(Profile);
// export default connect()(ShoppingBag);
//onClick={() => this.props.dispatch({type:'ADD_ITEM',item:{name:this.state.name,amount:this.state.amount,measure:this.state.measure,id:this.state.id}})}>