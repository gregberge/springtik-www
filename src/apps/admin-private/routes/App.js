import React from 'react';
import connect from '~/modules/gravito/connect';
import styles from './app.scss';
import Header from '../header/Header';
import Menu from '../menu/Menu';

const store = (props$, routeStore$) => {
  const me$ = routeStore$
    .map(({me}) => me);

  return {me$};
};

export default connect({store, styles}, ({children, me}) => (
  <div>
    <Header {...{me}} />
    <div id="container">
      <Menu />
      <main>{children}</main>
    </div>
  </div>
));
