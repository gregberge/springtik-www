import React from 'react';
import Route from 'react-router/lib/Route';
import connectRoute from '~/modules/gravito/connectRoute';
import App from './App';
import Activities from './activities/Activities';
import apiClient from '~/apps/admin-private/apiClient';
import Rx from 'rxjs/Rx';

const appStore = () => {
  const me$ = Rx.Observable.fromPromise(apiClient.me());
  return {me$};
};

export default [
  <Route path="/" component={connectRoute({store: appStore}, App)}>
    <Route path="/activities" component={Activities} />
  </Route>
];
