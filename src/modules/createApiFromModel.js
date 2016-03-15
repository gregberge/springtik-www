export default Model => ({
  fetch() {
    return Model.query();
  },

  create(model) {
    return Model.fromJson(model).$query().insert();
  }
});
