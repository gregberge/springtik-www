import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import Link from 'react-router/lib/Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cl from '~/modules/cloudinary';
import styles from './ActivitySiblings.scss';

export const ActivitySiblings = ({
  activities,
}) => (
  <div className={styles.activitySiblings}>
    <h2 className={styles.title}>
      Activités similaires
    </h2>
    {activities && activities.map(
      ({
        id,
        link,
        name,
        cover,
      }) => (
        <Link key={id} to={link}>
          <div
            className={styles.activityBlock}
            style={{backgroundImage: `url(${cl.url(cover.publicId)})`}}
          >
            <div className={styles.activityTitle}>
              {name}
            </div>
          </div>
        </Link>
      )
    )}
  </div>
);

ActivitySiblings.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      cover: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ),
};

export default compose(
  withStyles(styles),
  pure,
)(ActivitySiblings);
