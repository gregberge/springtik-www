import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import provide from '~/modules/observo/provide';
import connect from '~/modules/observo/connect';
import ActivityCover from './ActivityCover';
import ActivityTitle from './ActivityTitle';
import ActivityIntro from './ActivityIntro';
import ActivityH2 from './ActivityH2';
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
    <ActivityH2>
      Un grand choix d’activités pour tous
    </ActivityH2>
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
