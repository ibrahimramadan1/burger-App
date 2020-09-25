import * as actionTypes from './actionTypes';
import axios from '../../Axios';

export const purchasingContinued = (id, order) => {
    return {
        type: actionTypes.PURCHASE_CONTINUED,
        order: order,
        id: id
    };
};


export const purchasingCanceled = (error) => {
    return {
        type: actionTypes.PURCHASE_CANCELED,
        error: error
    };
};

export const purchasingStarted = () => {
    return {
        type: actionTypes.PURCHASE_STARTED
    };
};
export const continuePurchasing = (order, token) => {
    return dispatch => {
        dispatch(purchasingStarted());
        axios.post('/orders.json?auth=' + token, order)
            .then(response => {
                dispatch(purchasingContinued(response.data.name, order));
            }).catch(error => {
                dispatch(purchasingCanceled(error));
            });

    }
};

export const initPurchasing = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};



export const fetchingCanceled = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_CANCELED,
        error: error
    };
};

export const fetchingStarted = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_STARTED,
        orders: orders
    };
};

export const initFetching = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    };
};
export const continueFetching = (token, userId) => {
    return dispatch => {
        dispatch(initFetching());
        let query = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + query)
            .then(res => {
                const myOrders = [];
                for (let key in res.data) {
                    myOrders.push(
                        {
                            ...res.data[key],
                            id: key
                        }
                    );
                }
                dispatch(fetchingStarted(myOrders));

            })
            .catch(err => {
                dispatch(fetchingCanceled(err));
            }
            );

    }
};
