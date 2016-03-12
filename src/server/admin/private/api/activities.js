import express from 'express';
import adminApi from '~/api/admin';

const router = express.Router();

router.get('/', async function (req, res) {
  res.send(await adminApi.activities.get());
});

export default router;
