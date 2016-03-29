import React from 'react';
import Link from 'react-router/lib/Link';
import Rx from 'rxjs/Rx';
import connect from '~/modules/gravito/connect';
import api from '~/apps/admin-private/api';
import styles from './categories.scss';
import Toolbar from '~/modules/components/Toolbar';
import classNames from 'classnames';

export const routeStore = () => props$ => ({
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
    )
    .filter(({success}) => success)
    .map(({output}) => output)
    .startWith([])
    .publishReplay(null, 1)
    .refCount();

  const keywords$ = categories$
    .map(categories =>
      Array.from(new Set(categories.reduce((all, {keywords}) =>
        all.concat(keywords), []
      )))
    )
    .startWith([]);

  return {categories$, keywords$};
};

export default connect({styles, store: store()}, ({
  categories,
  params: {id: urlId},
  keywords,
  children
}) => {
  const category = categories.find(({id}) => urlId === id);
  const level1Id = category && category.level === 1
      ? category.id
      : category && category.level === 2
        ? category.parentId
        : null;

  return (
    <main>
      <Toolbar>
        <Link to="/categories/new">
          <i className="fa fa-plus-circle" />Créer une catégorie
        </Link>
      </Toolbar>
      <div className={styles.workspace}>
        <div className={styles.listContainer}>
          <ul>
            {categories
              .filter(({level, parentId}) => level === 1)
              .map(({id, level, name}, index) =>
                <li key={index}>
                  <Link
                    className={classNames({
                      [styles.active]: id === level1Id
                    })}
                    to={`/categories/edit/${id}`}
                  >
                    {name}
                  </Link>
                </li>
            )}
          </ul>
        </div>
        <div className={styles.listContainer}>
          <ul>
            {categories
              .filter(({id, level, parentId}) =>
                level === 2 && parentId === level1Id
              )
              .map(({id, level, name}, index) =>
                <li key={index}>
                  <Link
                    activeClassName={styles.active}
                    to={`/categories/edit/${id}`}
                  >
                    {name}
                  </Link>
                </li>
            )}
          </ul>
        </div>
        {React.Children.map(children, child =>
          React.cloneElement(child, {category, categories, keywords})
        )}
      </div>
    </main>
  );
});
