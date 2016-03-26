import path from 'path';
import baseConfig from './base-config';

export default {
  ...baseConfig,
  debug: true,
  devtool: 'source-map',
  output: {
    ...baseConfig.output,
    pathinfo: true
  }
};
