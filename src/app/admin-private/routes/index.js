import React from 'react';
import Route from 'react-router/lib/Route';
import App from './app';
import Activities from './activities';

export default [
  <Route path="/" component={App}>
    <Route path="/activities" component={Activities} />
  </Route>
];
