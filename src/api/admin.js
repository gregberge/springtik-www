import gravatar from 'gravatar';
import createApiFromModel from '~/modules/createApiFromModel';
import Activity from '~/models/Activity';
import Category from '~/models/Category';

export default ({
  me({req}) {
    return Promise.resolve({
      ...req.user,
      avatar200x200: gravatar.url(req.user.email, {s: '200', d: 'retro'})
    });
  },

  activities: createApiFromModel(Activity),
  categories: createApiFromModel(Category)
});
