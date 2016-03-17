export default Model => ({
  fetchAll(query) {
    if (query && Object.keys(query).length)
      return Model.query().where(query);

    return Model.query();
  },

  fetch(id) {
    return Model.query().where({id})
      .then(([res]) => res);
  },

  create(model) {
    return Model.fromJson(model).$query().insert();
  }
});
