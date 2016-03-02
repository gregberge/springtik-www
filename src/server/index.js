import express from 'express';
import http from 'http';
import config from '../config';
import subdomain from 'express-subdomain';
// import api from './api';
import admin from './admin';
import www from './www';
import compress from 'compression';

const app = express();

app.use(compress());

// app.use('/api', api);
app.use(subdomain('admin', admin));
app.use(subdomain('www', www));

const server = http.createServer(app);
server.listen(config.get('server.port'));
