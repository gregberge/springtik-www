import path from 'path';
import autoprefixer from 'autoprefixer';

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
        test: /\.css$/,
        loader: 'isomorphic-style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      }
    ]
  },
  entry: ['./index'],
  postcss: [
    autoprefixer
  ],
  plugins: [],
  resolve: {
    modulesDirectories: ['src', 'node_modules']
  }
};

export default [
  {
    ...baseConfig,
    name: 'browser',
    output: {
      path: path.join(__dirname, '../../public/dist'),
      publicPath: '/dist',
      filename: 'bundle.js'
    },
    context: path.join(__dirname, '../../src/client')
  },
  {
    ...baseConfig,
    name: 'server',
    target: 'node',
    context: path.join(__dirname, '../../src/server'),
    output: {
      path: path.join(__dirname, '../../public/dist'),
      publicPath: '/dist',
      filename: 'bundle.server.js',
      libraryTarget: 'commonjs2'
    }
  }
];
