import express from 'express';
import http from 'http';
import config from '../config';
import subdomain from 'express-subdomain';
import admin from './admin';
import www from './www';

const app = express();

app.use(subdomain('admin', admin));
app.use(subdomain('www', www));

const server = http.createServer(app);
server.listen(config.get('server.port'));
