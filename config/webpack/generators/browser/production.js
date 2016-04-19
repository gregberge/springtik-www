/* eslint-disable no-process-env */
import productionConfig from '../production-config';
import path from 'path';
import webpack from 'webpack';

export default app => {
  return {
    ...productionConfig,
    name: 'browser',
    output: {
      path: path.join(__dirname, '../../../../public', app, 'dist'),
      publicPath: '/dist',
      filename: 'bundle.js',
    },
    plugins: [
      ...productionConfig.plugins,
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
    ],
    entry: ['./browser'],
    context: path.join(__dirname, '../../../../lib/apps', app),
  };
};
