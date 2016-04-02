import developmentConfig from '../development-config';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

export default app => {
  return {
    ...developmentConfig,
    name: 'browser',
    output: {
      ...developmentConfig.output,
      publicPath: 'http://localhost:8080/assets/',
      path: path.join(__dirname, '../../../../public', app, 'dist'),
      filename: `${app}-bundle.js`
    },
    module: {
      ...developmentConfig.module,
      loaders: [
        {
          ...developmentConfig.module.loaders[0],
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
        ...developmentConfig.module.loaders.slice(1)
      ]
    },
    entry: [
      './client'
    ],
    plugins: [
      new ForceCaseSensitivityPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    context: path.join(__dirname, '../../../../src/apps', app)
  };
};
