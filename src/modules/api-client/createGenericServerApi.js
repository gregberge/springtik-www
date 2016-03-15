export default (name, {api}) => {
  return {
    fetch() {
      return api[name].fetch();
    },

    create(model) {
      return api[name].create(model);
    }
  };
};
