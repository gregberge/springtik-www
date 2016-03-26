import React from 'react';
import api from '~/apps/admin-private/api';
import connect from '~/modules/gravito/connect';
import Rx from 'rxjs/Rx';
import '~/modules/rx-extended/watchTask';
import CategoriesForm from './CategoriesForm';

export const store = () => () => {
  const submit$ = new Rx.Subject();
  const result$ = submit$
    .map(model => ({
      ...model,
      level: Number(model.level)
    }))
    .watchTask(model => api.categories.create(model));

  return {submit$, result$};
};

export default connect(({store: store()}), props =>
  <CategoriesForm {...props} category={{}} />
);
