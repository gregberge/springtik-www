import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import universalProvide from '~/modules/observo/universalProvide';
import connect from '~/modules/observo/connect';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ActivityCover from './ActivityCover';
import ActivityTitle from './ActivityTitle';
import ActivityIntro from './ActivityIntro';
import ActivityText from './ActivityText';
import ActivityMap from './ActivityMap';
import ActivitySidebar from './ActivitySidebar';
import ActivityMain from './ActivityMain';
import ActivityBooking from './ActivityBooking';
import ActivitySiblings from './ActivitySiblings';
import createProvider from './Activity.obs';
import styles from './Activity.scss';

export const Activity = ({
  activity = {},
}) => (
  <div className={styles.activity}>
    <ActivityCover picture={activity.cover} />
    <ActivityMain>
      <ActivityTitle>
        {activity.name}
      </ActivityTitle>
      <ActivityIntro>
        {activity.description}
      </ActivityIntro>
      <ActivityText>
        {activity.text}
      </ActivityText>
      <ActivityMap position={activity.position} />
    </ActivityMain>
    <ActivitySidebar>
      <ActivityBooking activity={activity} />
      <ActivitySiblings activities={activity.siblings} />
    </ActivitySidebar>
  </div>
);

Activity.propTypes = {
  activity: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default compose(
  universalProvide(createProvider()),
  connect(({
    activity$,
  }) => ({
    activity: activity$,
  })),
  withStyles(styles),
  pure,
)(Activity);
