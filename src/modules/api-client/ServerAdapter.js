import Rx from 'rxjs/Rx';
import createGenericServerApi from './createGenericServerApi';
import api from '~/server/api/admin';

export default ({req}) => ({
  me() {
    return api.me({req});
  },

  activities: createGenericServerApi('activities', {api}),
  categories: {
    ...createGenericServerApi('categories', {api}),
    $fetchKeywords(...args) {
      return Rx.Observable.watchTask(this.fetchKeywords(...args));
    },
    fetchKeywords(query) {
      return api.categories.fetchKeywords(query);
    }
  }
});
