import React from 'react';
import ReactDOM from 'react-dom';
import match from 'react-router/lib/match';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import routes from './routes';
import BrowserAdapter from '~/modules/api-client/BrowserAdapter';
import http from './http';
import api from './api';

const adapter = new BrowserAdapter({http});
api.initialize(adapter);

match({history: browserHistory, routes}, (error, redirectLocation, props) => {
  ReactDOM.render(<Router {...props} />, document.getElementById('main'));
});
