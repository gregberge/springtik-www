export default class BrowserAdapter {
  constructor({httpClient}) {
    this.httpClient = httpClient;
  }

  me() {
    return this.httpClient.get('/api/me')
      .then(({bodyData}) => bodyData);
  }
}
