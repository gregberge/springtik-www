import {watchTask} from '~/modules/observables/operator/watchTask';
import {filter} from 'rxjs/operator/filter';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import {map} from 'rxjs/operator/map';
import gql from '~/apps/www-public/graphQLClient';

export default () => ({props$}) => {
  return {
    activity$: props$
      ::map(({
        params: {
          activityId,
        },
      }) => activityId)
      ::distinctUntilChanged()
      ::watchTask(activityId => gql.fetch({
        query: `
          {
            activity(id: "${activityId}") {
              name
              description
              text
              website
              phoneNumber
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
      }))
      ::filter(({output}) => output)
      ::map(({output}) => output.data.activity),
  };
};
