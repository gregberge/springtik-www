import gravatar from 'gravatar';
import Activity from '~/models/activity';

export default ({
  me({req}) {
    return Promise.resolve({
      ...req.user,
      avatar200x200: gravatar.url(req.user.email, {s: '200', d: 'retro'})
    });
  },

  activities: {
    get() {
      return Activity.query();
    }
  }
});
