import React, {PropTypes} from 'react';
import api from '~/apps/admin-private/api';
import connect from '~/modules/gravito/connect';
import Rx from 'rxjs/Rx';
import '~/modules/rx-extended/watchTask';
import CategoriesForm from './CategoriesForm';

export const store = () => () => {
  const submit$ = new Rx.Subject();

  const result$ = submit$
    .map(model => ({
      ...model,
      level: Number(model.level)
    }))
    .watchTask(model => api.categories.create(model))
    .publish()
    .refCount();

  const category$ = Rx.Observable.from([{}]);

  return {submit$, result$, category$};
};


export default connect(({store: store()}),
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
        <div>
          <h2>Nouvelle catégorie</h2>
          <CategoriesForm {...this.props} />
        </div>
      );
    }
  }
);
