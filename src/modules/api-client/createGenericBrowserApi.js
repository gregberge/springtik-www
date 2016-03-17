import Rx from 'rxjs/Rx';

function observe(promise, observer) {
  return promise
    .then(output => {
      observer.next(output);
      return output;
    });
}

export default (name, {http}) => {
  const baseUrl = `/api/${name}`;
  const created$ = new Rx.Subject();

  return {
    $fetchAll(...args) {
      return Rx.Observable.watchTask(this.fetchAll(...args));
    },
    fetchAll(query) {
      return http.get(baseUrl, {query})
        .then(({bodyData}) => bodyData);
    },

    $fetch(...args) {
      return Rx.Observable.watchTask(this.fetch(...args));
    },
    fetch(id) {
      return http.get(`${baseUrl}/${id}`)
        .then(({bodyData}) => bodyData);
    },

    created$,
    $create(...args) {
      return Rx.Observable.watchTask(this.create(...args));
    },
    create(body) {
      return observe(http.post(baseUrl, {body})
        .then(({bodyData}) => bodyData), created$);
    }
  };
};
