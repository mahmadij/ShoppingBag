const defaultState = {   
    loggedin:false,            
    user:{
        name:'',
        role:'',
        username:'',
        password:'',
        email:''
    },
    contacts:[],
    items:[],
    measures:[]
};

const reducer = (state = defaultState,action) => {
    switch(action.type){
        case 'EDIT_ITEM':
            return{
                ...state,
                items:state.items.map(item => item.id==action.item.id ? action.item : item)
            }
        case 'DELETE_ITEM':
            return{
                ...state,
                items:state.items.filter(i => i.id!=action.id)
            }
        case 'SET_INITIAL_STATE':
            let tmpItemsArray = []    
            let tmpContactsArray = []    
            let tmpMeasuresArray = []    
            let item = {}
            Object.keys(action.contacts).forEach((key) => {
                item = action.contacts[key]
                item.id = key
                tmpContactsArray.push(item);
              }); 
            Object.keys(action.items).forEach((key) => {
                item = action.items[key]
                item.id = key
                tmpItemsArray.push(item);
            });
            Object.keys(action.measures).forEach((key) => {
                item = action.measures[key]
                item.id = key
                tmpMeasuresArray.push(item);
            });
            return{
                ...state,
                items:tmpItemsArray,
                contacts:tmpContactsArray,
                measures:tmpMeasuresArray
            }
        case 'ADD_ITEM':
            return{
                ...state,
                items:[
                ...state.items,action.item]
            }
        case 'SET_USER':
            return{
                ...state,
                user:action.user
            }        
        case 'SET_LOGGEDIN':
            return{
                ...state,
                loggedin:action.loggedin
            }
        case 'REMOVE_ITEM':
            return state.items.filter(({id})=>id!==action.itemid)
        case 'EDIT_ITEM':
            return state.items.map((item)=>{
                if(item.id===action.itemid){
                    return{
                        ...item,
                        ...action.editedproperties
                    }
                }else{
                    return item;
                }
            })
        default:
            return state;
    }
}

export default reducer;