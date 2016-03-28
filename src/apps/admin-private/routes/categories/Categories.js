import React from 'react';
import Link from 'react-router/lib/Link';
import Rx from 'rxjs/Rx';
import connect from '~/modules/gravito/connect';
import api from '~/apps/admin-private/api';
import styles from './categories.scss';
import Toolbar from '~/modules/components/Toolbar';

export const routeStore = () => () => ({
  categories$: api.categories.$fetchAll()
});


export const store = () => (props$, routeStore$) => {
  const categories$ = Rx.Observable.merge(
    routeStore$.map(({categories}) => categories),
    Rx.Observable.merge(
        api.categories.created$,
        api.categories.updated$,
        api.categories.deleted$
      )
      .switchMap(() => api.categories.$fetchAll())
      .filter(({success}) => success)
  );
  return {categories$};
};

export default connect({styles, store: store()}, ({categories, children}) =>
  <main>
    <Toolbar>
      <Link to="/categories/new">
        <i className="fa fa-plus-circle" />Créer une catégorie
      </Link>
    </Toolbar>
    <div className={styles.workspace}>
      <div className={styles.listContainer}>
        <ul>
          {categories.success ? categories.output.map(({id, level, name}, index) =>
            <li key={index}>
              <Link
                activeClassName={styles.active}
                to={`/categories/edit/${id}`}
              >
                [{level}] {name}
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
      {children}
    </div>
  </main>
);
