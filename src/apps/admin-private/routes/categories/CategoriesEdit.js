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
import Banner from '~/modules/components/Banner';

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
    .watchTask(model => api.categories.update(model))
    .merge(
      props$
        .map(({params: {id}}) => id)
        .distinctUntilChanged()
        .mapTo({idle: true})
    );

  const deleteResult$ = delete$
    .withLatestFrom(props$)
    .map(([, {params: {id}}]) => id)
    .watchTask(id => api.categories.delete(id));

  const category$ = props$
    .map(({category}) => category || {})
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

      return (
        <CategoriesForm
          {...{category, ...props}}
          disabled={!category}
        />
      );
    }

    render() {
      return (
        <div className={styles.formContainer}>
          <Banner
            show={this.props.result.success}
            uiStyle="success"
          >
            La catégorie a bien été modifiée.
          </Banner>
          <Banner
            show={this.props.result.error}
            uiStyle="danger"
          >
            Une erreur est survenue, veuillez réessayer.
          </Banner>
          <h2>Edition d’une catégorie</h2>
          {this.renderForm()}
        </div>
      );
    }
  }
);
