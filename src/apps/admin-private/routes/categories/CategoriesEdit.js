import React, {PropTypes} from 'react';
import api from '~/apps/admin-private/api';
import connect from '~/modules/gravito/connect';
import Rx from 'rxjs/Rx';
import CategoriesForm from './CategoriesForm';
import Alert from '~/modules/components/Alert';
import Loader from '~/modules/components/Loader';
import {FETCH_NOT_FOUND} from '~/modules/apiErrors';
import styles from './categories.scss';
import '~/modules/rx-extended/watchTask';

export const store = () => (props$, routeStore$) => {
  const submit$ = new Rx.Subject();
  const delete$ = new Rx.Subject();
  const categoryChange$ = new Rx.Subject();

  const result$ = submit$
    .withLatestFrom(props$)
    .map(([model, {params: {id}}]) => ({
      ...model,
      id,
      keywords: model.keywords || []
    }))
    .watchTask(model => api.categories.update(model));

  const deleteResult$ = delete$
    .withLatestFrom(props$)
    .map(([, {params: {id}}]) => id)
    .watchTask(id => api.categories.delete(id));

  const category$ = props$
    .map(({categories}) => categories)
    .filter(categories => categories.success)
    .withLatestFrom(props$)
    .map(([categories, {params: {id}}]) =>
      categories.output
        .filter(category => category.id === id)[0]
    )
    .merge(categoryChange$);

  const fetchError$ = category$
    .filter(category => !category)
    .mapTo(new Error('Unable to find category'));

  return {
    submit$,
    categoryChange$,
    delete$,
    category$,
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
        this.context.router.push('/categories');
    }

    renderForm() {
      const {category, fetchError, ...props} = this.props;

      if (fetchError) {
        if (fetchError.code === FETCH_NOT_FOUND)
          return (
            <Alert uiStyle="warning">
              La catégorie demandée n’existe pas.
            </Alert>
          );

        return (
          <Alert uiStyle="danger">
            Une erreur de chargement est survenue.
          </Alert>
        );
      }

      return <CategoriesForm {...{category, ...props}} disabled={!category} />;
    }

    render() {
      return (
        <div className={styles.formContainer}>
          <h2>Edition d’une catégorie</h2>
          {this.renderForm()}
        </div>
      );
    }
  }
);
