import React from 'react';
import api from '~/apps/admin-private/api';
import connect from '~/modules/gravito/connect';
import Rx from 'rxjs/Rx';
import CategoriesForm from './CategoriesForm';
import '~/modules/rx-extended/watchTask';

export const routeStore = () => props$ => ({
  category$: props$
    .switchMap(({params: {id}}) => api.categories.$fetch(id))
});

export const store = () => (props$, routeStore$) => {
  const submit$ = new Rx.Subject();
  const result$ = submit$
    .withLatestFrom(props$)
    .map(([model, {params: {id}}]) => ({
      ...model,
      id,
      level: Number(model.level)
    }))
    .watchTask(model => api.categories.update(model));

  const category$ = Rx.Observable.merge(
    routeStore$.map(({category}) => category)
      .map(({output}) => output)
  );

  return {submit$, category$, result$};
};

export default connect(({store: store()}), props =>
  <CategoriesForm {...props} />
);
