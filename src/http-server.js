import React from 'react';
import ReactDOM from 'react-dom/server';
import express from 'express';
import http from 'http';
import routes from './routes';
import {match, RouterContext} from 'react-router';

const app = express();

app.use((req, res, next) => {
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
