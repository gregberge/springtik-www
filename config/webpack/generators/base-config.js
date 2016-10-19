import path from 'path';
import autoprefixer from 'autoprefixer';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';

const minimize = process.env.NODE_ENV === 'production'
  ? 'minimize&'
  : '';

export default {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style',
          `css?${minimize}modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]`,
          'sass',
          'postcss',
        ],
      },
      {
        test: /\.css/,
        loaders: [
          'isomorphic-style',
          `css?${minimize}modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]`,
          'postcss',
        ],
      },
      {
        test: /\.svg$/,
        loader: 'url?limit=5000&mimetype=image/svg+xml',
      },
      {
        test: /\.jpg/,
        loader: 'url?limit=5000',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, '../../../src'),
      path.resolve(__dirname, '../../../node_modules'),
    ],
  },
  postcss: [
    autoprefixer,
  ],
  resolve: {
    root: ['src'],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
  ],
};
