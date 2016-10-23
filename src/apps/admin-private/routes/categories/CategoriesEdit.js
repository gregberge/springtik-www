import {PropTypes} from 'react';
import Rc from 'modules/recompose';
import Rx from 'modules/rxjs';
import {provideFormObservables} from 'modules/recompose/provideForm';
import api from 'apps/admin-private/api';
import CategoriesForm from './CategoriesForm';

export default Rc.compose(
  Rc.universalProvide(({props$}) => ({
    category$: props$
      .pluck('params', 'categoryId')
      .distinctUntilChanged()
      .watchTask(categoryId => api.categories.fetch(categoryId))
      .filter(({success}) => success)
      .pluck('output'),
  })),
  Rc.provide(({category$}) => {
    category$ = category$.shareReplay();

    const {
      categorySubmitted$,
      ...formObservables,
    } = provideFormObservables({
      name: 'category',
      initial$: category$,
    });

    const delete$ = new Rx.Subject();
    const deleteResult$ = delete$
      .withLatestFrom(category$.pluck('id'), (_, categoryId) => categoryId)
      .watchTask(categoryId => api.categories.delete(categoryId))
      .shareReplay();

    const result$ = categorySubmitted$
      .watchTask(model => api.categories.update(model))
      .shareReplay();

    return {
      ...formObservables,
      delete$,
      deleteResult$,
      result$,
    };
  }),
  Rc.getContext({
    router: PropTypes.object.isRequired,
  }),
  Rc.handle(({deleteResult$, props$}) => (
    deleteResult$
      .filter(({success}) => success)
      .withLatestFrom(props$.pluck('router'), (_, router) => router)
      .subscribe(router => router.push('/categories'))
  )),
)(CategoriesForm);
