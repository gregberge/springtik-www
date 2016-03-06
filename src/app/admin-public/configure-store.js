import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import createLogger from 'redux-logger';
import {routeReducer} from 'react-router-redux';
import reducers from './reducers';

const logger = createLogger();
const rootReducer = combineReducers({...reducers, routing: routeReducer});

export default (initialState = {}) => {
  return compose(applyMiddleware(logger))(createStore)(rootReducer, initialState);
};
