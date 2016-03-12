import adminApi from '~/api/admin';

export default class ServerAdapter {
  constructor({req}) {
    this.req = req;
  }

  me() {
    return adminApi.me({req: this.req});
  }
}
