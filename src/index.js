import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import { syncHistory } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from './reducers';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createHistory();
const reduxRouterMiddleware = syncHistory(history);
const middlewares = applyMiddleware(reduxRouterMiddleware, thunkMiddleware, createLogger());
const store = createStore(reducers, composeEnhancers(middlewares));

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
