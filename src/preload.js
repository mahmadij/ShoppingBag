import React from 'react';
import {database} from './firebase_config.js';
import {connect} from 'react-redux';
import {setInitialState} from './redux/action_generators.js';


class Preload extends React.Component{
    constructor(props){
        super(props);
    }
componentDidMount(){ 
        database.ref().once('value').then((snapshot) => {
            this.props.dispatch(setInitialState(snapshot.val().contacts,snapshot.val().items,snapshot.val().measures));
        });
        
    }

    render(){
        return(
            <div>
            </div>
        )
    }
}

export default connect((state)=>{
    return{
        data:state
    }
})(Preload);