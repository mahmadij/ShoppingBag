import {createStore} from 'redux';
import reducer from './reducers.js';
export default () =>{
    const store = createStore(reducer);
    return store;
}