import React, {PropTypes} from 'react';
import Rx from 'rxjs/Rx';
import '~/modules/rx-extended/watchTask';
import compose from 'recompose/compose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import provide from '~/modules/observo/provide';
import connect from '~/modules/observo/connect';
import subscribe from '~/modules/observo/subscribe';
import api from '~/apps/admin-private/api';
import Banner from '~/modules/components/Banner';
import ActivitiesForm from './ActivitiesForm';
import styles from './activities.scss';

export const CategoriesEdit = ({
  activity,
  onActivityChange,
  onSubmit,
  onDelete,
  result,
  deleteResult,
}) => (
  <div className={styles.section}>
    <Banner
      show={Boolean(result.success)}
      uiStyle="success"
    >
      L'activité a bien été modifiée.
    </Banner>
    <Banner
      show={Boolean(result.error || deleteResult.error)}
      uiStyle="danger"
    >
      Une erreur est survenue, veuillez réessayer.
    </Banner>
    <ActivitiesForm
      {...{
        result,
        deleteResult,
        activity,
        onActivityChange,
        onSubmit,
        onDelete,
        disabled: !activity,
      }}
    />
  </div>
);

CategoriesEdit.propTypes = {
  deleteResult: PropTypes.object,
  result: PropTypes.object,
  activity: PropTypes.object,
  onActivityChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

export const provideObservables = ({
  props$,
  activities$,
}) => {
  const submit$ = new Rx.Subject();
  const delete$ = new Rx.Subject();
  const activityChange$ = new Rx.Subject();

  const activity$ = activities$
    .combineLatest(props$.take(1), (categories, {params: {activityId}}) =>
      categories.find(({id}) => activityId === id)
    )
    .merge(activityChange$)
    .publishReplay(1)
    .refCount();

  const result$ = submit$
    .withLatestFrom(activity$, (model, {id}) => ({
      ...model,
      id,
    }))
    .watchTask(model => api.activities.update(model))
    .publishReplay(1)
    .refCount();

  const deleteResult$ = delete$
    .filter(() =>
      window.confirm('Êtes vous sûr de vouloir supprimer l\'activité ?')
    )
    .withLatestFrom(props$)
    .map(([, {params: {activityId}}]) => activityId)
    .watchTask(id => api.activities.delete(id))
    .merge(
      props$
        .map(({params: {id}}) => id)
        .distinctUntilChanged()
        .mapTo({idle: true})
    )
    .publishReplay(1)
    .refCount();

  return {
    submit$,
    activityChange$,
    delete$,
    activity$,
    result$,
    deleteResult$,
  };
};


export default compose(
  provide(provideObservables),
  subscribe({
    observo: PropTypes.shape({
      observables: PropTypes.shape({
        deleteResult$: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }, ({
    observo,
    router,
  }) => observo.observables.deleteResult$
    .filter(({success}) => success)
    .subscribe(() => {
      router.push('/activities');
    })
  ),
  connect(({
    submit$,
    activity$,
    activityChange$,
    delete$,
    result$,
    deleteResult$,
  }) => ({
    onSubmit: submit$,
    activity: activity$,
    onActivityChange: activityChange$,
    onDelete: delete$,
    result: result$,
    deleteResult: deleteResult$,
  })),
  withStyles(styles)
)(CategoriesEdit);
