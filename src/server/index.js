/* eslint no-console: 0 */
import express from 'express';
import http from 'http';
import config from '../config';
import subdomain from 'express-subdomain';
import admin from './admin';
import www from './www';
import compress from 'compression';
import morgan from 'morgan';
import errorHandler from 'express-err';
import patchAsyncAwait from './patch-async-await';
import '../db';

const app = express();

patchAsyncAwait(app);

app.use(morgan('dev'));
app.use(compress());

app.use(subdomain('admin', admin));
app.use(subdomain('www', www));

// Error handling.
app.use(errorHandler());

const server = http.createServer(app);
server.listen(config.get('server.port'), () =>
  console.log('App listening at port %s', server.address().port)
);
