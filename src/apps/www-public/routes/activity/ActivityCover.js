import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ActivityCover.scss';

export const ActivityCover = ({
  picture,
}) => (
  <div
    className={styles.activityCover}
    style={picture ? {backgroundImage: `url(${picture.url})`} : null}
  />
);

ActivityCover.propTypes = {
  picture: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
};

export default compose(
  withStyles(styles),
  pure,
)(ActivityCover);
