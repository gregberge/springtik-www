import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Rc from 'modules/recompose';
import Rx from 'modules/rxjs';
import Link from 'react-router/lib/Link';
import api from 'apps/admin-private/api';
import styles from './categories.scss';
import Toolbar from 'modules/components/Toolbar';
import List from 'modules/components/List';
import ListItem from 'modules/components/ListItem';

export const Categories = ({
  categories,
  category,
  children,
}) => {
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
        <div className={classNames(styles.section, styles['list-section'])}>
          <List className={styles.list}>
            {categories
              .filter(({level}) => level === 1)
              .map(({id, level, name}, index) =>
                <ListItem key={index}>
                  <Link
                    className={classNames({
                      active: id === level1Id,
                    })}
                    to={`/categories/edit/${id}`}
                  >
                    {name}
                  </Link>
                </ListItem>
            )}
          </List>
        </div>
        <div className={classNames(styles.section, styles['list-section'])}>
          <List className={styles.list}>
            {categories
              .filter(({level, parentId}) =>
                level === 2 && parentId === level1Id
              )
              .map(({id, level, name}, index) =>
                <ListItem key={index}>
                  <Link
                    activeClassName="active"
                    to={`/categories/edit/${id}`}
                  >
                    {name}
                  </Link>
                </ListItem>
            )}
          </List>
        </div>
        {children}
      </div>
    </main>
  );
};


Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
      parentId: PropTypes.string,
      name: PropTypes.string.isRequired,
    })
  ),
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    parentId: PropTypes.string,
    name: PropTypes.string.isRequired,
  }),
  children: PropTypes.node,
};

function queryCategories() {
  return this
    .switchMap(() => api.categories.$fetchAll())
    .filter(({success}) => success)
    .map(({output}) => output);
}

export default Rc.compose(
  Rc.universalProvide(({props$}) => ({
    categories$: props$::queryCategories(),
  })),
  Rc.provide(({categories$, props$}) => {
    categories$ = Rx.Observable.merge(
        categories$,
        Rx.Observable.merge(
          api.categories.created$,
          api.categories.updated$,
          api.categories.deleted$,
        )::queryCategories()
    )
    .startWith([])
    .shareReplay();

    const category$ = Rx.Observable.combineLatest(
      categories$,
      props$.pluck('params', 'categoryId').distinctUntilChanged(),
      (categories, categoryId) => categories.find(({id}) => categoryId === id)
    );

    return {
      props$: Rx.Observable.combineLatest(
        props$,
        categories$,
        category$,
        (props, categories, category) => ({
          ...props,
          categories,
          category,
        }),
      ),
    };
  }),
  Rc.withStyles(styles)
)(Categories);
