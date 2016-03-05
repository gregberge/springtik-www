import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';

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
        }
      ]
    },
    context: path.join(__dirname, '../../src/app', app),
    sassLoader: {
      includePaths: [path.resolve(__dirname, '../../src')]
    },
    postcss: [
      autoprefixer
    ],
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}})
    ],
    resolve: {
      modulesDirectories: ['src', 'node_modules']
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
          'components/http-client': 'components/http-client/http-client-browser.js'
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
          'components/http-client': 'components/http-client/http-client-server.js'
        }
      },
      entry: ['./server.js']
    }
  ];
};
