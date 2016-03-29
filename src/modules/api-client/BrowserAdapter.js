import createGenericBrowserApi, {wrapHttp} from './createGenericBrowserApi';
import Rx from 'rxjs/Rx';

export default ({http}) => ({
  me() {
    return http.get('/api/me')
      .then(({bodyData}) => bodyData);
  },

  activities: createGenericBrowserApi('activities', {http}),
  categories: createGenericBrowserApi('categories', {http})
});
