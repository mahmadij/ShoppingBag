export const addItem = (item={})=>({
    type:'ADD_ITEM',
    item
});

export const editItem = (item={})=>({
    type:'EDIT_ITEM',
    item
});

export const removeItem = (itemid=0)=>({
    type:'REMOVE_ITEM',
    itemid
})
export const setUser = (user={})=>({
    type:'SET_USER',
    user
});
export const setLoggedin = (loggedin)=>({
    type:'SET_LOGGEDIN',
    loggedin
});
export const setInitialState = (contacts,items,measures)=>({
    type:'SET_INITIAL_STATE',
    contacts,
    items,
    measures
});