import express from 'express';
import api from '~/api/admin';
import createRouterFromApi from '~/modules/createRouterFromApi';
import errCheck from '~/modules/expressErrorChecking';

const router = express.Router();

router.get('/me', errCheck(async function (req, res) {
  const me = await api.me({req});
  res.send(me);
}));

router.use('/activities', createRouterFromApi('activities', {api}));
router.use('/categories', createRouterFromApi('categories', {api}));

export default router;
