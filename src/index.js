import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './App';
import breedsReducer from './store/reducers/breeds';
import subbreedsReducer from './store/reducers/subbreeds';
import imagelinkReducer from './store/reducers/imagelink';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
    breeds: breedsReducer,
    subbreeds: subbreedsReducer,
    imagelink: imagelinkReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)    
));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
