import React from 'react';
import ReactDOM from 'react-dom/server';
import express from 'express';
import http from 'http';
import {match, RouterContext} from 'react-router';
import config from './config';
import path from 'path';

const app = express();


if (config.get('env') === 'development') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const config = require('../webpack.config.babel');
  const compiler = webpack(config);

  compiler.plugin('done', () => {
    console.log('Clearing module cache from server');
    Object.keys(require.cache).forEach(id => {
      delete require.cache[id];
    });
  });

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {colors: true}
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, '../public')));
app.use((req, res, next) => {
  const routes = require('./routes').default;

  match({routes, location: req.url}, (error, redirectLocation, props) => {
    if (error)
      return next(error);

    if (redirectLocation)
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);

    if (!props)
      return res.status(404).send('Not found');

    const react = ReactDOM.renderToString(
      React.createElement(RouterContext, props)
    );
    res.send(`<!DOCTYPE html>${react}`);
  });
});

http.createServer(app).listen(8000);
