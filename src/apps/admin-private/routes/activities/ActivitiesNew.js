import React, {PropTypes} from 'react';
import api from '~/apps/admin-private/api';
import connect from '~/modules/gravito/connect';
import Rx from 'rxjs/Rx';
import '~/modules/rx-extended/watchTask';
import styles from './activities.scss';
import Banner from '~/modules/components/Banner';
import ActivitiesForm from './ActivitiesForm';

export const store = () => () => {
  const submit$ = new Rx.Subject();
  const activityChange$ = new Rx.Subject();

  const result$ = submit$
    .watchTask(model => api.activities.create(model))
    .publish()
    .refCount();

  const activity$ = Rx.Observable.from([{}])
    .merge(activityChange$);

  return {
    submit$,
    activityChange$,
    result$,
    activity$
  };
};


export default connect(({styles, store: store()}),
  class ActivitiesNew extends React.Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentDidUpdate() {
      const {result} = this.props;

      if (result.success)
        this.context.router.push(`/activities/edit/${result.output.id}`);
    }

    render() {
      return (
        <div className={styles.formContainer}>
          <Banner
            show={this.props.result.error}
            uiStyle="danger"
          >
            Une erreur est survenue, veuillez réessayer.
          </Banner>
          <h2>Nouvelle activité</h2>
          <ActivitiesForm {...this.props} />
        </div>
      );
    }
  }
);
