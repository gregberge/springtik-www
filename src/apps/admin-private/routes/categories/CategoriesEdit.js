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
    .map(model => ({
      ...model,
      level: Number(model.level)
    }))
    .watchTask(model => api.categories.create(model));

  const category$ = routeStore$.map(({category}) => category)
    .map(({output}) => output);

  return {submit$, category$, result$};
};

export default connect(({store: store()}), props =>
  <CategoriesForm {...props} />
);
