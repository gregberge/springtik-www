import express from 'express';
import adminApi from '~/api/admin';

const router = express.Router();

router.get('/me', async function (req, res) {
  const me = await adminApi.me({req});
  res.send(me);
});

export default router;
