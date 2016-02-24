import React from 'react';
import ReactDOM from 'react-dom/server';
import express from 'express';
import http from 'http';
import {match, RouterContext} from 'react-router';
import config from './config';
import path from 'path';
import fs from 'fs';

const app = express();

if (config.get('env') === 'development') {
  const createWpdm = require('webpack-dev-middleware');
  const createWphm = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const config = require('../webpack.config.babel').default;
  const compiler = webpack(config);

  compiler.plugin('done', () => {
    Object.keys(require.cache).forEach(id => {
      delete require.cache[id];
    });
  });

  const wpdm = createWpdm(compiler, {
    noInfo: true,
    publicPath: config[0].output.publicPath,
    stats: {colors: true}
  });
  app.use(wpdm);
  app.use(createWphm(compiler));

  app.use((req, res, next) => {
    const serverPath = path.join(__dirname, '../public/dist/bundle.server.js');
    fs.writeFileSync(
      serverPath,
      wpdm.fileSystem.readFileSync(serverPath, 'utf8')
    );

    const routes = require(serverPath).default;

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
}

app.use(express.static(path.join(__dirname, '../public')));

http.createServer(app).listen(8000);
