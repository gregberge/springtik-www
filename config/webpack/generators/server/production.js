import productionConfig from '../production-config';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';

const nodeModules = fs.readdirSync(path.join(__dirname, '../../../../node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1);

export default app => {
  return {
    ...productionConfig,
    name: 'server',
    target: 'node',
    output: {
      path: path.join(__dirname, '../../../../public', app, 'dist'),
      publicPath: '/dist',
      filename: 'bundle.server.js',
      libraryTarget: 'commonjs2'
    },
    entry: ['./server.js'],
    externals: nodeModules,
    context: path.join(__dirname, '../../../../lib/apps', app)
  };
};
