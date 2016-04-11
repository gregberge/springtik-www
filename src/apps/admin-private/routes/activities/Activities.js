import React from 'react';
import classNames from 'classnames';
import Rx from 'rxjs/Rx';
import styles from './activities.scss';
import connect from '~/modules/gravito/connect';
import api from '~/apps/admin-private/api';
import Toolbar from '~/modules/components/Toolbar';
import List from '~/modules/components/List';
import Select from '~/modules/components/Select';
import ListItem from '~/modules/components/ListItem';
import Link from 'react-router/lib/Link';

export const getActivities = obs$ => obs$
  .map(({
    location: {
      query: {
        status
      }
    }
  }) => {
    if (status)
      return {status};

    return undefined;
  })
  .switchMap(query =>
    api.activities.$fetchAll(query)
  );

export const routeStore = () => props$ => ({
  activities$: getActivities(props$),
  categories$: api.categories.$fetchAll({level: 2})
});

export const store = () => (props$, routeStore$) => {
  const activities$ = Rx.Observable.merge(
      routeStore$.map(({activities}) => activities),
      getActivities(
        Rx.Observable.merge(
          api.activities.created$,
          api.activities.updated$,
          api.activities.deleted$
        )
        .withLatestFrom(props$, (_, props) => props)
      )
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

const statusOptions = [
  {value: 'review', label: 'À relire'},
  {value: 'published', label: 'Publiée'}
];

class Activities extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  handleStatusChange = status => {
    this.context.router.push({
      pathname: this.props.location.pathname,
      query: {status}
    });
  };

  render() {
    const {
      activities,
      categories,
      params: {id: urlId},
      children
    } = this.props;

    const activity = activities.find(({id}) => urlId === id);
    return (
      <main>
        <Toolbar>
          <Link
            to={{
              pathname: '/activities/new',
              query: this.props.location.query
            }}
          >
            <i className="fa fa-plus-circle" />Créer une activité
          </Link>
        </Toolbar>
        <div className={styles.workspace}>
          <div className={classNames(styles.section, styles['list-section'])}>
            <div>
              <Select
                className={styles.statusSelect}
                placeholder="Filtrer.."
                searchable={false}
                value={this.props.location.query.status || ''}
                options={statusOptions}
                onChange={this.handleStatusChange}
              />
            </div>
            <List className={styles.list}>
              {activities
                .map(({id, name}, index) =>
                  <ListItem key={index}>
                    <Link
                      activeClassName="active"
                      to={{
                        pathname: `/activities/edit/${id}`,
                        query: this.props.location.query
                      }}
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
  }
}

export default connect({styles, store: store()}, Activities);
