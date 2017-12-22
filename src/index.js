import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';

import reducers from './reducers';
import App from './App';

const history = createHistory();
const reactRouterMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = applyMiddleware(reactRouterMiddleware, thunkMiddleware, logger);
const store = createStore(reducers, composeEnhancers(middlewares));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
