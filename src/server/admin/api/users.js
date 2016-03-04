import express from 'express';
import User from '~/models/user';

const router = express.Router();

router.get('/', async function (req, res) {
  const users = await User.query();
  res.send(users);
});

export default router;
