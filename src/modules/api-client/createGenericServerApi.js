import Rx from 'rxjs/Rx';

function observe(promise, {next}) {
  return promise
    .then(output => {
      next(output);
      return output;
    });
}

export default (name, {api}) => {
  const created$ = new Rx.Subject();

  return {
    $fetchAll(...args) {
      return Rx.Observable.watchTask(this.fetchAll(...args));
    },
    fetchAll(query) {
      return api[name].fetchAll(query);
    },

    $fetch(...args) {
      return Rx.Observable.watchTask(this.fetch(...args));
    },
    fetch(id) {
      return api[name].fetch(id);
    },

    created$,
    $create(...args) {
      return Rx.Observable.watchTask(this.create(...args));
    },
    create(model) {
      return observe(api[name].create(model), created$);
    }
  };
};
