import path from 'path';
import autoprefixer from 'autoprefixer';

export default {
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
    includePaths: [path.resolve(__dirname, '../../../src')]
  },
  postcss: [
    autoprefixer
  ],
  resolve: {
    root: ['src']
  }
};
