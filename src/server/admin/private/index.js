import express from 'express';
import config from '~/config';
import reactRouterMiddleware from '~/server/utils/reactRouterMiddleware';
import path from 'path';
import api from './api';

const router = express.Router();

const root = path.join(__dirname, '../../../..');
const publicPath = path.join(root, 'public/admin-private');

router.use('/api', api);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.use(express.static(publicPath));
router.use(reactRouterMiddleware({
  name: 'admin-private',
  dev: config.get('env') === 'development',
  routesPath: path.join(publicPath, 'dist/bundle.server.js'),
  layout: 'admin/private/layout.html',
}));

export default router;
