import express from 'express';
import adminApi from '~/api/admin';
import activities from './activities';

const router = express.Router();

router.get('/me', async function (req, res) {
  const me = await adminApi.me({req});
  res.send(me);
});

router.use('/activities', activities);

export default router;
