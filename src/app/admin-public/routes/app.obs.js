import ActionLocator from 'components/base/action-locator';

export default () => ({
  actions: new ActionLocator(),
  redirect(url) {
    window.location = url;
  }
});
