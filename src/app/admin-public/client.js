import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {browserHistory} from 'react-router';
import {syncHistory, routeReducer} from 'react-router-redux';
import reducers from 'shared/reducers';
import {Router} from 'react-router';
import routes from './routes';

const reducer = combineReducers({...reducers, routing: routeReducer});

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document
);
