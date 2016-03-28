import React, {PropTypes} from 'react';
import api from '~/apps/admin-private/api';
import connect from '~/modules/gravito/connect';
import Rx from 'rxjs/Rx';
import '~/modules/rx-extended/watchTask';
import CategoriesForm from './CategoriesForm';
import styles from './categories.scss';

export const routeStore = () => props$ => ({
  keywords$: props$
    .switchMap(() => api.categories.$fetchKeywords())
});

export const store = () => (props$, routeStore$) => {
  const submit$ = new Rx.Subject();

  const result$ = submit$
    .watchTask(model => api.categories.create(model))
    .publish()
    .refCount();

  const category$ = Rx.Observable.from([{}]);

  const keywords$ = routeStore$
    .map(({keywords}) => keywords)
    .map(({output}) => output);

  return {submit$, keywords$, result$, category$};
};


export default connect(({styles, store: store()}),
  class CategoriesEdit extends React.Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentDidUpdate() {
      const {result} = this.props;

      if (result.success)
        this.context.router.push(`/categories/edit/${result.output.id}`);
    }

    render() {
      return (
        <div className={styles.formContainer}>
          <h2>Nouvelle catégorie</h2>
          <CategoriesForm {...this.props} />
        </div>
      );
    }
  }
);
