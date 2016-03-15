import routes from './routes';
import apiClient from './apiClient';
import ServerAdapter from '~/modules/api-client/ServerAdapter';

export default ({req}) => {
  const adapter = new ServerAdapter({req});
  apiClient.initialize(adapter);
  return routes;
};
