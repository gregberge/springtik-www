import createGenericBrowserApi from './createGenericBrowserApi';

export default ({httpClient}) => ({
  me() {
    return httpClient.get('/api/me')
      .then(({bodyData}) => bodyData);
  },

  activities: createGenericBrowserApi('activities', {httpClient}),
  categories: createGenericBrowserApi('categories', {httpClient})
});
