import React from 'react';
import Link from 'react-router/lib/Link';
import Rx from 'rxjs/Rx';
import connect from '~/modules/gravito/connect';
import apiClient from '~/apps/admin-private/apiClient';
import styles from './categories.scss';

export const routeStore = () => () => ({
  categories$: Rx.Observable.fromPromise(apiClient.categories.fetch())
});

export const store = () => (props$, routeStore$) => ({
  categories$: routeStore$.map(({categories}) => categories)
});

export default connect({styles, store: store()}, ({categories, children}) =>
  <main>
    <ul>
      <li><Link to="/categories/new">Ajouter une catégorie</Link></li>
      {categories ? categories.map(({name}, index) =>
        <li key={index}>{name}</li>
      ) : null}
    </ul>
    <div>
      {children}
    </div>
  </main>
);
