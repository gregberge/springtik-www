import adminApi from 'api/admin';

export default () => ({
  me() {
    return adminApi.me({req: this.req});
  }
});
