import {watchTask} from '~/modules/observables/operator/watchTask';
import {filter} from 'rxjs/operator/filter';
import {combineLatest} from 'rxjs/operator/combineLatest';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import {publishReplay} from 'rxjs/operator/publishReplay';
import {map} from 'rxjs/operator/map';
import gql from '~/apps/www-public/graphQLClient';
import {formatPath, parsePath} from '~/modules/activity/path';

export default () => ({props$}) => {
  const path$ = props$
    ::map(({
      params: {
        activityPath,
      },
    }) => activityPath)
    ::distinctUntilChanged();

  const result$ = path$
    ::map(activityPath => {
      const parts = parsePath(activityPath);
      return parts ? parts.id : null;
    })
    ::distinctUntilChanged()
    ::filter(id => id)
    ::watchTask(id => {
      return gql.fetch({
        query: `
          {
            activity(id: "${id}") {
              id
              name
              description
              text
              website
              phoneNumber
              slug
              cover {
                publicId
              }
              position {
                lat
                lng
              },
              siblings {
                id
                name
                link
                cover {
                  publicId
                }
              }
            }
          }
        `,
      });
    })
    ::publishReplay(1).refCount();

  const activity$ = result$
    ::filter(({output}) => output && output.data)
    ::map(({output}) => output.data.activity);

  const pending$ = result$
    ::map(({progress}) => !!progress);

  const redirect$ = path$
    ::combineLatest(activity$, (path, activity) => {
      const parts = parsePath(path);
      if (!parts || parts.id !== activity.id)
        return null;

      const validPath = formatPath(activity);
      return validPath !== path ? `/activities/${validPath}` : null;
    })
    ::filter(url => url);

  return {
    activity$,
    redirect$,
    pending$,
  };
};
