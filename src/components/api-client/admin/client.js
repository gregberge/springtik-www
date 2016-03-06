export default ({httpClient}) => ({
  me() {
    return httpClient.get('/me');
  }
});
