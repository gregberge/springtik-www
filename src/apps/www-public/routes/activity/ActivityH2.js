import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ActivityH2.scss';

export const ActivityH2 = ({
  children,
}) => (
  <h2 className={styles.activityH2}>
    {children}
  </h2>
);

ActivityH2.propTypes = {
  children: PropTypes.node,
};

export default compose(
  withStyles(styles),
  pure,
)(ActivityH2);
