import React, {PropTypes} from 'react';
import Rc from 'modules/recompose';
import api from 'apps/admin-private/api';
import styles from './app.scss';
import Header from '../header/Header';
import Menu from '../menu/Menu';

export const App = ({children}) => (
  <div>
    <Header />
    <div id="container">
      <Menu />
      {children}
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default Rc.compose(
  Rc.universalProvide(({props$}) => ({
    me$: props$.take(1).switchMap(() => api.me()),
  })),
  Rc.provide(({props$, me$}) => ({
    location$: props$.pluck('location'),
    me$: me$.shareReplay(),
  })),
  Rc.withStyles(styles),
)(App);
