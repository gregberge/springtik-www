import productionConfig from '../production-config';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';
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
      new ForceCaseSensitivityPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
    ],
    entry: ['./browser'],
    context: path.join(__dirname, '../../../../lib/apps', app),
  };
};
