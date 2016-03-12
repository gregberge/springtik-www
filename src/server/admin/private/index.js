import express from 'express';
import config from '~/config';
import useWebpackDevServer from '~/modules/useWebpackDevServer';
import reactRouterMiddleware from '~/modules/reactRouterMiddleware';
import path from 'path';
import api from './api';

const router = express.Router();

const root = path.join(__dirname, '../../../../');
const publicPath = path.join(root, 'public/admin-private');
const configPath = path.join(root, 'config/webpack/admin-private.development.babel');

router.use('/api', api);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

if (config.get('env') === 'development')
  useWebpackDevServer(router, {configPath});

router.use(express.static(publicPath));
router.use(reactRouterMiddleware({
  routesPath: path.join(publicPath, 'dist/bundle.server.js'),
  layout: 'admin/apps/admin-private/layout.html'
}));

export default router;
