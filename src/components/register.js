import React from 'react';
import {connect} from 'react-redux';
import {auth,database} from './../firebase_config.js';
import TextField from '@material-ui/core/TextField';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            name:'',
            role:'',
            error_text:'This field cannot be empty',
            rgister_user_error:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.clearState = this.clearState.bind(this)
    }  

    handleChange(evt) {
      let value = evt.target.value;
      let name = evt.target.name
      this.setState({ [name]: value })
    }  
    
    clearState(){
        this.setState({            
            email:'',
            password:'',
            name:'',
            role:'',
        })
    }

    handleRegister(event) {
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((ref)=>{
            database.ref('contacts').push({name:this.state.name,email:this.state.email,role:this.state.role}).then((snapshot) => {
                this.clearState()
                window.alert('User '+ this.state.name + ' has been registered and added to the database.\n ID: '+snapshot.key)
            }).catch((error)=> {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log('Error adding user to the database: '+ error.message)
            });
        }).catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          this.clearState()
          window.alert('User '+ this.state.name + ' has NOT been registered.\n'+error.message)
        });
    }
    handleAdd(){
        const item ={name:this.state.name,amount:this.state.amount,measure:this.state.measure}
        database.ref('items').push({name:this.state.name,amount:this.state.amount,measure:this.state.measure}).then((snapshot) => {
          item.id = snapshot.key;     
          this.props.dispatch(addItem(item));
          this.clearState()
          window.alert('User '+ item.name + ' has been registered and added to the database.')
      }).catch((error)=> {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Error adding user to the database: '+ error.message)
      });
    }
    
    render(){
        return(
            <div>
                <div>
                    <TextField
                    error={!this.state.email}
                        
                        id={this.state.email ? "standard-basic" : "outlined-error-helper-text"}
                        label="Email"
                        helperText={this.state.email ? '' : this.state.error_text}
                        variant="outlined"
                        inputProps={this.state.email}
                        onChange={this.handleChange}
                        name='email'
                    />
                    <TextField
                    error={!this.state.password}
                        id={this.state.password ? "standard-basic" : "outlined-error-helper-text"}
                        label="Password"
                        helperText={this.state.password ? '' : this.state.error_text}
                        variant="outlined"
                        inputProps={this.state.password}
                        onChange={this.handleChange}
                        name='password'
                    />
                    <TextField
                    error={!this.state.name}
                        
                        id={this.state.name ? "standard-basic" : "outlined-error-helper-text"}
                        label="Name"
                        helperText={this.state.name ? '' : this.state.error_text}
                        variant="outlined"
                        inputProps={this.state.name}
                        onChange={this.handleChange}
                        name='name'
                    />
                    <TextField
                    error={!this.state.role}
                        id={this.state.role ? "standard-basic" : "outlined-error-helper-text"}
                        label="Role"
                        helperText={this.state.role ? '' : this.state.error_text}
                        variant="outlined"
                        inputProps={this.state.role}
                        onChange={this.handleChange}
                        name='role'
                    />
                </div>
                        
                <button onClick={this.handleRegister} >Register</button>
                <div>
                <p>{this.state.rgister_user_error}</p></div>
            </div>
        )
    }
}

export default connect((state)=>{
    return{
        data:state
    }
}
)(Register)