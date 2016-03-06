import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

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
          loader: 'isomorphic-style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass!postcss'
        },
        {
          test: /\.svg$/,
          loader: 'url?limit=5000&mimetype=image/svg+xml'
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
      modulesDirectories: ['src', 'node_modules']
    },
    context: path.join(__dirname, '../../src/app', app)
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
      resolve: {
        ...baseConfig.resolve,
        alias: {
          'components/api-client/admin': 'components/api-client/admin/client.js'
        }
      },
      entry: [
        'webpack-hot-middleware/client',
        './client'
      ],
      plugins: [
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
      entry: ['./server'],
      plugins: []
    }
  ];
};
