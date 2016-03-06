import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import connectRedis from 'connect-redis';
import passportConfig from './passport-config';
import adminPublic from './apps/admin-public';
// import adminPrivate from './apps/admin-private';
import config from '~/config';

const router = express.Router();

const RedisStore = connectRedis(session);

router.use(bodyParser.json());
router.use(session({
  secret: config.get('session.secret'),
  resave: true,
  saveUninitialized: true,
  store: new RedisStore(config.get('session.redis'))
}));
router.use(passport.initialize());
router.use(passport.session());

passportConfig(passport);

router.use((req, res, next) => {
  // if (req.isAuthenticated())
  //   adminPrivate(req, res, next);
  // else
    adminPublic(req, res, next);
});

export default router;
