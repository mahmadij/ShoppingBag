import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router.js';
import configureStore from './redux/configure_store.js';
import {Provider} from 'react-redux';
import './firebase_config.js';
import Preload from './preload.js';

const store = configureStore();
class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
            <Preload/>
            <h1>Mehrnaz's Shopping Bag</h1>
            <AppRouter/>            
            </div>
        )
    }
}

const jsx =(
    <Provider store={store}>
        <App/>
    </Provider>
)
ReactDOM.render(jsx,document.getElementById('app'));