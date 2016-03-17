import React from 'react';
import Link from 'react-router/lib/Link';
import Rx from 'rxjs/Rx';
import connect from '~/modules/gravito/connect';
import api from '~/apps/admin-private/api';
import styles from './categories.scss';

export const routeStore = () => () => ({
  categories$: api.categories.$fetchAll()
});


export const store = () => (props$, routeStore$) => {
  const categories$ = Rx.Observable.merge(
    routeStore$.map(({categories}) => categories),
    api.categories.created$
      .switchMap(() => api.categories.$fetchAll())
      .filter(({success}) => success)
  );
  return {categories$};
};

export default connect({styles, store: store()}, ({categories, children}) =>
  <main>
    <ul>
      <li>
        <Link to="/categories/new">
          Ajouter une catégorie
        </Link>
      </li>
      {categories.success ? categories.output.map(({id, name}, index) =>
        <li key={index}>
          <Link to={`/categories/edit/${id}`}>{name}</Link>
        </li>
      ) : null}
    </ul>
    <div>
      {children}
    </div>
  </main>
);
