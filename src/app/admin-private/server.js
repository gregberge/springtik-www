import routes from './routes';
import apiClient from './api-client';

export default ({req}) => {
  apiClient.req = req;
  return routes;
};
