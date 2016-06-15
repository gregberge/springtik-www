import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ActivitySiblings.scss';

export const ActivitySiblings = ({
  activities,
}) => (
  <div className={styles.activitySiblings}>
    <h2 className={styles.title}>
      Activités similaires
      {activities.map(({id, name}) => (
        <div key={id} className={styles.activityBlock}>
          {name}
        </div>
      ))}
    </h2>
  </div>
);

ActivitySiblings.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
};

export default compose(
  withStyles(styles),
  pure,
)(ActivitySiblings);
