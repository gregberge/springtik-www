export default ({httpClient}) => ({
  me() {
    return httpClient.get('/api/me').then(({bodyData}) => bodyData);
  }
});

export default class ApiClient {
  constructor({adapter}) {
    this.adapter = adapter;
  }

  me() {
    this.adapter.me();
  }
}
