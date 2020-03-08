import React from 'react';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {auth} from './../firebase_config.js'
import {setUser,setLoggedin} from './../redux/action_generators';
import AppRouter from './../router.js';

class LoginForm extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
          username:'',
          password:'',
          sloggedin:this.props.loggedin,
            error_text:'This field cannot be empty'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSignin = this.handleSignin.bind(this);
    }

    handleChange(evt) {
      let value = evt.target.value;
      let name = evt.target.name
        this.setState({ [name]: value })
      }
    
    handleSignin(event) {
      auth.signInWithEmailAndPassword(this.state.username, this.state.password).then((ref)=>{
        var users = this.props.contacts.filter(contact => contact.email == ref.user.email);
        var user = users[0]
        this.props.dispatch(setUser(user));
        this.props.dispatch(setLoggedin(true));
        this.setState({sloggedin:true})
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    }
    

    render(){
      if(this.state.sloggedin){
        return <AppRouter/>
      }else{
        return(
            
      <div>
      <div>
      <TextField
      error={!this.props.user && !this.props.user.username}
        
        id={this.props.user && this.props.user.username ? "standard-basic" : "outlined-error-helper-text"}
        label="Username"
        helperText={this.props.user && this.props.user.username ? '' : this.state.error_text_username}
        variant="outlined"
        inputProps={this.props.user.username}
        onChange={this.handleChange}
        name='username'
      />
      <TextField
      error={!this.props.user && !this.props.user.password}
        id={this.props.user && this.props.user.password ? "standard-basic" : "outlined-error-helper-text"}
        label="Password"
        helperText={this.props.user && this.props.user.password ? '' : this.state.error_text_username}
        variant="outlined"
        inputProps={this.props.user.password}
        onChange={this.handleChange}
        name='password'
      />
      </div>
      <button onClick={this.handleSignin} >Login</button>
      <button onClick={this.handleSignin} >Reset PAssword</button>
      </div>
        )
    }
  }
}

export default connect((state) => {
  return{
    contacts:state.contacts,
    user:state.user,
    loggedin:state.loggedin,
    data:state
  }
})(LoginForm);