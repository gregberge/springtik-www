import React from 'react';
import Route from 'react-router/lib/Route';
import Redirect from 'react-router/lib/Redirect';
import App from './App';
import Login from './login/Login';

export default [
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Redirect from="*" to="login" />
  </Route>
];
