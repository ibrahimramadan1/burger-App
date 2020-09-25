import * as actionTypes from './actionTypes';
import axios from '../../Axios';


export const authCanceled = (error) => {
    
    return {
        type: actionTypes.AUTH_CANCELED,
        error: error
    };
};

export const authStarted = (userId, token) => {
    return {
        type: actionTypes.AUTH_STARTED,
        userId: userId,
        token: token
    };

};

export const initAuth = () => {
    return {
        type: actionTypes.AUTH_INIT
    };
};
export const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};
export const checkAuthTimeout = (timeout) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, timeout * 1000);
    }
};
export const continueAuth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(initAuth());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyALfsEiB46Q_8sd15ShssiClf9hl4F5W7Y';
        if (!isSignUp)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyALfsEiB46Q_8sd15ShssiClf9hl4F5W7Y';

       
        axios.post(url, authData).then(response => {
            
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authStarted(response.data.localId, response.data.idToken));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        }).catch(err => {

            if (err.response) {
             
                dispatch(authCanceled(err.response.data.error));
            }
            else {
                dispatch(authCanceled({ message: "Error Happen" }));

            }

        });
    };
};



export const changeRedirect = (path) => {
    return {
        type: actionTypes.AUTH_CHANGE_PATH,
        path: path
    };
};

export const useLocalStorage = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            if (new Date() <= expirationDate) {
                dispatch(authStarted(userId, token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
            else {
                dispatch(logout());
            }
        }
    };

};