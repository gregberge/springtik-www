import express from 'express';
import config from '~/config';
import wpDev from '~/server/utils/wp-dev';
import reactRouter from '~/server/utils/react-router-middleware';
import path from 'path';
import api from '../api';

const router = express.Router();

const publicPath = path.join(__dirname, '../../../../public/admin-private');
const configPath = path.join(__dirname, '../../../../config/webpack/admin-private.development.babel');

router.use('/api', api);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

if (config.get('env') === 'development')
  wpDev(router, configPath);

router.use(express.static(publicPath));
router.use(reactRouter({routesPath: path.join(publicPath, 'dist/bundle.server.js')}));

export default router;
