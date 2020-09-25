import * as actionTypes from '../actions/actionTypes';
import updatedObj from './utility';

const initState = {
    orders: [],
    loading: false,
    purchased: false
};
const start = (state)=>{
    const loading={loading: true};
    return updatedObj(state,loading);
};
const cancel = (state) => {
    const loading={loading: false};
    return updatedObj(state,loading);
};
const initPurchasing = (state)=>{
    const purchase={purchased: false};
    return updatedObj(state,purchase);
};
const continuePurchasing=(state,action)=>{
    const newOrder = {
        ...action.order,
        id: action.id
    };
    const newState = {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    };
    return updatedObj(state,newState);
};

const startFetching = (state,action)=>{
    const newState={
        loading: false,
        orders: action.orders
    };
    return updatedObj(state,newState);
};
const reducer = (state = initState, action) => {
    switch (action.type) {
        case (actionTypes.PURCHASE_INIT): return initPurchasing(state);          
        case (actionTypes.PURCHASE_STARTED): return start(state);
        case (actionTypes.PURCHASE_CANCELED):return cancel(state);
        case (actionTypes.PURCHASE_CONTINUED):return continuePurchasing(state,action);
        case (actionTypes.FETCH_ORDERS_INIT):return start(state);
        case (actionTypes.FETCH_ORDERS_CANCELED):return cancel(state);
        case (actionTypes.FETCH_ORDERS_STARTED):return startFetching(state,action);
        default: return state;       
    }
};

export default reducer;