import React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ActivityCover.scss';

export const ActivityCover = () => (
  <div className={styles.activityCover} />
);

export default compose(
  withStyles(styles),
  pure,
)(ActivityCover);
