import path from 'path';
import fs from 'fs';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';

const nodeModules = fs.readdirSync(path.join(__dirname, '../../node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((modules, mod) => ({...modules, [mod]: `commonjs ${mod}`}));

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
    plugins: [],
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
      plugins: [
        new ForceCaseSensitivityPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}})
      ],
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
      entry: ['./server.js'],
      externals: nodeModules
    }
  ];
};
