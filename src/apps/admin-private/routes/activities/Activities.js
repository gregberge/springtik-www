import React from 'react';
import classNames from 'classnames';
import Rx from 'rxjs/Rx';
import styles from './activities.scss';
import connect from '~/modules/gravito/connect';
import api from '~/apps/admin-private/api';
import Toolbar from '~/modules/components/Toolbar';
import List from '~/modules/components/List';
import ListItem from '~/modules/components/ListItem';
import Link from 'react-router/lib/Link';

export const routeStore = () => () => ({
  activities$: api.activities.$fetchAll(),
  categories$: api.categories.$fetchAll({level: 2})
});

export const store = () => (props$, routeStore$) => {
  const activities$ = Rx.Observable.merge(
      routeStore$.map(({activities}) => activities),
      Rx.Observable.merge(
          api.activities.created$,
          api.activities.updated$,
          api.activities.deleted$
        )
        .switchMap(() => api.activities.$fetchAll())
    )
    .filter(({success}) => success)
    .map(({output}) => output)
    .startWith([])
    .publishReplay(1)
    .refCount();

  const categories$ = routeStore$.map(({categories}) => categories)
    .filter(({success}) => success)
    .map(({output}) => output)
    .startWith([])
    .publishReplay(1)
    .refCount();

  return {activities$, categories$};
};

export default connect({styles, store: store()}, ({
  activities,
  categories,
  params: {id: urlId},
  children
}) => {
  const activity = activities.find(({id}) => urlId === id);
  return (
    <main>
      <Toolbar>
        <Link to="/activities/new">
          <i className="fa fa-plus-circle" />Créer une activité
        </Link>
      </Toolbar>
      <div className={styles.workspace}>
        <div className={classNames(styles.section, styles['list-section'])}>
          <List className={styles.list}>
            {activities
              .map(({id, name}, index) =>
                <ListItem key={index}>
                  <Link
                    activeClassName="active"
                    to={`/activities/edit/${id}`}
                  >
                    {`#${id} - ${name}`}
                  </Link>
                </ListItem>
            )}
          </List>
        </div>
        {React.Children.map(children, child =>
          React.cloneElement(child, {activity, activities, categories})
        )}
      </div>
    </main>
  );
});
