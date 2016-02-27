import React from 'react';
import ReactDOM from 'react-dom/server';
import express from 'express';
import http from 'http';
import {match, RouterContext} from 'react-router';
import config from './config';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

if (config.get('env') === 'development') {
  const serverPath = path.join(__dirname, '../public/dist/bundle.server.js');
  const createWpdm = require('webpack-dev-middleware');
  const createWphm = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const config = require('../config/webpack/webpack.development.config.babel').default;
  const clientCompiler = webpack(config[0]);
  const serverCompiler = webpack(config[1]);

  serverCompiler.watch({}, err => {
    if (err)
      throw err;
  });

  clientCompiler.plugin('done', () => {
    delete require.cache[serverPath];
  });

  const wpdm = createWpdm(clientCompiler, {
    noInfo: true,
    publicPath: config[0].output.publicPath,
    stats: {colors: true}
  });

  app.use(wpdm);
  app.use(createWphm(clientCompiler));
}

app.use((req, res, next) => {
  const css = [];

  class ContextInjector extends React.Component {
    static childContextTypes = {
      insertCss: React.PropTypes.func.isRequired
    };

    getChildContext() {
      return {
        insertCss: styles =>
          css.push(styles._getCss())
      };
    }

    render() {
      return React.createElement(RouterContext, this.props);
    }
  }

  const routes = require('../public/dist/bundle.server').default;

  match({routes, location: req.url}, (error, redirectLocation, props) => {
    if (error)
      return next(error);

    if (redirectLocation)
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);

    if (!props)
      return res.status(404).send('Not found');

    const react = ReactDOM.renderToString(
      React.createElement(ContextInjector, props)
    );
    res.send(`<!DOCTYPE html>${react.replace('// %CSS%', css.join(''))}`);
  });
});

http.createServer(app).listen(config.get('server.port'));
