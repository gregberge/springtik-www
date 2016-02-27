import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

const baseConfig = {
  debug: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
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
      {
        test: /\.css$/,
        loader: 'isomorphic-style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      }
    ]
  },
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  postcss: [
    autoprefixer
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modulesDirectories: ['src', 'node_modules']
  }
};

export default [
  {
    ...baseConfig,
    name: 'browser',
    output: {
      path: path.join(__dirname, 'public/dist'),
      publicPath: '/dist',
      filename: 'bundle.js'
    },
    context: path.join(__dirname, 'src/client')
  },
  {
    ...baseConfig,
    name: 'server',
    target: 'node',
    context: path.join(__dirname, 'src/server'),
    output: {
      path: path.join(__dirname, 'public/dist'),
      publicPath: '/dist',
      filename: 'bundle.server.js',
      libraryTarget: 'commonjs2'
    },
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
    plugins: []
  }
];
