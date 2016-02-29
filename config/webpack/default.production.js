import path from 'path';
import autoprefixer from 'autoprefixer';

export default app => {
  const baseConfig = {
    debug: true,
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
          loader: 'url?limit=10000&mimetype=image/svg+xml'
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
    plugins: [],
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
      entry: ['./server.js']
    }
  ];
};
