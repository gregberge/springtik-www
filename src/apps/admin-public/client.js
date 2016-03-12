import React from 'react';
import ReactDOM from 'react-dom';
import match from 'react-router/lib/match';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import routes from './routes';

match({history: browserHistory, routes}, (error, redirectLocation, props) => {
  ReactDOM.render(<Router {...props} />, document.getElementById('main'));
});
