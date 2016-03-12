import React from 'react';
import ReactDOM from 'react-dom';
import match from 'react-router/lib/match';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import routes from './routes';
import BrowserAdapter from '~/modules/api-client/BrowserAdapter';
import httpClient from './httpClient';
import apiClient from './apiClient';

const adapter = new BrowserAdapter({httpClient});
apiClient.adapter = adapter;

match({history: browserHistory, routes}, (error, redirectLocation, props) => {
  ReactDOM.render(<Router {...props} />, document.getElementById('main'));
});
