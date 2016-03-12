import React from 'react';
import connect from 'components/base/connect';
import styles from './app.scss';
import Header from '../header';
import Menu from '../menu';
import apiClient from 'app/admin-private/api-client';

const fetchResources = () => apiClient.me();

const getObservables = (_, {resources$}) => {
  return {
    me$: resources$
  };
};

const App = ({children}) => (
  <div>
    <Header />
    <div id="container">
      <Menu />
      <main>{children}</main>
    </div>
  </div>
);

App.displayName = 'App';

export default connect({styles, getObservables, fetchResources}, App);
