import path from 'path';
import webpack from 'webpack';

module.exports = {
  context: path.join(__dirname, 'src/client'),
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'public/dist'),
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          "plugins": [["react-transform", {
            "transforms": [{
              "transform": "react-transform-hmr",
              "imports": ["react"],
              "locals": ["module"]
            }]
          }]]
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
