import createGenericServerApi from './createGenericServerApi';
import api from '~/api/admin';

export default ({req}) => ({
  me() {
    return api.me({req});
  },

  activities: createGenericServerApi('activities', {api}),
  categories: createGenericServerApi('categories', {api})
});
