import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose,combineReducers } from 'redux';
import burgerReducer from './store/reducer/burgerReducer';
import orderReducer from './store/reducer/orderReducer';
import authReducer from './store/reducer/authReducer';
import thunk from 'redux-thunk';
const reducer = combineReducers(
    {
        burgerReducer: burgerReducer,
        orderReducer:orderReducer,
        authReducer:authReducer
    }
);
const composeEnhancers = process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(reducer,composeEnhancers(
    applyMiddleware(thunk)
));
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
