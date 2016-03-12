/**
 * Enable webpack development server on a router.
 *
 * @param {express.Router} router
 * @param {object} config
 * @param {string} config.configPath
 */
export default (router, {configPath}) => {
  const createWpdm = require('webpack-dev-middleware');
  const createWphm = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const path = require('path');
  const config = require(configPath).default;
  const clientCompiler = webpack(config[0]);
  const serverCompiler = webpack(config[1]);
  const serverPath = path.join(config[1].output.path, config[1].output.filename);

  serverCompiler.watch({}, err => {
    if (err)
      throw err;
  });

  clientCompiler.plugin('done', () => {
    delete require.cache[serverPath];
  });

  const wpdm = createWpdm(clientCompiler, {
    noInfo: true,
    publicPath: config[0].output.publicPath,
    stats: {colors: true}
  });

  router.use(wpdm);
  router.use(createWphm(clientCompiler));
};
