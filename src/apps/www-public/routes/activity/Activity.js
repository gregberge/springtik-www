import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import provide from '~/modules/observo/provide';
import connect from '~/modules/observo/connect';
import ActivityCover from './ActivityCover';
import ActivityTitle from './ActivityTitle';
import ActivityIntro from './ActivityIntro';
import ActivityText from './ActivityText';
import ActivityMap from './ActivityMap';
import createProvider from './Activity.obs';

export const Activity = ({
  activity = {},
}) => (
  <div>
    <ActivityCover />
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
  </div>
);

Activity.propTypes = {
  activity: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default compose(
  provide(createProvider(), {
    resolveOnServer: [
      'activity$',
    ],
  }),
  connect(({
    activity$,
  }) => ({
    activity: activity$,
  })),
  pure,
)(Activity);
