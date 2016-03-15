import express from 'express';
import monkeyPatchExpressAsyncAwait from '~/modules/monkeyPatchExpressAsyncAwait';

export default (name, {api}) => {
  const router = express.Router();

  monkeyPatchExpressAsyncAwait(router);

  router.get('/', async function (req, res) {
    res.send(await api[name].fetch());
  });

  router.post('/', async function (req, res) {
    res.send(await api[name].create(req.body));
  });

  return router;
};
