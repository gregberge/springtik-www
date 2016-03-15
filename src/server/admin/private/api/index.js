import express from 'express';
import api from '~/api/admin';
import createRouterFromApi from '~/modules/createRouterFromApi';

const router = express.Router();

router.get('/me', async function (req, res) {
  const me = await api.me({req});
  res.send(me);
});

router.use('/activities', createRouterFromApi('activities', {api}));
router.use('/categories', createRouterFromApi('categories', {api}));

export default router;
