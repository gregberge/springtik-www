import Rx from 'rxjs/Rx';
import ApiError from '~/modules/ApiError';

function observe(promise, observer) {
  return promise
    .then(output => {
      observer.next(output);
      return output;
    });
}

function handleHttpError(err) {
  if (err.response && err.response.bodyData)
    throw new ApiError(
      err.response.bodyData.error.message,
      err.response.bodyData.error.code
    );

  return err;
}

function wrapHttp(promise) {
  return promise
    .then(({bodyData}) => bodyData)
    .catch(handleHttpError);
}

export default (name, {http}) => {
  const baseUrl = `/api/${name}`;
  const created$ = new Rx.Subject();
  const updated$ = new Rx.Subject();
  const deleted$ = new Rx.Subject();

  return {
    $fetchAll(...args) {
      return Rx.Observable.watchTask(this.fetchAll(...args));
    },
    fetchAll(query) {
      return wrapHttp(http.get(baseUrl, {query}));
    },

    $fetch(...args) {
      return Rx.Observable.watchTask(this.fetch(...args));
    },
    fetch(id) {
      return wrapHttp(http.get(`${baseUrl}/${id}`));
    },

    created$,
    $create(...args) {
      return Rx.Observable.watchTask(this.create(...args));
    },
    create(body) {
      return observe(
        wrapHttp(http.post(baseUrl, {body})),
        created$
      );
    },

    updated$,
    $update(...args) {
      return Rx.Observable.watchTask(this.update(...args));
    },
    update(body) {
      return observe(
        wrapHttp(http.patch(`${baseUrl}/${body.id}`, {body})),
        updated$
      );
    },

    deleted$,
    $delete(...args) {
      return Rx.Observable.watchTask(this.delete(...args));
    },
    delete(id) {
      return observe(
        http.delete(`${baseUrl}/${id}`)
          .then(() => id)
          .catch(handleHttpError),
        deleted$
      );
    }
  };
};
