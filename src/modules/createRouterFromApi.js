import express from 'express';
import errCheck from '~/modules/expressErrorChecking';

export default (name, {api}) => {
  const router = express.Router();

  router.get('/', errCheck(async function (req, res) {
    res.send(await api[name].fetchAll(req.query));
  }));

  router.post('/', errCheck(async function (req, res) {
    res.send(await api[name].create(req.body));
  }));

  router.get('/:id', errCheck(async function (req, res) {
    res.send(await api[name].fetch(req.params.id));
  }));

  return router;
};
