import ApiError from '~/modules/ApiError';
import {FETCH_NOT_FOUND} from '~/modules/apiErrors';

export default Model => ({
  fetchAll(options) {
    const query = Model.query()
      .orderBy('id', 'desc');

    if (options && Object.keys(options).length)
      return query.where(options);

    return query;
  },

  fetch(id) {
    return Model.query().where({id})
      .then(([res]) => {
        if (!res)
          throw new ApiError('Result not found', FETCH_NOT_FOUND, 404);

        return res;
      });
  },

  create(model) {
    return Model.fromJson(model).$query().insert();
  },

  update({id, ...data}) {
    return Model.query().patchAndFetchById(id, data);
  },

  delete(id) {
    return Model.query().delete().where({id});
  }
});
