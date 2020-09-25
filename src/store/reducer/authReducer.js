import * as actionTypes from '../actions/actionTypes';
import updatedObj from './utility';

const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false, 
    redirectPath: '/'
};


const initAuth = (state) => {
    const newState = { error: null, loading: true };
    return updatedObj(state, newState);
}
const authCanceled = (state, action) => {
    const newState = { error: action.error, loading: false };
    return updatedObj(state, newState);
};
const authStarted = (state, action) => {
    const newState = {
        loading: false,
        error: null,
        userId: action.userId,
        token: action.token
    };
    return updatedObj(state, newState);
};

const logout = (state) => {
    const newState = {
        token: null,
        userId: null,
        error: null,
        loading: false
    };
    return updatedObj(state, newState);
};
const changeRedirect = (state,action)=>{
    const newState = {
        redirectPath: action.path
    };
    return updatedObj(state, newState);
};
const reducer = (state = initState, action) => {
    switch (action.type) {
        case (actionTypes.AUTH_CANCELED): return authCanceled(state, action);
        case (actionTypes.AUTH_STARTED): return authStarted(state, action);
        case (actionTypes.AUTH_CHANGE_PATH): return changeRedirect(state, action);
        case (actionTypes.AUTH_INIT): return initAuth(state);
        case (actionTypes.AUTH_LOGOUT): return logout(state);
        default: return state;
    }
};
export default reducer;