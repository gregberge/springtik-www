import express from 'express';
import config from '~/config';
import useWebpackDevServer from '~/modules/useWebpackDevServer';
import reactRouterMiddleware from '~/modules/reactRouterMiddleware';
import path from 'path';
import api from './api';

const router = express.Router();

const root = path.join(__dirname, '../../../..');
const publicPath = path.join(root, 'public/admin-public');
const configPath = path.join(root, 'config/webpack/admin-public.development.babel');

if (config.get('env') === 'development')
  useWebpackDevServer(router, {configPath});

router.use(express.static(publicPath));
router.use('/api', api);
router.use(reactRouterMiddleware({
  routesPath: path.join(publicPath, 'dist/bundle.server.js'),
  layout: 'admin/public/layout.html'
}));

export default router;
