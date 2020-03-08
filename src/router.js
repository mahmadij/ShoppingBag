import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import ShoppingBag from './components/ShoppingBag.js';
import LoginForm from './components/signin.js';
import Profile from './components/profile.js';
import {auth} from './firebase_config.js';
import { setLoggedin } from './redux/action_generators.js';
import Register from './components/register.js'

class AppRouter extends React.Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(evt){
      auth.signOut().then(()=> {
        this.props.dispatch(setLoggedin(false));
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    }
  render() {
    if(this.props.loggedin){
      return (
        <div>      
        <Router>
        <h2>Welcome to React Router Tutorial</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button onClick={this.handleLogout}>Logout</button>
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/shoppingbag'} className="nav-link">Shopping Bag</Link></li>
            <li><Link to={'/register'} className="nav-link">Register</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Profile} />
              <Route path='/shoppingbag' component={ShoppingBag} />
              <Route path='/register' component={Register} />
          </Switch>        
          </Router>
        </div>
        )}else{      
          return (
            <div>
              <LoginForm/>
            </div>
          );
        }
  }
}

export default connect((state)=>{
  return{
    loggedin:state.loggedin
  }
})(AppRouter);