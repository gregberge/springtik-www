import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';

export default app => {
  const baseConfig = {
    debug: true,
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!rxjs-es)/,
          loader: 'babel'
        },
        {
          test: /\.scss$/,
          loader: 'isomorphic-style!css?minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass!postcss'
        },
        {
          test: /\.svg$/,
          loader: 'url?limit=5000&mimetype=image/svg+xml'
        },
        {
          test: /\.json$/,
          loader: 'json'
        }
      ]
    },
    context: path.join(__dirname, '../../src/apps', app),
    sassLoader: {
      includePaths: [path.resolve(__dirname, '../../src')]
    },
    postcss: [
      autoprefixer
    ],
    plugins: [
      new ForceCaseSensitivityPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}})
    ],
    resolve: {
      root: ['src']
    }
  };

  return [
    {
      ...baseConfig,
      name: 'browser',
      output: {
        path: path.join(__dirname, '../../public', app, 'dist'),
        publicPath: '/dist',
        filename: 'bundle.js'
      },
      resolve: {
        ...baseConfig.resolve,
        alias: {
          'components/api-client/admin': 'components/api-client/admin/client.js'
        }
      },
      entry: ['./client.js']
    },
    {
      ...baseConfig,
      name: 'server',
      target: 'node',
      output: {
        path: path.join(__dirname, '../../public', app, 'dist'),
        publicPath: '/dist',
        filename: 'bundle.server.js',
        libraryTarget: 'commonjs2'
      },
      resolve: {
        ...baseConfig.resolve,
        alias: {
          'components/api-client/admin': 'components/api-client/admin/server.js'
        }
      },
      entry: ['./server.js']
    }
  ];
};
