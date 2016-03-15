import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';

const nodeModules = fs.readdirSync(path.join(__dirname, '../../node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((modules, mod) => ({...modules, [mod]: `commonjs ${mod}`}));

export default app => {
  const baseConfig = {
    debug: true,
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel'
        },
        {
          test: /\.scss$/,
          loader: 'isomorphic-style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass!postcss'
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
    sassLoader: {
      includePaths: [path.resolve(__dirname, '../../src')]
    },
    postcss: [
      autoprefixer
    ],
    plugins: [],
    resolve: {
      root: ['src']
    },
    output: {
      pathinfo: true
    },
    context: path.join(__dirname, '../../src/apps', app)
  };

  return [
    {
      ...baseConfig,
      name: 'browser',
      output: {
        ...baseConfig.output,
        path: path.join(__dirname, '../../public', app, 'dist'),
        publicPath: '/dist',
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            ...baseConfig.module.loaders[0],
            query: {
              plugins: [['react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }]
              }]]
            }
          },
          ...baseConfig.module.loaders.slice(1)
        ]
      },
      entry: [
        'webpack-hot-middleware/client',
        './client'
      ],
      plugins: [
        new ForceCaseSensitivityPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ]
    },
    {
      ...baseConfig,
      name: 'server',
      target: 'node',
      output: {
        ...baseConfig.output,
        path: path.join(__dirname, '../../public', app, 'dist'),
        publicPath: '/dist',
        filename: 'bundle.server.js',
        libraryTarget: 'commonjs2'
      },
      entry: ['./server'],
      externals: nodeModules,
      plugins: [
        new webpack.BannerPlugin('require("source-map-support").install();',
          {raw: true, entryOnly: false})
      ]
    }
  ];
};
