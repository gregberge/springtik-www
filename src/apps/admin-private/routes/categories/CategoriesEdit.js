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

export const routeStore = () => props$ => ({
  category$: props$
    .switchMap(({params: {id}}) => api.categories.$fetch(id))
});

export const store = () => (props$, routeStore$) => {
  const submit$ = new Rx.Subject();
  const delete$ = new Rx.Subject();

  const result$ = submit$
    .withLatestFrom(props$)
    .map(([model, {params: {id}}]) => ({
      ...model,
      id,
      level: Number(model.level)
    }))
    .watchTask(model => api.categories.update(model));

  const deleteResult$ = delete$
    .withLatestFrom(props$)
    .map(([, {params: {id}}]) => id)
    .watchTask(id => api.categories.delete(id));

  const category$ = routeStore$
    .map(({category}) => category)
    .map(({output}) => output);

  const fetchError$ = routeStore$
    .map(({category}) => category)
    .map(({error}) => error);

  return {submit$, delete$, category$, result$, fetchError$, deleteResult$};
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

      if (!category)
        return <Loader delay={100} />;

      return <CategoriesForm {...{category, ...props}} />;
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
