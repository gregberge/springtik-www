import React, {PropTypes} from 'react';
import api from '~/apps/admin-private/api';
import connect from '~/modules/gravito/connect';
import Rx from 'rxjs/Rx';
import '~/modules/rx-extended/watchTask';
import CategoriesForm from './CategoriesForm';
import styles from './categories.scss';
import Banner from '~/modules/components/Banner';

export const store = () => () => {
  const submit$ = new Rx.Subject();
  const categoryChange$ = new Rx.Subject();

  const result$ = submit$
    .watchTask(model => api.categories.create(model))
    .publish()
    .refCount();

  const category$ = Rx.Observable.from([{}])
    .merge(categoryChange$);

  return {
    submit$,
    categoryChange$,
    result$,
    category$
  };
};


export default connect(({styles, store: store()}),
  class CategoriesNew extends React.Component {
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
        <div className={styles.section}>
          <Banner
            show={this.props.result.error}
            uiStyle="danger"
          >
            Une erreur est survenue, veuillez réessayer.
          </Banner>
          <CategoriesForm {...this.props} />
        </div>
      );
    }
  }
);
