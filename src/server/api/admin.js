import gravatar from 'gravatar';
import createApiFromModel from '~/server/utils/createApiFromModel';
import Activity from '~/server/models/Activity';
import Category from '~/server/models/Category';

export default ({
  me({req}) {
    return Promise.resolve({
      ...req.user,
      avatar200x200: gravatar.url(req.user.email, {s: '200', d: 'retro'})
    });
  },

  activities: createApiFromModel(Activity),
  categories: {
    ...createApiFromModel(Category),
    fetchKeywords() {
      return Category.query()
        .select('keywords')
        .whereNotNull('keywords')
        .then(results =>
          Array.from(new Set(results.reduce((all, {keywords}) =>
            all.concat(keywords), []
          )))
        );
    }
  }
});
