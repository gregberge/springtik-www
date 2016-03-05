import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import App from './app';
import Login from './login';

export default [
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <IndexRedirect to="login" />
  </Route>
];
