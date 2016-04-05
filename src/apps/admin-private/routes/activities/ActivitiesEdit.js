import React, {PropTypes} from 'react';
import Rx from 'rxjs/Rx';
import api from '~/apps/admin-private/api';
import connect from '~/modules/gravito/connect';
import Alert from '~/modules/components/Alert';
import '~/modules/rx-extended/watchTask';
import Banner from '~/modules/components/Banner';
import ActivitiesForm from './ActivitiesForm';
import styles from './activities.scss';

export const store = () => props$ => {
  const submit$ = new Rx.Subject();
  const delete$ = new Rx.Subject();
  const activityChange$ = new Rx.Subject();

  const result$ = submit$
    .withLatestFrom(props$)
    .map(([model, {params: {id}}]) => ({
      ...model,
      id
    }))
    .watchTask(model => api.activities.update(model))
    .merge(
      props$
        .map(({params: {id}}) => id)
        .distinctUntilChanged()
        .mapTo({idle: true})
    );

  const deleteResult$ = delete$
    .filter(() =>
      window.confirm('Êtes vous sûr de vouloir supprimer l\'activité ?')
    )
    .withLatestFrom(props$)
    .map(([, {params: {id}}]) => id)
    .watchTask(id => api.activities.delete(id))
    .merge(
      props$
        .map(({params: {id}}) => id)
        .distinctUntilChanged()
        .mapTo({idle: true})
    );

  const activity$ = props$
    .map(({activity}) => activity || {})
    .merge(activityChange$);

  const fetchError$ = activity$
    .filter(activity => !activity)
    .mapTo(new Error('Unable to find activity'));

  return {
    submit$,
    activityChange$,
    delete$,
    activity$,
    result$,
    fetchError$,
    deleteResult$
  };
};

export default connect(({styles, store: store()}),
  class CategoriesEdit extends React.Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentDidUpdate() {
      if (this.props.deleteResult.success)
        this.context.router.push('/activities');
    }

    renderForm() {
      const {activity, fetchError, ...props} = this.props;

      if (fetchError) {
        return (
          <Alert uiStyle="danger">
            Une erreur de chargement est survenue.
          </Alert>
        );
      }

      return (
        <ActivitiesForm
          {...{activity, ...props}}
          disabled={!activity}
        />
      );
    }

    render() {
      return (
        <div className={styles.section}>
          <Banner
            show={this.props.result.success}
            uiStyle="success"
          >
            L'activité a bien été modifiée.
          </Banner>
          <Banner
            show={this.props.result.error || this.props.deleteResult.error}
            uiStyle="danger"
          >
            Une erreur est survenue, veuillez réessayer.
          </Banner>
          {this.renderForm()}
        </div>
      );
    }
  }
);
