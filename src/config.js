import path from 'path';
import convict from 'convict';

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  session: {
    secret: {
      doc: 'The session secret',
      format: String,
      default: 'secret',
    },
    redis: {
      url: {
        doc: 'Redis url',
        format: String,
        env: 'REDIS_URL',
        default: 'redis://localhost:6379',
      },
    },
  },
  server: {
    port: {
      doc: 'The server port number',
      format: 'port',
      default: 0,
      env: 'PORT',
    },
  },
});

const env = config.get('env');
config.loadFile(path.join(__dirname, `../config/${env}.json`));
config.validate();

export default config;
