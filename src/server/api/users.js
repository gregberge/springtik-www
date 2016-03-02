import express from 'express';
import db from '../../db';

const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const users = await db.models.user.findAll();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

export default router;
