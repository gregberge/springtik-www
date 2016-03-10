export default ({httpClient}) => ({
  me() {
    return httpClient.get('/api/me').then(({bodyData}) => bodyData);
  }
});
