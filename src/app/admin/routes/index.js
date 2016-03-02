import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './app';
import Home from './home';
import Login from './login';

export default [
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={Login} />
  </Route>
];
