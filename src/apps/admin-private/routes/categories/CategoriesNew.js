import {PropTypes} from 'react';
import api from 'apps/admin-private/api';
import Rc from 'modules/recompose';
import CategoriesForm from './CategoriesForm';

export default Rc.compose(
  Rc.provideForm({
    name: 'category',
    fields: ['name'],
  }),
  Rc.provide(({categorySubmitted$}) => ({
    result$: categorySubmitted$
      .watchTask(model => api.categories.create(model))
      .shareReplay(),
  })),
  Rc.getContext({
    router: PropTypes.object.isRequired,
  }),
  Rc.handle(({props$, result$}) => (
    result$
      .filter(({success}) => success)
      .withLatestFrom(props$.pluck('router'))
      .subscribe(([{output: {id}}, router]) => {
        router.push(`/categories/edit/${id}`);
      })
  )),
)(CategoriesForm);
