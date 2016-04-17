import React, {PropTypes} from 'react';
import api from '~/apps/admin-private/api';
import Rx from 'rxjs/Rx';
import '~/modules/rx-extended/watchTask';
import compose from 'recompose/compose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import provide from '~/modules/observo/provide';
import connect from '~/modules/observo/connect';
import subscribe from '~/modules/observo/subscribe';
import CategoriesForm from './CategoriesForm';
import Banner from '~/modules/components/Banner';
import styles from './categories.scss';

export const CategoriesNew = ({
  onSubmit,
  onDelete,
  onCategoryChange,
  result,
  category
}) => (
  <div className={styles.section}>
    <Banner
      show={result.error}
      uiStyle="danger"
    >
      Une erreur est survenue, veuillez réessayer.
    </Banner>
    <CategoriesForm
      {...{
        onSubmit,
        onDelete,
        onCategoryChange,
        result,
        category
      }}
    />
  </div>
);

CategoriesNew.propTypes = {
  result: PropTypes.shape({
    error: PropTypes.bool
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onCategoryChange: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

export const getObservables = () => {
  const submit$ = new Rx.Subject();

  const result$ = submit$
    .watchTask(model => api.categories.create(model))
    .share();

  const category$ = new Rx.BehaviorSubject({
    name: '',
    level: null,
    description: '',
    keywords: []
  });

  return {
    submit$,
    result$,
    category$,
  };
};

export default compose(
  provide(getObservables),
  connect(({
    submit$,
    result$,
    category$
  }) => ({
    onSubmit: submit$,
    result: result$,
    category: category$,
    onCategoryChange: category$
  })),
  subscribe({
    observo: PropTypes.shape({
      observables: PropTypes.shape({
        result$: PropTypes.object.isRequired
      }).isRequired
    }).isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }, ({
    observo: {
      observables: {
        result$
      }
    },
    router
  }) => result$
    .filter(({success}) => success)
    .subscribe(({
      output: {
        id
      }
    }) => {
      router.push(`/categories/edit/${id}`);
    })
  ),
  withStyles(styles)
)(CategoriesNew);
