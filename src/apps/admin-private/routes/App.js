import React from 'react';
import connect from '~/modules/gravito/connect';
import styles from './app.scss';
import Header from '../header/Header';
import Menu from '../menu/Menu';
import Rx from 'rxjs/Rx';
import api from '~/apps/admin-private/api';

export const routeStore = () => () => ({
  me$: Rx.Observable.fromPromise(api.me())
});

export const store = () => (props$, routeStore$) => ({
  me$: routeStore$.map(({me}) => me)
});

export default connect({store: store(), styles}, ({children, me, location}) => (
  <div>
    <Header {...{me}} />
    <div id="container">
      <Menu {...{location}} />
      {children}
    </div>
  </div>
));
