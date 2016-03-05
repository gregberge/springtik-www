import express from 'express';
import config from '~/config';
import wpDev from '~/server/utils/wp-dev';
import reactRouter from '~/server/utils/react-router-middleware';
import path from 'path';
import passport from 'passport';
import {BAD_CREDENTIALS} from '~/server/utils/login-errors';

const router = express.Router();

const publicPath = path.join(__dirname, '../../../../public/admin-public');
const configPath = path.join(__dirname, '../../../../config/webpack/admin-public.development.babel');

router.post('/api/login', (req, res, next) => {
  passport.authenticate('local', {badRequestMessage: BAD_CREDENTIALS}, (err, user, query) => {
    if (err)
      return next(err);

    if (!user)
      return res.status(400).send({success: false, message: query.message});

    req.login(user, err => {
      if (err)
        return next(err);

      res.send({success: true});
    });
  })(req, res, next);
});

if (config.get('env') === 'development')
  wpDev(router, configPath);

router.use(express.static(publicPath));
router.use(reactRouter({configPath}));

export default router;
