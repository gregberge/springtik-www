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
  const updated$ = new Rx.Subject();
  const destroyed$ = new Rx.Subject();

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
    },

    updated$,
    $update(...args) {
      return Rx.Observable.watchTask(this.update(...args));
    },
    update(body) {
      return observe(http.patch(`${baseUrl}/${body.id}`, {body})
        .then(({bodyData}) => bodyData), updated$);
    },

    destroyed$,
    $destroy(...args) {
      return Rx.Observable.watchTask(this.destroy(...args));
    },
    destroy(id) {
      return observe(http.delete(`${baseUrl}/${id}`)
        .then(() => id), destroyed$);
    }
  };
};
